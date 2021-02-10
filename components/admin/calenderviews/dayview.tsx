// react bootstrap
import { Row, Col } from "react-bootstrap";
// components
import SessionCard from "@components/admin/sessions/sessionCard";
import SessionEditView from "@components/admin/sessions/edit";
import SessionPreviewCard from "@components/sesspreview";

const CalenderDayView = (props: any) => {
  return (
    <div>
      <Row>
        {props.sessionList &&
          props.sessionList.length > 0 &&
          props.sessionList.map((data: any, index: Number) => (
            <Col md={12} key={data.id} style={{ marginTop: "10px" }}>
              <SessionCard data={data} role={props.role} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default CalenderDayView;
