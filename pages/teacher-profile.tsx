import React from "react";
// react bootstrap
import { Form, Container, Card, Button, Tab, Nav, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// components
import FromBuilder from "@components/forms";
// layouts
import StudentLayout from "@layouts/studentLayout";
// global imports
import { teacherSchema } from "@constants/teacherSchema";
// api routes
import { USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { UserUpdate } from "@lib/services/userService";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withTeacherAuth from "@lib/hoc/withTeacherAuth";

const TeacherProfile = () => {
  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [profile, setProfile] = React.useState<any>({});
  const handleProfile = (key: any, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const updateProfileData = () => {
    setButtonLoader(true);
    const payload = {
      id: tokenDetails && tokenDetails.user && tokenDetails.user.id,
      profile_data: profile,
    };

    UserUpdate(payload)
      .then((response) => {
        setButtonLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  const { data: userDetailList, error: userDetailListError } = useSWR(
    tokenDetails && tokenDetails.user ? USER_WITH_ID_ENDPOINT(tokenDetails.user.id) : null,
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
      <StudentLayout>
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

          <Button onClick={updateProfileData} disabled={buttonLoader} className="btn-sm">
            {buttonLoader ? "Updating Profile..." : "Update Profile"}
          </Button>
        </Container>
      </StudentLayout>
    </div>
  );
};

export default withTeacherAuth(TeacherProfile);
