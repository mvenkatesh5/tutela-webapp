import React from "react";
// react-bootstrap
import { Container, Row, Col, Image, Card, Button, Form } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Messenger from "@components/new/Messenger";
// icons
import { StarFill } from "@styled-icons/bootstrap/StarFill";
import { Plus } from "@styled-icons/fa-solid/Plus";
// layout
import NewLayout from "@layouts/newLayout";

const StudentReport = () => {
  const meta = {
    title: "Student Report",
    description: META_DESCRIPTION,
  };
  const [published, setPublished] = React.useState("unpublished");
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <div className="container mx-auto mt-4">
          <h3>Student Reports</h3>
          <div className="border-bottom w-100 d-flex gap-4">
            <div className="cursor-pointer" onClick={() => setPublished("unpublished")}>
              <div className={`py-2 ${published == "unpublished" && "text-danger fw-bold"} `}>
                Unpublished
              </div>
              {published == "unpublished" && (
                <div className="border border-2 rounded-pill border-danger"></div>
              )}{" "}
            </div>
            <div className="cursor-pointer" onClick={() => setPublished("published")}>
              <div className={`py-2 ${published == "published" && "text-danger fw-bold"} `}>
                Published
              </div>
              {published == "published" && (
                <div className="border border-2 rounded-pill border-danger"></div>
              )}
            </div>
          </div>

          {published == "unpublished" && (
            <div className="border-bottom my-4 pb-5">
              <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-2">
                  <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                  <small className="fw-bold">Anuchal mehta</small>
                  <small className="bg-light px-2 border rounded">Performance</small>
                </div>
                <Button className="btn btn-sm">Publish</Button>
              </div>

              <Row className="">
                <Col md={4} className="my-3">
                  <div className="border rounded p-3">
                    <div className="fw-bold">Test Name</div>
                    <div className="d-flex gap-5 mt-4">
                      <div className="">
                        <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                        <div className="text-sm text-muted">80/100</div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-sm text-muted">31 Aug 2021</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4} className="my-3">
                  <div className="border rounded p-3">
                    <div className="fw-bold">Test Name</div>
                    <div className="d-flex gap-5 mt-4">
                      <div className="">
                        <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                        <div className="text-sm text-muted">80/100</div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-sm text-muted">31 Aug 2021</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>

              <ol className="mt-3">
                <li>Shorter is better- 10/11</li>
                <li>Diction, Idiom, and register - 13/13 </li> <li>Transitions - 20/25</li>{" "}
                <li>Relevance and purpose - 12/14 </li> <li>Sentence Paragraph order - 4 / 4</li>
              </ol>
            </div>
          )}

          {published == "published" && (
            <div className="border-bottom my-4 pb-5">
              <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-2">
                  <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                  <small className="fw-bold">Anuchal mehta</small>
                  <small className="bg-light px-2 border rounded">Performance</small>
                </div>
              </div>

              <Row className="mt-3">
                <Col md={4}>
                  <div className="border rounded p-3">
                    <div className="fw-bold">Test Name</div>
                    <div className="d-flex gap-5 mt-4">
                      <div className="">
                        <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                        <div className="text-sm text-muted">80/100</div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-sm text-muted">31 Aug 2021</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="border rounded p-3">
                    <div className="fw-bold">Test Name</div>
                    <div className="d-flex gap-5 mt-4">
                      <div className="">
                        <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                        <div className="text-sm text-muted">80/100</div>
                      </div>
                      <div className="mt-auto">
                        <div className="text-sm text-muted">31 Aug 2021</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>

              <ol className="mt-3">
                <li>Shorter is better- 10/11</li>
                <li>Diction, Idiom, and register - 13/13 </li> <li>Transitions - 20/25</li>{" "}
                <li>Relevance and purpose - 12/14 </li> <li>Sentence Paragraph order - 4 / 4</li>
              </ol>
            </div>
          )}
        </div>
      </NewLayout>
    </Page>
  );
};

export default StudentReport;
