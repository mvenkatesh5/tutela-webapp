import React from "react";
// next imports
import { useRouter } from "next/router";
// react bootstrap
import { Container, Card, Tab, Nav, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import FromBuilder from "@components/forms";
import MessageView from "@components/comments/view";
// layouts
import AdminLayout from "@layouts/adminLayout";
// global imports
import { profileSchemaData } from "@constants/profileSchema";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const userDetailView = () => {
  const router = useRouter();
  const user_id: any = router.query.user_id;

  const [profile, setProfile] = React.useState<any>({});
  const handleProfile = (key: any, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const ProfileSchemaComponent = () => {
    return (
      <Tab.Container id="profile-schema-component" defaultActiveKey={profileSchemaData[0].tab_key}>
        <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
          {profileSchemaData.map((item: any, index: any) => (
            <Nav.Item className="profile-account-nav-item">
              <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                {item.tab_name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
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
  ];

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

  if (!userDetailList) return <div className="mt-5 mb-5 text-center">Loading...</div>;

  return (
    <div>
      <AdminLayout>
        <div className="right-layout m-0 p-0">
          <div className="profile-layout-wrapper">
            <div className="profile-title">
              <h3 className="m-0 p-0">Account</h3>
            </div>
            <div className="profile-content">
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
                        <Nav.Item className="profile-account-nav-item">
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
      </AdminLayout>
    </div>
  );
};

export default withAdminAuth(userDetailView);
