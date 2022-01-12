import React from "react";
// next imports
import NextLink from "next/link";
import Image from "next/image";
import Head from "next/head";
// material icons
import { Pencil } from "@styled-icons/ionicons-sharp/Pencil";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";
// react bootstrap
import { Button, Tab, Nav, Dropdown } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// seo
import Page from "@components/page";
import { META_DESCRIPTION } from "@constants/page";
// layout
import AdminLayout from "@layouts/adminLayout";
// components
import DoubtsStatus from "@components/doubts/DoubtsStatus";
import DoubtsEdit from "@components/doubts/DoubtsEdit";
import DoubtsDelete from "@components/doubts/DoubtsDelete";
// import ListDropdown from "@components/forms/InputList";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// api routes
import { DOUBTS_ENDPOINT, DOUBTS_WITH_QUERY_ENDPOINT, USER_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";

const RenderDoubts = ({ doubts, user, user_role, mutateQuery, users }: any) => {
  return (
    <>
      {doubts.map((data: any, index: any) => (
        <div key={`doubts.mapping-${index}`} className="doubts-card">
          <div className="d-flex gap-3">
            <div className="name-icon">
              {data?.user?.first_name[0] || "n"}
              {data?.user?.last_name[0] || "a"}
            </div>
            <div className="content-container">
              <div className="w-100">
                <NextLink href={`/doubts/${data.id}`}>
                  <a>
                    <div className="heading">{data.text}</div>
                  </a>
                </NextLink>
                {data?.data?.description && (
                  <div className="description">{data?.data?.description}</div>
                )}
              </div>

              {user_role === "student" && user?.user?.id === data?.user?.id && (
                <>
                  <div className="ml-auto">
                    <DoubtsStatus doubt={data} mutateQuery={mutateQuery}>
                      {data?.is_resolved ? (
                        <Button size={"sm"}>Reopen</Button>
                      ) : (
                        <Button variant="secondary" size={"sm"}>
                          Resolve
                        </Button>
                      )}
                    </DoubtsStatus>
                  </div>
                  <div className="ml-auto">
                    <DoubtsEdit doubt={data} mutateQuery={mutateQuery} users={users}>
                      <Button variant="secondary" size={"sm"}>
                        <Pencil width="16" height="16" />
                      </Button>
                    </DoubtsEdit>
                  </div>
                  <div>
                    <DoubtsDelete doubt={data} mutateQuery={mutateQuery}>
                      <Button size={"sm"}>
                        <TrashFill width="16" height="16" />
                      </Button>
                    </DoubtsDelete>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const DoubtsPage = () => {
  const meta = {
    title: "Doubts",
    description: META_DESCRIPTION,
  };

  const getCurrentUser = () => {
    let user: any = getAuthenticationToken();
    user = user ? JSON.parse(user) : "";
    if (user && user) {
      return user;
    }
    return null;
  };

  const getCurrentRole = (user: any) => {
    if (user && user.user && user.user.role === 0) return "student";
    if (user && user.user && user.user.role === 1) return "teacher";
    if (user && user.user && user.user.role === 2) return "admin";
    if (user && user.user && user.user.role === 3) return "parent";
  };

  const userTabContent = [
    { title: "Unresolved", key: "unresolved" },
    { title: "Resolved", key: "resolved" },
  ];

  const teacherTabContent = [
    { title: "Allocated Doubts", key: "allocated_doubts" },
    { title: "Open Doubts", key: "open_doubts" },
  ];

  const [currentTabContent, setCurrentTabContent] = React.useState<any>("resolved");
  const [currentTab, setCurrentTab] = React.useState<any>();

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [currentUserRole, setCurrentUserRole] = React.useState<any>();

  const [currentRenderQuery, setCurrentRenderQuery] = React.useState<any>();
  const [dropdownToggle, setDropdownToggle] = React.useState<any>(false);
  React.useEffect(() => {
    let current_user = getCurrentUser();
    if (current_user) {
      setCurrentUser(current_user);
      setCurrentUserRole(getCurrentRole(current_user));
    }
  }, []);

  React.useEffect(() => {
    if (currentTab) {
      if (currentUserRole != "teacher") {
        setCurrentRenderQuery(
          currentTab === "resolved" ? `?is_resolved=True` : `?is_resolved=False`
        );
      }
    }
  }, [currentTab]);

  React.useEffect(() => {
    if (currentUserRole && currentUserRole === "teacher") {
      setCurrentTabContent(teacherTabContent);
      setCurrentTab(teacherTabContent[0].key);
    } else {
      setCurrentTabContent(userTabContent);
      setCurrentTab(userTabContent[0].key);
    }
  }, [currentUserRole]);

  const teacherDoubtTabContent = [
    { name: "Unresolved", value: "unresolved" },
    { name: "Resolved", value: "resolved" },
  ];

  const [teacherDoubtContentTab, setTeacherDoubtContentTab] = React.useState<any>();

  React.useEffect(() => {
    setTeacherDoubtContentTab({ name: "Unresolved", value: "unresolved" });
  }, []);

  React.useEffect(() => {
    if (currentTab) {
      if (currentUserRole === "teacher") {
        setCurrentRenderQuery(
          currentTab === "allocated_doubts" && currentUser?.user?.id
            ? `?allocated_to=${currentUser?.user?.id}${
                teacherDoubtContentTab.value === "resolved"
                  ? `&is_resolved=True`
                  : `&is_resolved=False`
              }`
            : `${
                teacherDoubtContentTab.value === "resolved"
                  ? `?is_resolved=True`
                  : `?is_resolved=False`
              }`
        );
      }
    }
  }, [teacherDoubtContentTab, currentTab]);

  const { data: doubts, error: doubtsError } = useSWR(
    currentRenderQuery
      ? [DOUBTS_WITH_QUERY_ENDPOINT(currentRenderQuery), currentRenderQuery]
      : null,
    APIFetcher
  );

  const { data: users, error: usersError } = useSWR(USER_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <Head>
        <title>Doubts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>
        <div className="right-layout">
          <div className="container">
            <div className="d-flex items-center mt-2 mb-2 gap-2">
              <h5 className="m-0 p-0">Doubts</h5>
              <div className="ms-auto">
                {currentUser && currentUserRole === "student" && (
                  <NextLink href="/doubts/ask">
                    <a>
                      <Button size={"sm"}>Ask a Doubt</Button>
                    </a>
                  </NextLink>
                )}
              </div>

              {currentUser && currentUserRole === "teacher" && (
                <div className="doubts-teachers-dropdown-wrapper">
                  <Dropdown
                    style={{ position: "relative" }}
                    onChange={(value: any) => setTeacherDoubtContentTab(value)}
                    show={dropdownToggle}
                  >
                    <Dropdown.Toggle as="div">
                      <Button onClick={() => setDropdownToggle(true)} className="dropdown-button">
                        {teacherDoubtContentTab.name}
                      </Button>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="content-wrapper p-0">
                      <div
                        onClick={(value: any) => {
                          setTeacherDoubtContentTab({ name: "Unresolved", value: "unresolved" });
                          setDropdownToggle(false);
                        }}
                        className="option"
                      >
                        Unresolved
                      </div>
                      <div
                        onClick={(value: any) => {
                          setTeacherDoubtContentTab({ name: "Resolved", value: "resolved" });
                          setDropdownToggle(false);
                        }}
                        className="option"
                      >
                        Resolved
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>

            <>
              {currentTabContent && currentTab && (
                <>
                  <Tab.Container
                    defaultActiveKey="0"
                    onSelect={(index: any) => {
                      setCurrentTab(currentTabContent[index].key);
                    }}
                  >
                    <div className="coupons-nav-tabs-container">
                      <Nav className="custom-nav-tabs-links profile-account-nav" variant="pills">
                        {currentTabContent &&
                          currentTabContent.length > 0 &&
                          currentTabContent.map((data: any, dataIndex: any) => (
                            <Nav.Item
                              key={`doubt-tab-${data.key}`}
                              className="profile-account-nav-item"
                            >
                              <Nav.Link key="active" eventKey={dataIndex}>
                                {data.title}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                      </Nav>
                    </div>

                    <Tab.Content className="mt-3">
                      {currentTabContent &&
                        currentTabContent.length > 0 &&
                        currentTabContent.map((data: any, dataIndex: any) => (
                          <Tab.Pane key={`current-tab-index-${dataIndex}`} eventKey={dataIndex}>
                            <div>
                              {!doubts && !doubtsError ? (
                                <div className="text-center text-muted mt-5">Loading...</div>
                              ) : (
                                <>
                                  {doubts && doubts.length > 0 ? (
                                    <RenderDoubts
                                      doubts={doubts}
                                      user={currentUser}
                                      user_role={currentUserRole}
                                      status={currentTab}
                                      mutateQuery={[
                                        DOUBTS_WITH_QUERY_ENDPOINT(currentRenderQuery),
                                        currentRenderQuery,
                                      ]}
                                      users={users}
                                    />
                                  ) : (
                                    <div className="text-center text-muted mt-5">
                                      No doubts are asked...
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </Tab.Pane>
                        ))}
                    </Tab.Content>
                  </Tab.Container>
                </>
              )}
            </>
          </div>
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withGlobalAuth(DoubtsPage);
