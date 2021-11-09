import React from "react";
// react bootstrap
import { Form, Container, Card, Button, Tab, Nav, Row, Col } from "react-bootstrap";
// swr
import useSWR from "swr";
// blueprint
import { TimezonePicker } from "@blueprintjs/timezone";
// blueprint css
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// components
import FromBuilder from "@components/forms";
import Page from "@components/page";
// layouts
import StudentLayout from "@layouts/studentLayout";
// global imports
import { profileSchemaData } from "@constants/profileSchema";
// api routes
import { USER_WITH_ID_ENDPOINT, USER_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { UserUpdate } from "@lib/services/userService";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";
// constants
import { META_DESCRIPTION } from "@constants/page";
// global context provider
import { globalContext } from "@contexts/global";

const Profile = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

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
  const [timeZone, setTimeZone] = React.useState<any>();
  const [profile, setProfile] = React.useState<any>({});
  const handleProfile = (key: any, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const updateProfileData = () => {
    setButtonLoader(true);
    const payload = {
      id: tokenDetails && tokenDetails.user && tokenDetails.user.id,
      profile_data: profile,
      timezone: timeZone,
    };

    UserUpdate(payload)
      .then((response) => {
        setButtonLoader(false);
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: { kind: "success", description: "Profile updated successfully." },
        });
      })
      .catch((error) => {
        globalDispatch({
          type: "ADD_TOAST_ALERT",
          payload: {
            kind: "warning",
            description: "Please check your internet connection and retry again.",
          },
        });
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
    if (userDetailList) {
      if (userDetailList.profile_data) setProfile(userDetailList.profile_data);
      setTimeZone(userDetailList.timezone);
    }
  }, [userDetailList]);

  const meta = {
    title: "Profile",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <StudentLayout>
          {!userDetailList ? (
            <div className="text-center my-5">Loading.....</div>
          ) : (
            <Container className="py-3">
              <h3 className="mb-4">Account</h3>

              <div className="mb-2">
                <div className="text-secondary mb-1">Select TimeZone</div>
                <TimezonePicker
                  className="timezone-root"
                  valueDisplayFormat="composite"
                  value={timeZone}
                  onChange={(value) => {
                    setTimeZone(value);
                  }}
                />
              </div>

              <Tab.Container defaultActiveKey={profileSchemaData[0].tab_key}>
                <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                  {profileSchemaData.map((item: any, index: any) => (
                    <Nav.Item key={`nav-link-${index}`} className="profile-account-nav-item">
                      <Nav.Link key={`nav-item-${item.tab_key}`} eventKey={item.tab_key}>
                        {item.tab_name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="mt-4">
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
          )}
        </StudentLayout>
      </div>
    </Page>
  );
};

export default withStudentAuth(Profile);
