import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Card, Tab, Nav, Row, Col, Image } from "react-bootstrap";
// material
import { ArrowRightShort } from "@styled-icons/bootstrap/ArrowRightShort";
// swr
import useSWR, { mutate } from "swr";
// components
import FromBuilder from "@components/forms";
import MessageView from "@components/comments/view";
import SearchCheckboxView from "components/admin/sessions/SearchCheckbox";
import UserResourceView from "@components/resources/userResources/view";
import UserProductsView from "@components/admin/product/userProducts/View";
import UserParentModal from "@components/admin/UserParentModal";
// layouts
import AdminLayout from "@layouts/adminLayout";
// global imports
import { profileSchemaData } from "@constants/profileSchema";
import { datePreview } from "@constants/global";
// api routes
import {
  USER_ENDPOINT,
  USER_WITH_ID_ENDPOINT,
  USER_RESOURCE_VIEW_ENDPOINT,
  RESOURCE_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { UserUpdate } from "@lib/services/userService";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const UserDetailView = () => {
  const defaultImageUrl = "/default-image.png";

  const router = useRouter();
  const user_id: any = router.query.user_id;

  const [profile, setProfile] = React.useState<any>({});
  const handleProfile = (key: any, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const [sessionParents, setSessionParents] = React.useState<any>([48]);
  const handleSessionParents = (value: any) => {
    setSessionParents(value);
  };

  const [userResources, setUserResources] = React.useState<any>();
  const [users, setUsers] = React.useState<any>();

  const ProfileSchemaComponent = () => {
    return (
      <Tab.Container id="profile-schema-component" defaultActiveKey={profileSchemaData[0].tab_key}>
        <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
          {profileSchemaData.map((item: any, index: any) => (
            <Nav.Item key={`nav-link-${index}`} className="profile-account-nav-item">
              <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                {item.tab_name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content className="pt-3 pb-3">
          {profileSchemaData.map((item: any, index: any) => (
            <Tab.Pane key={`tab-pane-${item.tab_key}`} eventKey={item.tab_key}>
              {item.tab_data &&
                item.tab_data.length > 0 &&
                item.tab_data.map((tab_data: any, tab_index: any) => (
                  <Card
                    key={`tab-pane-row-${tab_index}`}
                    className="mb-5 p-5"
                    style={{ backgroundColor: "#f5f5f5", border: "none" }}
                  >
                    <Card.Body>
                      <Row className="pt-3 pb-4">
                        <Col md={6}>
                          <h5>{tab_data.kind_name}</h5>
                          <p style={{ color: "#777" }}>{tab_data.kind_description}</p>
                        </Col>
                        <Col md={6}>
                          <Row>
                            <FromBuilder
                              data={tab_data.kind_data}
                              profile={profile}
                              handleProfile={handleProfile}
                              rowIndex={index}
                              disabled={true}
                            />
                          </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    );
  };

  const ProfileTabComponent = () => {
    return (
      <>
        <div className="user-reports-root-wrapper">
          {userResources &&
          userResources.product_users &&
          userResources.product_users.length > 0 ? (
            <div className="report-card-wrapper">
              {userResources.product_users.map((resource: any, index: any) => (
                <div key={`report-card-container-${resource.id}`} className="report-card-container">
                  <Link href={`/user-report/${user_id}/${resource.product.id}/reports`}>
                    <a target="_blank">
                      <div
                        className="report-card"
                        style={{
                          backgroundColor: resource.product.color ? resource.product.color : "#000",
                        }}
                      >
                        <div className="text">{resource.product.name}</div>
                        <div className="icon">
                          <ArrowRightShort />
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5 mb-5 text-secondary">No Products are available.</div>
          )}
        </div>
      </>
    );
  };

  const profileTabContent = [
    {
      tab_name: "Discussion",
      tab_key: "profile_discussion",
      tab_component: <MessageView userId={user_id} />,
    },
    {
      tab_name: "Details",
      tab_key: "profile_details",
      tab_component: <ProfileSchemaComponent />,
    },
    {
      tab_name: "Reports",
      tab_key: "profile_reports",
      tab_component: <ProfileTabComponent />,
    },
  ];

  const { data: usersList, error: usersListError } = useSWR(USER_ENDPOINT, APIFetcher);

  const { data: userDetailList, error: userDetailListError } = useSWR(
    user_id ? [USER_WITH_ID_ENDPOINT(user_id), user_id] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: userResourceList, error: userResourceListError } = useSWR(
    user_id ? USER_RESOURCE_VIEW_ENDPOINT(user_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  const { data: resources, error: resourcesError } = useSWR(RESOURCE_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const { data: userProductResourceList, error: userProductListError } = useSWR(
    user_id ? USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(user_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );
  const { data: products, error: productsError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  React.useEffect(() => {
    if (userDetailList && userDetailList.profile_data) setProfile(userDetailList.profile_data);
  }, [userDetailList]);

  React.useEffect(() => {
    if (userProductResourceList) setUserResources(userProductResourceList);
  }, [userProductResourceList]);

  React.useEffect(() => {
    if (usersList) setUsers(usersList);
  }, [usersList]);

  const meta = {
    title: "User Details",
    description: META_DESCRIPTION,
  };

  const updateUserActiveStatus = (userId: any, status: any) => {
    const payload = {
      id: userId,
      is_active: status,
    };
    UserUpdate(payload)
      .then((response: any) => {
        console.log(response);
        mutate(
          [USER_WITH_ID_ENDPOINT(user_id), user_id],
          async (elements: any) => {
            return response;
          },
          false
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          {!userDetailList ? (
            <div className="text-center mt- 5 mb-5">Loading.....</div>
          ) : (
            <div className="right-layout m-0 p-0">
              <div className="profile-layout-wrapper">
                <div className="profile-title">
                  <h3 className="m-0 p-0">Account</h3>
                </div>
                <div className="profile-content">
                  <div className="profile-layout">
                    <div className="left-wrapper">
                      {/* profile detail */}
                      <div className="profile-detail">
                        <div className="header">
                          <div className="icon">
                            <Image
                              alt=""
                              className="rounded-circle img-fluid"
                              src={defaultImageUrl}
                            />
                          </div>
                          <div className="content">
                            <div className="content-primary">
                              {userDetailList.first_name} {userDetailList.last_name}
                            </div>
                            <div className="content-secondary">
                              joined: {datePreview(userDetailList.date_joined)}
                            </div>
                          </div>
                        </div>
                        <div className="extra-details">
                          <div className="details-label">Email</div>
                          <div className="details-text">{userDetailList.email}</div>
                        </div>
                      </div>

                      <UserParentModal user_id={user_id} users={users} />

                      <UserProductsView
                        userProductList={userProductResourceList}
                        products={products}
                        resources={resources}
                        userId={user_id}
                        users={users}
                      />
                      {/* resource binding */}
                      <UserResourceView
                        userResourceList={userProductResourceList}
                        resources={resources}
                        userId={user_id}
                      />
                      <div className="mt-3">
                        <button
                          type="button"
                          className={`btn ${
                            userDetailList.is_active ? "btn-danger" : "btn-success"
                          } btn-sm w-100`}
                          onClick={() =>
                            updateUserActiveStatus(userDetailList.id, !userDetailList.is_active)
                          }
                        >
                          {userDetailList.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </div>
                    <div className="right-wrapper">
                      <Tab.Container
                        id="profile-tab-content"
                        defaultActiveKey={`profile_tab_content_${profileTabContent[0].tab_key}`}
                      >
                        <div className="inner-profile-layout-wrapper">
                          <div className="inner-profile-title">
                            <Nav
                              className="custom-nav-tabs-links profile-account-nav w-100"
                              variant="pills"
                            >
                              {profileTabContent.map((item: any, index: any) => (
                                <Nav.Item
                                  key={`nav-link-${index}`}
                                  className="profile-account-nav-item"
                                >
                                  <Nav.Link
                                    key={`profile-tab-content-nav-item-${item.tab_key}`}
                                    eventKey={`profile_tab_content_${item.tab_key}`}
                                  >
                                    {item.tab_name}
                                  </Nav.Link>
                                </Nav.Item>
                              ))}
                            </Nav>
                          </div>
                          <div className="inner-profile-content">
                            <Tab.Content className="h-100">
                              {profileTabContent.map((item: any, index: any) => (
                                <Tab.Pane
                                  key={`profile-tab-content-tab-pane-${item.tab_key}`}
                                  eventKey={`profile_tab_content_${item.tab_key}`}
                                  className="h-100"
                                >
                                  {item.tab_component}
                                </Tab.Pane>
                              ))}
                            </Tab.Content>
                          </div>
                        </div>
                      </Tab.Container>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(UserDetailView);
