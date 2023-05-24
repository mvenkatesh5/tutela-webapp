import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Table, Form, Button } from "react-bootstrap";
// swr
import useSWR, { mutate } from "swr";
// blueprint
import { TimezonePicker } from "@blueprintjs/timezone";
// blueprint css
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// global constants
import { dateTimeFormat, datePreview } from "@constants/global";
// layouts
import AdminLayout from "@layouts/adminLayout";
// components
import Pagination from "@components/Pagination";
// api routes
import { USER_ENDPOINT, USER_PAGINATION_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher, APIUpdater } from "@lib/services";
import { UserUpdate } from "@lib/services/userService";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

const UserDetails = () => {
  const router = useRouter();

  const is_teacher: any = router.query.t;

  const handleUserRole = (user: any, role: any) => {
    const payload = { id: user.id, role: role };
    handleUpdate(payload);
  };
  const handleUserTimezone = (user: any, timezone: any) => {
    const payload = { id: user.id, timezone: timezone };
    handleUpdate(payload);
  };
  const handleUpdate = (payload: any) => {
    APIUpdater(USER_WITH_ID_ENDPOINT(payload.id), payload)
      .then((res: any) => {
        mutate(
          [
            `${USER_PAGINATION_ENDPOINT}?per_page=${perPageCount}&cursor=${cursor}`,
            `user-${cursor}`,
          ],
          async (elements: any) => {
            const currentElements = { ...elements };
            if (currentElements.results && currentElements.results.length > 0) {
              let index = currentElements.results.findIndex(
                (mutateData: any) => mutateData.id === userId
              );
              currentElements.results = currentElements.results.map((oldElement: any, i: Number) =>
                i === index ? response : oldElement
              );
              return currentElements;
            }
          },
          false
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const validateIsTeacherRouter = (user: any) => {
    if (is_teacher) {
      if (user.role === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const meta = {
    title: "Users",
    description: META_DESCRIPTION,
  };

  const updateUserStatus = (userId: any, key: any, status: any) => {
    let payload: any = {
      id: userId,
    };

    if (key === "is_active") payload = { ...payload, is_active: status };
    if (key === "is_course_completed") payload = { ...payload, is_course_completed: status };

    UserUpdate(payload)
      .then((response: any) => {
        mutate(
          [
            `${USER_PAGINATION_ENDPOINT}?per_page=${perPageCount}&cursor=${cursor}`,
            `user-${cursor}`,
          ],
          async (elements: any) => {
            const currentElements = { ...elements };
            if (currentElements.results && currentElements.results.length > 0) {
              let index = currentElements.results.findIndex(
                (mutateData: any) => mutateData.id === userId
              );
              currentElements.results = currentElements.results.map((oldElement: any, i: Number) =>
                i === index ? response : oldElement
              );
              return currentElements;
            }
          },
          false
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const [users, setUsers] = React.useState<any>();

  const [search, setSearch] = React.useState("");

  const [role, setRole] = React.useState("");
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const handleSearch = async () => {
    setButtonLoader(true);
    await mutate(
      [`${USER_PAGINATION_ENDPOINT}?per_page=${perPageCount}&cursor=${cursor}`, `user-${cursor}`],
      APIFetcher(
        `${USER_PAGINATION_ENDPOINT}?per_page=${perPageCount}&cursor=${cursor}
        ${search ? `&search=${search}` : ``}
        ${role ? `&role=${role}` : ``}`
      ),
      false
    );
    setButtonLoader(false);
  };

  const handleClearSearch = async () => {
    setButtonLoader(true);
    setSearch("");
    setRole("");
    await mutate([
      `${USER_PAGINATION_ENDPOINT}?per_page=${perPageCount}&cursor=${cursor}`,
      `user-${cursor}`,
    ]);
    setButtonLoader(false);
  };

  let perPageCount = 50;
  const [cursor, setCursor] = React.useState<any>(`50:0:0`);
  const [totalPages, setTotalPages] = React.useState<any>();

  const { data: userPaginationList, error: userPaginationListError } = useSWR(
    cursor
      ? [`${USER_PAGINATION_ENDPOINT}?per_page=${perPageCount}&cursor=${cursor}`, `user-${cursor}`]
      : null,
    APIFetcher
  );
  React.useEffect(() => {
    if (userPaginationList) {
      setTotalPages(userPaginationList.total_pages);
      setUsers(userPaginationList);
    }
  }, [userPaginationList]);

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          <div className="right-layout">
            <Container>
              <div className="d-flex align-items-center mt-2">
                <div>
                  <h5 className="m-0 p-0">Users</h5>
                </div>
                <div className="ms-auto"></div>
              </div>

              <div className="mb-3 mt-2 d-flex align-items-center gap-3">
                <div>
                  <Form.Group>
                    <Form.Label className="mb-1 text-muted">Search by</Form.Label>
                    <Form.Control
                      type="text"
                      value={search}
                      size="sm"
                      onChange={(e) => setSearch(e.target.value)}
                      required
                      placeholder="name, email, username"
                    />
                  </Form.Group>
                </div>
                <div>
                  <Form.Group>
                    <Form.Label className="mb-1 text-muted">Role</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      size="sm"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select user role</option>
                      <option value="0">Learner</option>
                      <option value="1">Teacher</option>
                      <option value="2">Admin</option>
                      <option value="3">Parent</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="outline-primary"
                    className="btn-sm"
                    disabled={buttonLoader}
                    onClick={handleSearch}
                  >
                    {buttonLoader ? "Processing..." : "Search"}
                  </Button>
                </div>
                <div className="mt-auto">
                  <Button
                    variant="outline-secondary"
                    className="btn-sm"
                    disabled={buttonLoader}
                    onClick={handleClearSearch}
                  >
                    {buttonLoader ? "Processing..." : "Clear"}
                  </Button>
                </div>
              </div>

              {userPaginationList && !userPaginationListError ? (
                <>
                  {users && users?.results && users?.results.length > 0 ? (
                    <div>
                      <div className="mb-3 mt-2">
                        <Pagination
                          data={userPaginationList}
                          cursor={cursor}
                          setCursor={setCursor}
                          count={perPageCount}
                          totalPages={totalPages}
                        />
                      </div>

                      <div style={{ overflow: "hidden", overflowX: "auto" }}>
                        <Table bordered style={{ whiteSpace: "nowrap" }}>
                          <thead>
                            <tr>
                              {!is_teacher && <th className="text-center">#</th>}
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Date Joined</th>
                              <th>Last Login</th>
                              <th>Last Logout</th>
                              <th>Status</th>
                              <th>Course Status</th>
                              <th>Role</th>
                              <th>TimeZone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users?.results.map((users: any, i: any) => {
                              if (validateIsTeacherRouter(users)) {
                                return (
                                  <tr key={i}>
                                    {!is_teacher && <td className="text-center p-2">{i + 1}</td>}
                                    <td className="heading p-2">
                                      <Link
                                        href={`/users/${
                                          users.role === 1 ? `${users.id}/teacher` : users.id
                                        }`}
                                      >
                                        <a target="_blank">{users.first_name}</a>
                                      </Link>
                                    </td>
                                    <td className="heading p-2">{users.last_name}</td>
                                    <td className="heading p-2">{users.username}</td>
                                    <td className="description p-2">{users.email}</td>
                                    <td className="description p-2 text-center">
                                      {users.date_joined ? datePreview(users.date_joined) : "-"}
                                    </td>
                                    <td className="description p-2 text-center">
                                      {users?.last_active ? datePreview(users?.last_active) : "-"}
                                    </td>
                                    <td className="description p-2 text-center">
                                      {users?.last_logout ? datePreview(users?.last_logout) : "-"}
                                    </td>
                                    <td className="description p-2 text-center">
                                      <button
                                        type="button"
                                        className={`btn ${
                                          users.is_active ? "btn-danger" : "btn-success"
                                        } btn-sm w-100`}
                                        onClick={() =>
                                          updateUserStatus(users.id, "is_active", !users.is_active)
                                        }
                                      >
                                        {users.is_active ? "Deactivate" : "Activate"}
                                      </button>
                                    </td>
                                    <td className="description p-2 text-center">
                                      <button
                                        type="button"
                                        className={`btn ${
                                          !users.is_course_completed ? "btn-danger" : "btn-success"
                                        } btn-sm w-100`}
                                        onClick={() =>
                                          updateUserStatus(
                                            users.id,
                                            "is_course_completed",
                                            !users.is_course_completed
                                          )
                                        }
                                      >
                                        {users.is_course_completed ? "Completed" : "Complete"}
                                      </button>
                                    </td>
                                    <td className="description p-2">
                                      <Form.Group
                                        controlId="exampleForm.ControlSelect1"
                                        style={{ minWidth: "200px" }}
                                      >
                                        <Form.Control
                                          as="select"
                                          value={users.role}
                                          onChange={(e) => handleUserRole(users, e.target.value)}
                                        >
                                          <option value="0">Learner</option>
                                          <option value="1">Teacher</option>
                                          <option value="2">Admin</option>
                                          <option value="3">Parent</option>
                                        </Form.Control>
                                      </Form.Group>
                                    </td>
                                    <td className="description p-2">
                                      <TimezonePicker
                                        className="timezone-root"
                                        valueDisplayFormat="composite"
                                        value={users.timezone}
                                        onChange={(value) => {
                                          handleUserTimezone(users, value);
                                        }}
                                      />
                                    </td>
                                  </tr>
                                );
                              }
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted mt-5 mb-5">No Users are available.</div>
                  )}
                </>
              ) : (
                <div className="text-center text-muted mt-5 mb-5">Loading...</div>
              )}
            </Container>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(UserDetails);
