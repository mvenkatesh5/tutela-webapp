import React, { Fragment } from "react";
// react-bootstrap
import { Form, Image } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import Rating from "@components/new/Rating";
// layout
import NewLayout from "@layouts/newLayout";

const PerformanceBreakdown = () => {
  const meta = {
    title: "Performance Breakdown",
    description: META_DESCRIPTION,
  };

  const performanceData = [
    {
      title: "Worksheet 1",
      rating: 3,
      score: "70",
      total_score: "100",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      sub_title: [
        { title: " Shorter is better", total_score: "11", atained_score: "10" },
        { title: "Diction, Idiom, and register", total_score: "13", atained_score: "13" },
        { title: "Transitions", total_score: "20", atained_score: "25" },
        { title: "Relevance and purpose", total_score: "12", atained_score: "14" },
        { title: "Sentence Paragraph order", total_score: "4", atained_score: "4" },
      ],
    },
    {
      title: "Drill 1",
      rating: 4,
      score: "80",
      total_score: "100",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      sub_title: [],
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

          {performanceData &&
            performanceData.map((data: any, index: any) => (
              <div key={`performanceData-key-${index}`} className="mt-5">
                <div className="d-flex gap-3 my-4">
                  <h5 className="fw-bold my-auto">{data.title}</h5>
                  <Rating value={data.rating} />
                </div>
                <div className="d-flex align-items-center gap-2 my-3">
                  <div className="flex-shrink-0 round-image-lg">
                    <Image alt="" className="img-fluid d-block" src="/bird.svg" width="32" />
                  </div>
                  <div>
                    <div className="fw-bolder lh-1">
                      {data.score}/{data.total_score}
                    </div>
                    <small className="lh-1">score</small>
                  </div>
                </div>
                <div className="text-muted">{data.description}</div>
                <div className="mt-4">
                  {data.sub_title &&
                    data.sub_title.length > 0 &&
                    data.sub_title.map((sub_data: any, sub_index: any) => (
                      <div key={`${sub_index}-sub-title`} className="d-flex">
                        {sub_index + 1}. {sub_data.title} - {sub_data.atained_score}/
                        {sub_data.total_score}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </NewLayout>
    </Page>
  );
};

export default PerformanceBreakdown;
