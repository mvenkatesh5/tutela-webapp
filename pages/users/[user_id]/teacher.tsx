import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container, Card, Tab, Nav, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import FromBuilder from "@components/forms";
import UserResourceView from "@components/resources/userResources/view";
// layouts
import AdminLayout from "@layouts/adminLayout";
// global imports
import { teacherSchema } from "@constants/teacherSchema";
import { datePreview } from "@constants/global";
// api routes
import {
  USER_WITH_ID_ENDPOINT,
  USER_RESOURCE_VIEW_ENDPOINT,
  RESOURCE_ENDPOINT,
} from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const userDetailView = () => {
  const defaultImageUrl = "/default-image.png";

  const router = useRouter();
  const user_id: any = router.query.user_id;

  const [profile, setProfile] = React.useState<any>({});
  const handleProfile = (key: any, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const { data: userDetailList, error: userDetailListError } = useSWR(
    user_id ? USER_WITH_ID_ENDPOINT(user_id) : null,
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

  React.useEffect(() => {
    if (userDetailList && userDetailList.profile_data) {
      setProfile(userDetailList.profile_data);
    }
  }, [userDetailList]);

  const meta = {
    title: "Tutela",
    description: META_DESCRIPTION,
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
                            <img className="rounded-circle img-fluid" src={defaultImageUrl} />
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
                      {/* resource binding */}
                      <UserResourceView
                        userResourceList={userResourceList}
                        resources={resources}
                        userId={user_id}
                      />
                    </div>
                    <div className="right-wrapper" style={{ overflowY: "auto" }}>
                      <Container className="m-0 p-0">
                        <Tab.Container defaultActiveKey={teacherSchema[0].tab_key}>
                          <Nav
                            className="custom-nav-tabs-links profile-account-nav"
                            variant="pills"
                          >
                            {teacherSchema.map((item: any, index: any) => (
                              <Nav.Item className="profile-account-nav-item">
                                <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                                  {item.tab_name}
                                </Nav.Link>
                              </Nav.Item>
                            ))}
                          </Nav>

                          <Tab.Content className="mt-3 ms-2 me-2">
                            {teacherSchema.map((item: any, index: any) => (
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
                                            <p style={{ color: "#777" }}>
                                              {tab_data.kind_description}
                                            </p>
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
                      </Container>
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

export default withAdminAuth(userDetailView);
