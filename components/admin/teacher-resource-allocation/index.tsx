import React from "react";
// next imports
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// icons
import { Times } from "@styled-icons/fa-solid/Times";
// components
import TeacherResourceCreate from "./create";
import TeacherResourceDelete from "./delete";
// api services
import { TeacherResourceService } from "@lib/services/teacher-resource.service";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const TeacherResourceAllocation = () => {
  const router = useRouter();
  const user_id: any = router.query.user_id;

  const [tokenDetails, setTokenDetails] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let user: any = getAuthenticationToken();
      user = user ? JSON.parse(user) : null;
      if (user && user?.user) {
        setTokenDetails(user?.user);
      }
    }
  }, []);

  const {
    data: resources,
    isLoading: resourcesLoading,
    error: resourcesError,
  } = useSWR(
    user_id ? "RESOURCES" : null,
    user_id ? () => TeacherResourceService.getAllResources() : null,
    {
      refreshInterval: 0,
    }
  );

  const {
    data: teacherResources,
    isLoading: teacherResourceLoading,
    error: teacherResourcesError,
  } = useSWR(
    user_id ? "TEACHER_RESOURCES" : null,
    user_id ? () => TeacherResourceService.getAllTeacherResourcesByTeacherId(user_id) : null,
    {
      refreshInterval: 0,
    }
  );

  const [currentTeacherResource, setCurrentTeacherResource] = React.useState<any>(null);

  const renderTeacherResources = (_resources: any) => {
    return _resources && _resources.length > 0
      ? _resources.map((_rId: any) => {
          return resources.find((_r: any) => _r?.id == _rId);
        })
      : [];
  };

  console.log("teacherResources", teacherResources);

  return (
    <>
      {!resourcesLoading && !teacherResourceLoading ? (
        <>
          <div className="tw-w-full tw-h-full tw-relative tw-overflow-hidden">
            <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
              <div className="tw-flex-shrink-0 tw-p-2 tw-flex tw-justify-between tw-items-center">
                <div></div>
                <div>
                  <button
                    className="btn-primary btn-sm"
                    onClick={() => setCurrentTeacherResource({ type: "create", data: null })}
                  >
                    Attach Resource
                  </button>
                </div>
              </div>
              <div className="tw-w-full tw-h-full tw-overflow-auto tw-overflow-y-auto tw-p-2">
                <h6>Attached Resources</h6>
                {teacherResources &&
                teacherResources?.teacher_nodes &&
                teacherResources?.teacher_nodes.length > 0 ? (
                  <div className="tw-flex tw-flex-grow tw-gap-2">
                    {renderTeacherResources(teacherResources?.teacher_nodes).map(
                      (_resource: any) => (
                        <div
                          key={_resource?.id}
                          className="tw-border tw-border-solid tw-border-gray-200 tw-p-1 tw-pl-2 tw-rounded-sm hover:tw-bg-gray-100 tw-cursor-pointer tw-flex tw-justify-center tw-items-center tw-gap-2"
                        >
                          <div className="tw-font-medium">{_resource?.title}</div>
                          <div
                            className="tw-flex-shrink-0 tw-w-[24px] tw-h-[24px] tw-flex tw-justify-center tw-items-center hover:tw-bg-gray-200 tw-rounded-sm"
                            onClick={() =>
                              setCurrentTeacherResource({ type: "delete", data: _resource })
                            }
                          >
                            <Times className="tw-w-[16px] tw-h-[16px] tw-font-thin" />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-center tw-py-5 tw-text-gray-500">
                    No teachers resource available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center tw-py-5 tw-text-gray-500">Loading...</div>
      )}

      {currentTeacherResource && currentTeacherResource?.type === "create" && (
        <TeacherResourceCreate
          currentTeacher={tokenDetails}
          resources={resources}
          teacherResources={teacherResources}
          currentTeacherResource={currentTeacherResource}
          handleCurrentTeacherResource={setCurrentTeacherResource}
        />
      )}

      {currentTeacherResource && currentTeacherResource?.type === "delete" && (
        <TeacherResourceDelete
          currentTeacher={tokenDetails}
          currentTeacherResource={currentTeacherResource}
          handleCurrentTeacherResource={setCurrentTeacherResource}
        />
      )}
    </>
  );
};

export default TeacherResourceAllocation;
