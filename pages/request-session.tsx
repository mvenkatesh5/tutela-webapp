// react bootstrap
import { Form, Button } from "react-bootstrap";

function RequestSectionPage() {
  return (
    <div className="border p-3 w-25">
      <h4 className="fw-bolder mb-4">Request a Session</h4>

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" />
          <Form.Label className="mt-3">Topic</Form.Label>
          <Form.Control type="text" />
          <Form.Label className="mt-3">Offering</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>

          <div className="d-flex mt-3">
            <div>
              <Form.Label>Date</Form.Label>
              <input className="form-control" type="date" />
            </div>
            <div className="ms-3 w-100">
              <Form.Label>Time</Form.Label>
              <input className="form-control" type="time" />
            </div>
          </div>
        </Form.Group>
      </Form>

      <Button className="d-block ms-auto mt-3">Request Session</Button>
    </div>
  );
}

export default RequestSectionPage;
