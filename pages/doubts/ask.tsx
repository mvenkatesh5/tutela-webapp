import React from "react";
// next imports
import NextLink from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR, { mutate } from "swr";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// seo
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
// layout
import AdminLayout from "@layouts/adminLayout";
// components
import SearchCheckboxView from "@components/admin/sessions/SearchCheckbox";
import ImageUploader from "@components/doubts/ImageUploader";
// api routes
import {
  DOUBTS_WITH_QUERY_ENDPOINT,
  USER_ENDPOINT,
  PRODUCT_USER_ENDPOINT,
} from "@constants/routes";
// api services
import { DoubtCreate } from "@lib/services/doubts.service";
import { APIFetcher, AsyncUploadS3File } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const DoubtsPageDetail = () => {
  const meta = {
    title: "Ask Doubt",
    description: META_DESCRIPTION,
  };

  const router = useRouter();

  const [buttonLoader, setButtonLoader] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    text: "",
    description: "",
    attachments: [],
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const [teachersList, setTeachersList] = React.useState<any>();
  const [teachers, setTeachers] = React.useState<any>();

  const uploadFileToS3 = () => {
    let formDataPayload: any = [];
    setButtonLoader(true);

    if (formData.attachments && formData.attachments.length > 0) {
      formData.attachments.map((file: any) => {
        const formData = new FormData();
        formData.append("asset", file);
        let attributesJson = {
          type: file.type,
        };
        formData.append("attributes", JSON.stringify(attributesJson));
        formDataPayload.push(formData);
      });

      if (formDataPayload && formDataPayload.length > 0) {
        AsyncUploadS3File(formDataPayload)
          .then((response: any) => {
            setButtonLoader(false);
            let assetPayload: any = [];
            if (response && response.length > 0) {
              response.map((asset: any) => {
                assetPayload.push(asset.data);
              });
              if (assetPayload && assetPayload.length > 0) {
                submitDoubt(assetPayload);
              }
            } else {
              submitDoubt([]);
            }
          })
          .catch((error) => {
            setButtonLoader(false);
            console.log(error);
          });
      } else {
        submitDoubt([]);
      }
    } else {
      submitDoubt([]);
    }
  };

  const submitDoubt = (fileAttachments: any) => {
    const payload = {
      text: formData.text,
      data: { description: formData.description, attachments: fileAttachments },
      allocated_to: teachers && teachers.length > 0 ? teachers[0] : "",
    };

    setButtonLoader(true);
    DoubtCreate(payload)
      .then((response) => {
        setButtonLoader(false);
        mutate(
          [DOUBTS_WITH_QUERY_ENDPOINT(`?is_resolved=False`), `?is_resolved=False`],
          async (elements: any) => {
            if (elements) return [response, ...elements];
          },
          false
        );
        router.push("/doubts");
      })
      .catch((error) => {
        setButtonLoader(false);
      });
  };

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);

  React.useEffect(() => {
    if (users && users.length > 0) {
      let user_role_teacher: any = [{ id: null, name: "No teacher selected", role: 1 }];
      setTeachersList([...users, user_role_teacher]);
    }
  }, [users]);

  return (
    <div>
      <Page meta={meta}>
        <AdminLayout>
          <div className="right-layout px-5">
            <h4>Ask your doubt</h4>
            <div className="mt-4">
              <div>
                <Form.Group className="mb-2">
                  <Form.Label className="mb-1 text-muted">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.text}
                    onChange={(e: any) => handleFormData("text", e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group className="mb-2">
                  <Form.Label className="mb-1 text-muted">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Enter news here"
                    value={formData.description}
                    onChange={(e) => handleFormData("description", e.target.value)}
                    required
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group className="mb-2">
                  <Form.Label>
                    <div className="text-muted">Teachers</div>
                  </Form.Label>
                  {teachersList && teachersList.length > 0 && (
                    <SearchCheckboxView
                      users={teachersList}
                      data={teachers}
                      handleData={(value: any) => setTeachers(value)}
                      role={1}
                      validInput={1}
                    />
                  )}
                </Form.Group>
              </div>
              {/* multiple image uploader */}
              <div>
                <div className="text-muted mb-2">Upload Attachments</div>
                <ImageUploader data={null} handleData={handleFormData} />
              </div>
              <div className="d-flex mt-4">
                <div className="d-flex ms-auto gap-3">
                  <NextLink href="/doubts">
                    <a>
                      <Button size="sm" variant="secondary">
                        Cancel
                      </Button>
                    </a>
                  </NextLink>
                  <Button size="sm" type="submit" disabled={buttonLoader} onClick={uploadFileToS3}>
                    {buttonLoader ? "Loading..." : "Submit"}
                  </Button>
                </div>{" "}
              </div>
            </div>
          </div>
        </AdminLayout>
      </Page>
    </div>
  );
};

export default withGlobalAuth(DoubtsPageDetail);
