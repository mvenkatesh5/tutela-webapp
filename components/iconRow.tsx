import { useState } from "react";
// react bootstrap
import { Button, Modal, Form, Image } from "react-bootstrap";
// styled icons
import { CheveronDown } from "@styled-icons/zondicons";
import { CheveronUp } from "@styled-icons/zondicons/CheveronUp";
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
import { ExclamationCircleFill } from "@styled-icons/bootstrap/ExclamationCircleFill";
// swr
import { mutate } from "swr";
// api routes
import { USER_CALENDAR_SESSION_ENDPOINT } from "@constants/routes";
// api service
import { APIFetcher } from "@lib/services";
import { SessionUserUpdate } from "@lib/services/sessionservice";
// common
import { dateTimeFormat } from "@constants/global";

const IconRow = (props: any) => {
  const defaultImageUrl = `/bird.svg`;
  const [toggle, setToggle] = useState(false);
  const handle = () => {
    setToggle(!toggle);
  };

  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [currentSessionUser, setCurrentSessionUser] = useState<any>();
  const handleCurrentSessionUser = (key: any, value: any) => {
    setCurrentSessionUser({ ...currentSessionUser, [key]: value });
  };

  const [modal, setModal] = useState<boolean>(false);
  const openModal = (user: any) => {
    setModal(true);
    setCurrentSessionUser(user);
  };
  const closeModal = () => {
    setModal(false);
  };

  const updateUserCoins = (e: any) => {
    e.preventDefault();
    const payload = {
      id: currentSessionUser.id,
      coins: currentSessionUser.coins,
    };
    setButtonLoader(true);
    SessionUserUpdate(payload)
      .then((response) => {
        setButtonLoader(false);
        closeModal();
        mutate(
          [USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery), props.currentDateQuery],
          APIFetcher(USER_CALENDAR_SESSION_ENDPOINT(props.currentDateQuery)),
          false
        );
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  console.log(props);

  return (
    <div>
      <div className="row-icons-root-alter">
        {props.data.map((item: any, i: Number) => {
          if (toggle == true || (!toggle && i < 5)) {
            return (
              <div
                className="row-icons-alter-wrapper"
                onClick={() => {
                  if (props.role === "user") openModal(item);
                }}
              >
                <div className="row-icons-alter" title={item.name} key={i.toString()}>
                  {item ? <Image src={item.icon} alt="" /> : <Image src={defaultImageUrl} alt="" />}

                  {props.role === "user" && (
                    <div className="row-attendance">
                      {props.data.going ? (
                        <CheckCircleFill className="text-success" />
                      ) : (
                        <ExclamationCircleFill className="text-danger" />
                      )}
                    </div>
                  )}
                </div>
                <div className="row-name">{item.name} </div>
                {props.role === "user" && (
                  <div className="row-coins">
                    <div className="row-coin-icon">
                      <Image src={"/tutela-coin.png"} alt="" />
                    </div>
                    <div className="row-coin-count">{item.coins}</div>
                  </div>
                )}
              </div>
            );
          }
        })}
        {props.data.length > 5 && (
          <div onClick={handle} className="row-icons-alter-wrapper cursor">
            <div className="row-icons-alter ">
              {toggle ? <CheveronUp width="16px" /> : <CheveronDown width="16px" />}
            </div>
            <div className="row-name">{toggle ? " show less" : "show more"}</div>
          </div>
        )}
      </div>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={updateUserCoins}>
            <h5 className="mb-3">Give Appreciation</h5>
            {props.session && currentSessionUser && (
              <>
                <div className="mb-3">
                  <div className="coin-modal-wrapper">
                    <div className="coin-modal-icon">
                      <Image src={currentSessionUser.icon} alt="" />
                    </div>
                    <div className="coin-modal-text-wrapper">
                      <div className="coin-modal-name">{currentSessionUser.name}</div>
                      <div className="coin-modal-text">
                        <div className="coin-heading">Session Name</div>
                        <div className="coin-tog">:</div>
                        <div className="coin-description">{props.session.title}</div>
                      </div>
                      <div className="coin-modal-text">
                        <div className="coin-heading">Time</div>
                        <div className="coin-tog">:</div>
                        <div className="coin-description">
                          {dateTimeFormat(props.session.start_datetime)}
                        </div>
                      </div>
                      <div className="coin-modal-text">
                        <div className="coin-heading">Attendance</div>
                        <div className="coin-tog">:</div>
                        <div className="coin-description">
                          {currentSessionUser.going ? (
                            <span className="text-success">Present</span>
                          ) : (
                            <span className="text-danger">Absent</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="coin-modal-wrapper mt-3">
                    <div className="coin-modal-icon">
                      <Image src={"/tutela-coin.png"} alt="" />
                    </div>
                    <div className="coin-modal-text-wrapper w-100">
                      <Form.Group className="mb-2">
                        <Form.Label className="mb-1 text-muted">Coins</Form.Label>
                        <Form.Control
                          type="text"
                          value={currentSessionUser.coins}
                          onChange={(e) => handleCurrentSessionUser("coins", e.target.value)}
                          required
                          placeholder="No of coins"
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
                {currentSessionUser.going}
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  style={{ marginRight: "10px" }}
                  disabled={buttonLoader}
                  type="submit"
                >
                  {buttonLoader ? "Processing..." : "Confirm"}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="btn-sm"
                  disabled={buttonLoader}
                  onClick={closeModal}
                >
                  Close
                </Button>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default IconRow;
