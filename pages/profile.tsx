import React from "react";
// react bootstrap
import { Form, Container, Card, Button, Tab, Nav, Row, Col, Image } from "react-bootstrap";
// swr
import useSWR from "swr";
// styled icons
import { Times } from "@styled-icons/fa-solid/Times";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
// blueprint
import { TimezonePicker } from "@blueprintjs/timezone";
// blueprint css
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// components
import FromBuilder from "@components/forms";
import Page from "@components/page";
// layouts
import StudentV2Layout from "@layouts/v2/student/layout";
// global imports
import { profileSchemaData } from "@constants/profileSchema";
// api routes
import { USER_WITH_ID_ENDPOINT, USER_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
import { UserUpdate } from "@lib/services/userService";
import { ResourceFileUpload } from "@lib/services/resource.service";
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
      photo: photo,
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
  const [photo, setPhoto] = React.useState<any>(userDetailList?.photo);

  console.log("userDetailList", userDetailList);

  // data
  const hiddenFileInput: any = React.useRef(null);
  const handleClick = (event: any) => {
    if (hiddenFileInput) hiddenFileInput.current.click();
  };
  const [uploadTimerToggle, setUploadTimerToggle] = React.useState(false);
  const [uploadTimer, setUploadTimer] = React.useState(0);

  const readFile = (input: any) => {
    if (input.target.files && input.target.files[0]) {
      setUploadTimerToggle(true);
      let formData = new FormData();
      const ImageData = {
        name: input.target.files[0].name,
      };
      formData.append("asset", input.target.files[0]);
      formData.append("attributes", JSON.stringify(ImageData));

      uploadImageToS3(formData);
    }
  };

  const uploadImageToS3 = (formData: any) => {
    const config: any = {
      onUploadProgress: function (progressEvent: any) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadTimer(percentCompleted);
        if (percentCompleted === 100) {
          // setUploadTimerToggle(false);
          // setUploadTimer(0);
        }
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    ResourceFileUpload(formData, config)
      .then((response: any) => {
        setPhoto(response.asset);
        setUploadTimerToggle(false);
        setUploadTimer(0);
      })
      .catch((errorData: any) => {});
  };

  return (
    <Page meta={meta}>
      <StudentV2Layout page="my-profile">
        <div className="tw-w-full tw-h-full tw-overflow-y-auto">
          {!userDetailList ? (
            <div className="text-center my-5">Loading.....</div>
          ) : (
            <Container className="py-3">
              <div className="tw-bg-[#f8f8f8] p-4 pt-2 tw-rounded-lg">
                <h3 className="mb-4">My Profile</h3>

                <Form.Group className="mb-2">
                  <Form.Label as="div" className="mb-1 text-muted">
                    <Image
                      src={photo || userDetailList?.photo || "/bird.svg"}
                      width="100"
                      className="rounded"
                      alt=""
                    />
                  </Form.Label>
                  <button
                    className="mb-3 mt-2 tw-bg-[#C9A060] tw-rounded-lg tw-border-none tw-px-3"
                    onClick={handleClick}
                    disabled={uploadTimerToggle}
                  >
                    {uploadTimerToggle
                      ? `Uploading File ${uploadTimer}%`
                      : userDetailList?.photo
                      ? "Update Image"
                      : "Upload Image"}
                  </button>
                  <Form.Control
                    ref={hiddenFileInput}
                    type="file"
                    onChange={readFile}
                    required={true}
                    style={{ display: "none" }}
                  />
                </Form.Group>
                {/* mmmamaa */}
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
                              style={{ backgroundColor: "#fff", border: "none" }}
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

                <button
                  onClick={updateProfileData}
                  disabled={buttonLoader}
                  className="mb-3 mt-2 tw-bg-[#C9A060] tw-rounded tw-border-none tw-px-3 tw-py-2 tw-text-lg"
                >
                  {buttonLoader ? "Updating Profile..." : "Update Profile"}
                </button>
              </div>
            </Container>
          )}
        </div>
      </StudentV2Layout>
    </Page>
  );
};

export default withStudentAuth(Profile);
