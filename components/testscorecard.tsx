import { Card } from "react-bootstrap";

function TestScroreCard() {
  return (
    <>
      <Card className="border-0 shadow mb-4">
        <Card.Body className="p-3">
          <h5 className="text-dark fw-bold">Last tests score</h5>

          <table className="table table-hover table-borderless">
            <thead>
              <tr>
                <th className="text-muted fw-light" scope="col">
                  Test Name
                </th>
                <th className="text-muted fw-light" scope="col">
                  Date
                </th>
                <th className="text-muted fw-light" scope="col">
                  Score
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
              <tr>
                <td>3. GRE</td>
                <td>29/11/2020</td>
                <td>1150/1600</td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}

export default TestScroreCard;
