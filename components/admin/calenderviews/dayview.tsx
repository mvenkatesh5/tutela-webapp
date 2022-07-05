// react bootstrap
import { Row, Col } from "react-bootstrap";
// components
import SessionCard from "@components/new/SessionCard";
import AdminSessionCard from "@components/admin/sessions/sessionCard";
import SessionEditView from "@components/admin/sessions/edit";
import SessionPreviewCard from "@components/sesspreview";

const CalenderDayView = (props: any) => {
  return (
    <div>
      {!props.sessionListError && !props.sessionList ? (
        <div className="text-center text-muted mt-5 mb-5">Loading...</div>
      ) : (
        <Row>
          {props.sessionList && props.sessionList.length > 0 ? (
            <div>
              {props.sessionList.map((data: any, index: Number) => (
                <Col md={12} key={data.id} style={{ marginTop: "10px" }}>
                  {props.view == "parent" ? (
                    <SessionCard
                      data={data}
                      users={props.users}
                      role={props.role}
                      currentDateQuery={props.currentDateQuery}
                    />
                  ) : (
                    <AdminSessionCard
                      data={data}
                      users={props.users}
                      role={props.role}
                      currentDateQuery={props.currentDateQuery}
                    />
                  )}
                </Col>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted mt-5 mb-5">No sessions scheduled.</div>
          )}
        </Row>
      )}
    </div>
  );
};

export default CalenderDayView;
