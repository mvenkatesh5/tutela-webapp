import React from "react";
// react bootstrap
import { Button, Form } from "react-bootstrap";
// material icons
import { CalendarPlus } from "@styled-icons/boxicons-regular";
import { Times } from "@styled-icons/fa-solid";
// swr
import useSWR, { mutate } from "swr";
// components
import SessionForm from "./sessionForm";
import SessionUser from "./sessionUser";
// api routes
import {
  USER_CALENDAR_SESSION_ENDPOINT,
  PRODUCTS_ENDPOINT,
  PRODUCT_USER_ENDPOINT,
} from "@constants/routes";
// api services
import {
  SessionCreate,
  SessionUserCreate,
  SessionBulkUserCreate,
} from "@lib/services/sessionservice";
import { APIFetcher } from "@lib/services";

const SessionCreateView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setSessionData({
      title: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      link: "",
      data: {},
      listeners: [],
      teachers: [],
      product_selected: "",
      kind: "ONLINE",
    });
  };
  const openModal = () => setModal(true);

  const [sessionData, setSessionData] = React.useState({
    title: "",
    description: "",
    start_date: props.currentDate ? new Date(props.currentDate) : new Date(),
    end_date: props.currentDate ? new Date(props.currentDate) : new Date(),
    start_time: props.currentDate ? new Date(props.currentDate) : new Date(),
    end_time: props.currentDate ? new Date(props.currentDate) : new Date(),
    link: "",
    data: {},
    listeners: [],
    teachers: [],
    product_selected: "",
    kind: "ONLINE",
  });
  const handleSessionData = (value: any) => {
    setSessionData(value);
  };
  const handleSessionListeners = (key: any, value: any) => {
    setSessionData({ ...sessionData, [key]: value });
  };
  const handleProductListeners = (key: any, value: any) => {
    setSessionData({ ...sessionData, product_selected: value });
  };
  const handleDatetime = (date: any, time: any) => {
    let currentDate = new Date(date);
    let currentTime = new Date(time);
    currentDate.setHours(currentTime.getHours());
    currentDate.setMinutes(currentTime.getMinutes());
    currentDate.setSeconds(currentTime.getSeconds());
    return new Date(currentDate);
  };

  const sessionCreate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    const payload = {
      title: sessionData.title,
      description: sessionData.description,
      start_datetime: handleDatetime(sessionData.start_date, sessionData.start_time),
      end_datetime: handleDatetime(sessionData.start_date, sessionData.end_time),
      link: sessionData.link,
      data: sessionData.data,
      product: sessionData.product_selected,
      kind: sessionData.kind,
    };

    SessionCreate(payload)
      .then((res) => {
        console.log("res", res);
        createSessionUsers(res);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  const createSessionUsers = (session: any) => {
    let currentUsers: any = [];

    sessionData.listeners.map((listeners: any) => {
      const data = {
        as_role: 0,
        session: session.id,
        user: parseInt(listeners),
      };
      currentUsers.push(data);
    });

    sessionData.teachers.map((teachers: any) => {
      const data = {
        as_role: 1,
        session: session.id,
        user: parseInt(teachers),
      };
      currentUsers.push(data);
    });

    if (currentUsers && currentUsers.length > 0) {
      SessionBulkUserCreate(currentUsers)
        .then((res) => {
          mutate(
            [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
            APIFetcher(USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery)),
            false
          );
          closeModal();
          setButtonLoader(false);
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      mutate(
        [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
        async (elements: any) => {
          return [...elements, session];
        },
        false
      );
      closeModal();
      setButtonLoader(false);
    }
  };

  const { data: productsList, error: productsListError } = useSWR(
    modal ? PRODUCTS_ENDPOINT : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: productUserList, error: productUserListError } = useSWR(
    sessionData && sessionData.product_selected
      ? [PRODUCT_USER_ENDPOINT(sessionData.product_selected), sessionData.product_selected]
      : null,
    sessionData && sessionData.product_selected ? (url) => APIFetcher(url[0]) : null,
    { refreshInterval: 0 }
  );

  // console.log("productsList-->-->", productsList);
  // console.log("productUserList-->-->", productUserList);

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        <div className="d-flex justify-items-center">
          <div style={{ width: "18px", marginRight: "8px" }}>
            <CalendarPlus />
          </div>
          <div>Schedule Sessions</div>
        </div>
      </Button>

      {modal && (
        <div
          style={{
            width: "420px",
            position: "fixed",
            top: "125px",
            bottom: "10px",
            right: "20px",
            marginTop: "20px",
            minHeight: "450px",
            background: "#fff",
            boxShadow: `#0f0f0f0d 0px 0px 0px 1px, #0f0f0f1a 0px 3px 6px, #0f0f0f33 0px 9px 24px`,
            borderRadius: "4px",
            overflow: "hidden",
            zIndex: 9999999,
          }}
        >
          <Form onSubmit={sessionCreate}>
            <div
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                display: "flex",
                background: "#f5f5f5",
                padding: "8px 12px",
                zIndex: 99999,
                height: "40px",
              }}
            >
              <div style={{ fontWeight: 500 }}>Schedule a Meeting</div>
              <div
                style={{ marginLeft: "auto", width: "12px", cursor: "pointer" }}
                onClick={closeModal}
              >
                <Times />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "40px",
                bottom: "45px",
                width: "100%",
                overflow: "hidden",
                overflowY: "auto",
                padding: "10px 12px",
              }}
            >
              <SessionForm
                data={sessionData}
                handleData={handleSessionData}
                view_end_date={false}
                role={props.role}
              />

              {productsList && productsList.length > 0 && (
                <Form.Group className="mb-3" controlId={`form-control-product-session-create`}>
                  <Form.Label>Select Product</Form.Label>
                  <Form.Control
                    as="select"
                    size="sm"
                    className="mb-2"
                    value={sessionData.product_selected}
                    onChange={(e) => handleProductListeners("product_selected", e.target.value)}
                  >
                    <option value="">No Product Selected</option>
                    {productsList &&
                      productsList.length > 0 &&
                      productsList.map((product: any, index: any) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              )}

              <SessionUser
                data={sessionData}
                users={
                  productUserList && productUserList.length > 0 ? productUserList : props.users
                }
                handleData={handleSessionListeners}
                role={props.role}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                display: "flex",
                background: "#f5f5f5",
                padding: "8px 12px",
                height: "45px",
                zIndex: 99999,
              }}
            >
              <div style={{ marginLeft: "auto" }}>
                <Button
                  variant="outline-secondary"
                  className="btn-sm"
                  onClick={closeModal}
                  style={{ marginRight: "10px" }}
                >
                  Close
                </Button>
              </div>
              <div>
                <Button variant="primary" className="btn-sm" type="submit" disabled={buttonLoader}>
                  {buttonLoader ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}

      {/* <Modal show={modal} onHide={closeModal} size="lg" centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={sessionCreate}>
            <SessionForm data={sessionData} handleData={handleSessionData} />
            <SessionUser
              data={sessionData}
              users={productUserList && productUserList.length>0 ?productUserList:}
              handleData={handleSessionListeners}
            />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create Sessions
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default SessionCreateView;
