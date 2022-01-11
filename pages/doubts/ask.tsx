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
// import ListDropdown from "@components/forms/InputList";
// api routes
import {
  DOUBTS_WITH_QUERY_ENDPOINT,
  USER_ENDPOINT,
  PRODUCT_USER_ENDPOINT,
} from "@constants/routes";
// api services
import { DoubtCreate } from "@lib/services/doubts.service";
import { APIFetcher } from "@lib/services";
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
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const [teachers, setTeachers] = React.useState<any>();

  const submitDoubt = () => {
    const payload = {
      text: formData.text,
      data: { description: formData.description },
      allocated_to: teachers.value ? teachers.value : "",
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
                  <SearchCheckboxView
                    users={users}
                    data={teachers}
                    handleData={(value: any) => setTeachers(value)}
                    role={1}
                    validInput={1}
                  />
                </Form.Group>
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
                  <Button size="sm" type="submit" disabled={buttonLoader} onClick={submitDoubt}>
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
