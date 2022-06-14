import React, { Fragment } from "react";
// react-bootstrap
import { Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import Rating from "@components/new/Rating";
// layout
import NewLayout from "@layouts/newLayout";

const BehaviorPage = () => {
  const meta = {
    title: "Behavior",
    description: META_DESCRIPTION,
  };

  const performanceData = [
    {
      title: "Lorem ipsum is placeholder text",

      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum is placeholder text",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <ReportHeader />
        <div className="container mx-auto mt-5">
          <div className="d-flex gap-3 pt-4 mb-5">
            <div>
              <Form.Group className="mb-3">
                <Form.Control type="date" required />
              </Form.Group>
            </div>

            <Dropdown name="overview">
              <div className="bg-light px-2 py-1">Overview</div>
            </Dropdown>
          </div>

          {/* content  */}
          <Rating value={5} />

          {performanceData &&
            performanceData.map((data: any, index: any) => (
              <div key={`performanceData-key-${index}`} className="mt-5">
                <h5 className=" fw-bold">{data.title}</h5>
                <div className="text-muted">{data.description}</div>
              </div>
            ))}
        </div>
      </NewLayout>
    </Page>
  );
};

export default BehaviorPage;
