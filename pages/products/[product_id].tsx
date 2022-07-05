import React, { Fragment } from "react";
// next imports
import { useRouter } from "next/router";
// icons
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// react-bootstrap
import { Button, Image } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Dropdown from "@components/new/Dropdown";
import AddTopicCluster from "@components/new/AddTopicCluster";
// swr
import useSWR from "swr";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { PRODUCTS_WITH_ID_ENDPOINT, USER_ENDPOINT } from "@constants/routes";
// layout
import AdminLayout from "@layouts/adminLayout";

const BehaviorPage = () => {
  const meta = {
    title: "Product Details",
    description: META_DESCRIPTION,
  };

  const router = useRouter();
  const product_id = router.query.product_id;

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

  const { data: product, error: productError } = useSWR(
    product_id ? PRODUCTS_WITH_ID_ENDPOINT(product_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: usersList, error: usersListError } = useSWR(USER_ENDPOINT, APIFetcher);

  // console.log("product.users", product.users);

  // teacher =1
  // student =2

  const GetUsersDataByUserId = (role: any) => {
    const users = usersList.filter((user: any) => product.users.includes(user.id));
    if (users.filter((user: any) => user.role == role).length > 0) {
      return users
        .filter((user: any) => user.role == role)
        .map((user: any) => (
          <div
            key={`members-attendanceData-key-${user.id}-${user.first_name}`}
            style={{ background: "#DFE1E6" }}
            className="px-1 rounded-pill d-flex align-items-center gap-1"
          >
            <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
            <div className="fw-bold">
              {user.first_name} {user.last_name}
            </div>
            <Image
              alt=""
              className="rounded-circle"
              width="16px"
              height="16px"
              src="/tutela-coin.png"
            />
            <small>10</small>
          </div>
        ));
    } else {
      return <div>{role == 1 ? "No mentors available" : "No students available"}</div>;
    }
  };

  return (
    <Page meta={meta}>
      <AdminLayout>
        {!product || productError ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="container mx-auto mt-5 px-4">
            <h4>{product.name}</h4>
            <div className="text-muted">{product.description}</div>

            <div className="d-flex gap-3 mt-3">
              <div className="d-flex gap-2">
                <PeopleTeam width="16px" />
                <div>
                  {product.users.length}{" "}
                  <span className="text-muted">{product.users.length == 1 ? "User" : "Users"}</span>{" "}
                </div>
              </div>
              <div className="d-flex gap-2">
                <FileTextOutline width="16px" />
                <div>
                  {product.resources.length}{" "}
                  <span className="text-muted">
                    {product.resources.length == 1 ? "Resource" : "Resources"}
                  </span>{" "}
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
            {tabs == "members" && (
              <div className="mt-4">
                <h3>Members</h3>
                <h5 className="mt-4">Users</h5>
                <div className="d-flex flex-wrap gap-4 mt-2">{GetUsersDataByUserId(0)}</div>
                <h5 className="mt-4">Mentors</h5>
                <div className="d-flex flex-wrap gap-4 mt-2">{GetUsersDataByUserId(1)}</div>
              </div>
            )}
          </div>
        )}
      </AdminLayout>
    </Page>
  );
};

export default BehaviorPage;
