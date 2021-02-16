// react bootstrap
import { Button } from "react-bootstrap";
// layouts
import AdminLayout from "@layouts/adminLayout";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const ZoomView = () => {
  return (
    <AdminLayout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-white fw-bold py-3">
            <h4 className="m-0">Zoom Integration</h4>
          </div>
          <div className="card-body bg-light">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <img
                  src="https://pbs.twimg.com/profile_images/1285693559992008704/oD_oPSBP_400x400.jpg"
                  className="rounded"
                  width="40"
                />
              </div>
              <div>
                <p className="lead m-0">Zoom</p>
              </div>
              <div className="ms-auto">
                <Button variant="outline-primary">Add Key</Button>
              </div>
            </div>

            {/* table start */}
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Host Name</th>
                  <th scope="col">JWT Key</th>
                  <th scope="col">JWT Secret</th>
                  <th scope="col">Status</th>
                  <th scope="col">Number Of Hosts</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card shadow mt-4">
          <div className="card-header bg-white fw-bold py-3">
            <h4 className="m-0">Zoom User Status</h4>
          </div>
          <div className="card-body bg-light">
            {/* <div className="d-flex align-items-center">
              <div className="me-3">
                <img
                  src="https://pbs.twimg.com/profile_images/1285693559992008704/oD_oPSBP_400x400.jpg"
                  className="rounded"
                  width="40"
                />
              </div>
              <div>
                <p className="lead m-0">Zoom</p>
              </div>
              <div className="ms-auto">
                <Button variant="outline-primary">Add Key</Button>
              </div>
            </div> */}

            {/* table start */}
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Status</th>
                  <th scope="col">Remaining Time</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAdminAuth(ZoomView);
