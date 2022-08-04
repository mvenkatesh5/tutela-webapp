import React, { Fragment } from "react";
// icons
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// react-bootstrap
import { Image } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Dropdown from "@components/new/Dropdown";
import AddTopicCluster from "@components/new/productDetail/AddTopicCluster";
import TopicsTable from "@components/new/productDetail/TopicsTable";
// layout
import NewLayout from "@layouts/newLayout";

const BehaviorPage = () => {
  const meta = {
    title: "Product Details",
    description: META_DESCRIPTION,
  };

  const productDetail = [
    { name: "Maths 1" },
    { name: "Maths 2" },
    { name: "science 1" },
    { name: "science 2" },
    { name: "english 1" },
  ];

  const tabsData = [
    { name: "Topics Included", key: "topics" },
    { name: "Members", key: "members" },
    { name: "Resources", key: "resources" },
    { name: "Product Detail", key: "product" },
    { name: "Feedback Schema", key: "schema" },
  ];
  const members = [
    { name: "Riya", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Varun kashyap", coins: "10" },
    { name: "Varun kashyap", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Varun kashyap", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Varun kashyap", coins: "10" },
    { name: "Riya", coins: "10" },
    { name: "Varun kashyap", coins: "10" },
  ];
  const [tabs, setTabs] = React.useState(tabsData[0].key);
  const schema = [{ name: "Classroom Score" }, { name: "Homework Score" }, { name: "Report" }];
  return (
    <Page meta={meta}>
      <NewLayout>
        <div className="container mx-auto mt-5">
          <h4>Learn Python Programming Mastercalss</h4>
          <div className="text-muted">
            This Python For Beginners Course Teaches You The Python Language Fast. Includes Python
            Online Training With Python...
          </div>

          <div className="d-flex gap-3 mt-3">
            <div className="d-flex">
              <PeopleTeam width="16px" />
              <div>
                10 <span className="text-muted">Users</span>{" "}
              </div>
            </div>
            <div className="d-flex">
              <FileTextOutline width="16px" />
              <div>
                31 <span className="text-muted"> Resources</span>{" "}
              </div>
            </div>{" "}
          </div>

          <div className="border-bottom my-4 d-flex gap-4">
            {tabsData &&
              tabsData.map((data: any, index: any) => (
                <div
                  key={`tabsData-index-${index}`}
                  onClick={() => setTabs(data.key)}
                  className={`fw-bold pb-2 cursor-pointer ${
                    tabs == data.key
                      ? "text-primary border-bottom border-primary border-3"
                      : "text-muted"
                  }`}
                >
                  {data.name}
                </div>
              ))}
          </div>

          {tabs == "topics" && (
            <>
              <div className="d-flex flex-wrap align-items-center justify-content-between mt-4">
                <h3>Topics</h3>
                <div className="d-flex gap-3 pt-4 mb-5">
                  <Dropdown name="overview">
                    <div className="bg-light px-2 py-1">Overview</div>
                  </Dropdown>
                  <Dropdown name="overview">
                    <div className="bg-light px-2 py-1">Overview</div>
                  </Dropdown>
                  <AddTopicCluster />
                </div>
              </div>
            </>
          )}
          {tabs == "members" && (
            <div className="mt-4">
              <h3>Members</h3>
              <div className="d-flex flex-wrap gap-4 mt-4">
                {members &&
                  members.map((data: any, index: any) => (
                    <div
                      key={`members-attendanceData-key-${index}`}
                      style={{ background: "#DFE1E6" }}
                      className="px-1 rounded-pill d-flex align-items-center gap-1"
                    >
                      <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
                      <div className="fw-bold">{data.name}</div>
                      <Image
                        alt=""
                        className="rounded-circle"
                        width="16px"
                        height="16px"
                        src="/tutela-coin.png"
                      />
                      <small>10</small>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {tabs == "schema" && (
            <div className="">
              <h3>Feedback Schema</h3>
              <div className="d-flex flex-wrap gap-3 mt-4">
                {schema &&
                  schema.map((data: any, index: any) => (
                    <div key={index} className="px-3 p-1 bg-muted rounded-pill h-100">
                      Classroom Score
                    </div>
                  ))}
                <div className="px-2 p-1 bg-muted rounded-circle h-100">+</div>
              </div>
            </div>
          )}
        </div>
      </NewLayout>
    </Page>
  );
};

export default BehaviorPage;
