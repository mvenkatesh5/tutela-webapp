import React from "react";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";
import { Circle } from "@styled-icons/entypo/Circle";
import { ThreeDots } from "@styled-icons/bootstrap/ThreeDots";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { DotsHorizontalRounded } from "@styled-icons/boxicons-regular/DotsHorizontalRounded";
// components
import CircularProgressBar from "@components/CircularProgressBar";

const Resources = ({ resources }: any) => {
  const [open, setOpen] = React.useState(true);

  const [filteredResources, setFilteredResources] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");

  const filterFunction = (event: any) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredResources(resources.filter((res: any) => res.title.toLowerCase().includes(query)));
  };

  React.useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  const Card = ({ resource }: any) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <div className="bg-light rounded mb-1">
          <div key={`resources-index`}>
            <div
              key={`resources-index-`}
              className="d-flex justify-content-start tw-bg-gray-100 p-2 px-3 gap-3 align-items-center px-2 rounded"
            >
              {/* <div className="">
                <CircularProgressBar
                  percent={resource.percentage}
                  show_text={false}
                  text_size="text-[14px]"
                  width={25}
                  stroke_width={15}
                  color="#08AD36"
                  strokeLinecap="round"
                />
              </div> */}
              <div className="tw-font-semibold">{resource?.title}</div>
              <div className="mx-auto" />
              <div className="cursor-pointer">
                <DotsHorizontalRounded className="tw-w-4 text-muted" />
              </div>
              <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                {open ? (
                  <ChevronUp className="tw-w-4 text-muted" />
                ) : (
                  <ChevronDown className="tw-w-4 text-muted" />
                )}
              </div>
            </div>
          </div>
          {open && (
            <div className="tw-bg-gray-100">
              <hr className="my-0" />
              <div className="px-3 py-2 d-flex flex-wrap gap-3">
                <div>
                  <span className="text-muted">Progress:</span>{" "}
                  <span className="text-success">100%</span>
                </div>
                <div className="mx-auto" />
                <div>
                  <span className="text-muted">Join date: </span> <span>Jan 2, 2022</span>
                </div>
                <div>
                  <span className="text-muted">Completion date: </span> <span>Apr 25, 2022</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="border rounded">
      <div className="p-3 pb-2  d-flex justify-content-between align-items-start">
        <div className="">
          <h6 className="text-muted">RESOURCES</h6>
        </div>
        <div className="cursor-pointer  " onClick={() => setOpen(!open)}>
          {open ? <ChevronUp className="tw-w-5  " /> : <ChevronDown className="tw-w-5  " />}
        </div>
      </div>
      {open && (
        <>
          <hr className="my-0" />
          <div className="p-3 tw-space-y-3">
            <input
              type="text"
              className="w-100 border px-3 py-2 rounded-3"
              placeholder="Search resources"
              value={search}
              onChange={filterFunction}
            />

            {filteredResources &&
              filteredResources.length > 0 &&
              filteredResources.map((resource: any, index: any) => (
                <div key={`resources-index-${index}`}>
                  <Card resource={resource} />
                </div>
              ))}
          </div>
          <div className=""></div>
        </>
      )}
    </div>
  );
};

export default Resources;
