import { CloudDownload } from "styled-icons/material-rounded/";

function ResourceTable() {
  return (
    <>
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th scope="col">Serial</th>
            <th scope="col">File Name</th>
            <th scope="col">Subject</th>
            <th scope="col">Service</th>
            <th scope="col">Uploaded By</th>
            <th className="text-center text-muted" scope="col">
              ...
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Gemometry Session One PDF</td>
            <td>Maths</td>
            <td>SAT</td>
            <td>Ashish kumar</td>
            <td className="text-center">
              <CloudDownload className="text-muted" width="20" />
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Ozone Depletion One PDF</td>
            <td>Chemistry</td>
            <td>SAT</td>
            <td>Ashish kumar</td>
            <td className="text-center">
              <CloudDownload className="text-muted" width="20" />
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Gravity Session One PDF</td>
            <td>Physics</td>
            <td>SAT</td>
            <td>Ashish kumar</td>
            <td className="text-center">
              <CloudDownload className="text-muted" width="20" />
            </td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Gemometry Session One PDF</td>
            <td>Maths</td>
            <td>SAT</td>
            <td>Ashish kumar</td>
            <td className="text-center">
              <CloudDownload className="text-muted" width="20" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ResourceTable;
