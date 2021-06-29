import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container, Card, Tab, Nav, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import FromBuilder from "@components/forms";
// layouts
import AdminLayout from "@layouts/adminLayout";
// global imports
import { teacherSchema } from "@constants/teacherSchema";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const userDetailView = () => {
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
          <div className="right-layout">
            <Container className="pt-3 pb-3">
              <h3 className="mb-4">Account</h3>
              <Tab.Container defaultActiveKey={teacherSchema[0].tab_key}>
                <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                  {teacherSchema.map((item: any, index: any) => (
                    <Nav.Item className="profile-account-nav-item">
                      <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                        {item.tab_name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="mt-4">
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
            </Container>
          </div>
        )}
      </AdminLayout>
    </div>
    </Page>
  );
};

export default withAdminAuth(userDetailView);
