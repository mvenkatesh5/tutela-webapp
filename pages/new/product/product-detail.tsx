import React, { Fragment } from "react";
// icons
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// react-bootstrap
import { Button, Table } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Dropdown from "@components/new/Dropdown";
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
  ];

  const [tabs, setTabs] = React.useState(tabsData[0].key);

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
              <div className="d-flex align-items-center justify-content-between mt-4">
                <h3>Topics</h3>
                <div className="d-flex gap-3 pt-4 mb-5">
                  <Dropdown name="overview">
                    <div className="bg-light px-2 py-1">Overview</div>
                  </Dropdown>
                  <Dropdown name="overview">
                    <div className="bg-light px-2 py-1">Overview</div>
                  </Dropdown>
                  <Button className="btn btn-primary">Add Topic Cluster</Button>
                </div>
              </div>
              <div className="border rounded">
                <table className="mb-0 custom-table w-100">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Topic Name</th>
                      <th>Column</th>
                      <th>Column</th>
                      <th>Column</th>
                      <th>Column</th>
                      <th>
                        <div className="mb-1 p-2">...</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetail &&
                      productDetail.length > 0 &&
                      productDetail.map((data: any, index: any) => (
                        <tr key={`attendanceData-key-${index}`}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.name}</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td>data</td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </NewLayout>
    </Page>
  );
};

export default BehaviorPage;
