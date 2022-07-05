import React, { Fragment } from "react";
// next imports
import { useRouter } from "next/router";
// icons
import { PeopleTeam } from "@styled-icons/fluentui-system-filled/PeopleTeam";
import { FileTextOutline } from "@styled-icons/evaicons-outline/FileTextOutline";
// react-bootstrap
import { Button, Image, Modal } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import Dropdown from "@components/new/Dropdown";
import AddTopicCluster from "@components/new/AddTopicCluster";
import UserSelectCalendarView from "@components/UserSelectDropdown";
// swr
import useSWR, { mutate } from "swr";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
// api routes
import {
  PRODUCTS_WITH_ID_ENDPOINT,
  PRODUCT_USER_DELETE_ENDPOINT,
  USER_ENDPOINT,
  PRODUCT_USER_ENDPOINT,
} from "@constants/routes";
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

  const { data: userList, error: userListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const { data: productUsers, error: productUsersError } = useSWR(
    product_id ? PRODUCT_USER_ENDPOINT(product_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const UserAddMentor = ({ children, valid = false, userRole, data }: any) => {
    const [formData, setFormData] = React.useState<any>();
    const handleFormData = (value: any) => {
      setFormData({ ...formData, mentor: value[0] });
    };

    const [modal, setModal] = React.useState<boolean>(false);
    const openModal = () => {
      setModal(true);
      setFormData({ id: data?.id, mentor: data?.mentor?.id || null });
    };
    const closeModal = () => {
      setModal(false);
      setFormData({ id: data?.id, mentor: null });
    };

    const [buttonLoader, setButtonLoader] = React.useState(false);
    const updateMentor = () => {
      setButtonLoader(true);
      APIUpdater(PRODUCT_USER_DELETE_ENDPOINT(formData?.id), formData)
        .then((response) => {
          mutate(PRODUCT_USER_ENDPOINT(product_id));
          setButtonLoader(true);
          closeModal();
        })
        .catch((error) => {
          console.log(error);
          setButtonLoader(true);
        });
    };

    return (
      <>
        {userRole === valid && valid === "teacher" && <>{children}</>}
        {userRole === valid && valid === "student" && (
          <>
            <div onClick={openModal} style={{ cursor: "pointer" }}>
              {children}
            </div>
            <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
              <Modal.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="m-0 p-0">Mentor</h5>
                  <div style={{ cursor: "pointer" }} onClick={closeModal}>
                    Close
                  </div>
                </div>
                <div>
                  {userList && userList.length > 0 && (
                    <UserSelectCalendarView
                      data={formData?.mentor}
                      users={userList}
                      handleData={handleFormData}
                    />
                  )}
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <Button variant="light" className="btn-sm" onClick={closeModal}>
                    Close
                  </Button>
                  <Button className="btn-sm" onClick={updateMentor} disabled={buttonLoader}>
                    {buttonLoader ? "Processing..." : "Continue"}
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </>
    );
  };

  const RenderCurrentUsers = ({ userRole }: any) => {
    if (productUsers && productUsers?.product_users && productUsers?.product_users.length > 0) {
      return productUsers?.product_users.map((user: any) => (
        <UserAddMentor
          key={`members-attendanceData-key-${user.id}-${user.first_name}`}
          data={user}
          valid={user?.user?.role == 0 ? "student" : "teacher"}
          userRole={userRole}
        >
          <div
            style={{ background: "#DFE1E6" }}
            className="px-2 py-1 rounded-pill d-flex align-items-center gap-1"
          >
            <Image alt="" className="rounded-circle" width="20px" src="/bird.svg" />
            <div className="fw-bold text-capitalize">
              {user?.user?.first_name} {user?.user?.last_name}
            </div>
            {user?.user?.role == 0 && (
              <small>
                mentored by{" "}
                <b style={{ color: "#1089ff" }}>
                  {user?.mentor?.first_name} {user?.mentor?.last_name}
                </b>
              </small>
            )}
          </div>
        </UserAddMentor>
      ));
    } else {
      return <div>No Members available/</div>;
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
                  {product.users.length}
                  <span className="text-muted">{product.users.length == 1 ? "User" : "Users"}</span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <FileTextOutline width="16px" />
                <div>
                  {product.resources.length}
                  <span className="text-muted">
                    {product.resources.length == 1 ? "Resource" : "Resources"}
                  </span>
                </div>
              </div>
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
                <h4>Members</h4>
                <h6 className="pt-3 pb-2">Mentors</h6>
                <div className="d-flex flex-wrap gap-4 mt-2">
                  <RenderCurrentUsers userRole={"teacher"} />
                </div>
                <h6 className="pt-3 pb-2">Users</h6>
                <div className="d-flex flex-wrap gap-4 mt-2">
                  <RenderCurrentUsers userRole={"student"} />
                </div>
              </div>
            )}
          </div>
        )}
      </AdminLayout>
    </Page>
  );
};

export default BehaviorPage;
