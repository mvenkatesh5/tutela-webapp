import { Card } from "react-bootstrap";
import { RightArrowAlt } from "@styled-icons/boxicons-regular";

function TestScroreCard() {
  return (
    <Card className="position-relative">
      <Card.Body className="tw-h-fit p-4">
        <div className="d-flex mb-1 justify-content-between">
          <h5 className="fw-bold tw-text-[#313131] ">Last Test Score</h5>

          <a>
            <div className="d-flex gap-2 text-primary align-items-center">
              <div className="text-nowrap">View all</div>
              <RightArrowAlt width="18px" />
            </div>
          </a>
        </div>

        <table className="table table-hover table-borderless mb-0">
          <thead>
            <tr className="text-uppercase ">
              <th className="text-muted fw-light  " scope="col">
                <small>Test Name</small>
              </th>
              <th className="text-muted fw-light" scope="col">
                <small>Date</small>
              </th>
              <th className="text-muted fw-light" scope="col">
                <small>Score</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. GRE</td>
              <td>29/11/2020</td>
              <td>1150/1600</td>
            </tr>
            <tr>
              <td>2. GRE</td>
              <td>29/11/2020</td>
              <td>1150/1600</td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}

export default TestScroreCard;
