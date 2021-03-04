// react
import React, { useRef, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

// layouts
import StudentLayout from "layouts/studentLayout";

// icons
import { Calendar, RightArrowAlt } from "@styled-icons/boxicons-regular";

const chartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  datasets: [
    {
      label: "# streak",
      data: [7, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const randomColor = () => {
  const colors = [
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#818CF8",
    "#A78BFA",
    "#F472B6",
    "#F87171",
    "#6D28D9",
    "#059669",
    "#DC2626",
    "#1F2937",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function ParentDashboard() {
  const data = [
    { name: "Maths" },
    { name: "Physics" },
    { name: "Biology" },
    { name: "Chemistry" },
    { name: "Social" },
    { name: "English" },
  ];

  return (
    <StudentLayout>
      <div className="container mt-5">
        <div className="alert alert-light border" role="alert">
          <div className="d-flex">
            <div>
              <Calendar className="icon-size-lg me-2 text-danger" />
              180 days left before actual test
            </div>
            <div className="ms-auto">Exam Date : 25 July 2021</div>
          </div>
        </div>

        {/* Cards */}
        <h3 className="fw-bold mt-4">Progress Report</h3>

        <div className="row">
          {data.map((item, index) => {
            return (
              <>
                <div className="col-md-4">
                  <div className="card rounded mb-3">
                    <div
                      className="card-header d-flex align-items-center"
                      style={{ backgroundColor: randomColor() }}
                    >
                      <div>
                        <h5 className="mb-0 text-white fw-bold">{item.name}</h5>
                      </div>
                      <div className="ms-auto">
                        <RightArrowAlt className="icon-size-lg text-white" />
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="d-flex">
                        <div className="p-3 py-1">
                          <p className="mb-0 fw-bolder">20/24</p>
                          <p className="text-muted mb-0">Attendance</p>
                        </div>
                        <div className="p-3 py-1">
                          <p className="mb-0 fw-bolder">76%</p>
                          <p className="text-muted mb-0">Overall Progress</p>
                        </div>
                        <div className="p-3 py-1">
                          <p className="mb-0 fw-bolder">80/100</p>
                          <p className="text-muted mb-0">Avg. Score</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <h3 className="fw-bold mt-4">Time spent on learning</h3>
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="border p-3">
              <Bar data={chartData} options={options} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header border-bottom-0 bg-white d-flex align-items-center pt-3 pb-0">
                <div>
                  <h5 className="mb-0">Last tests score</h5>
                </div>
                <div className="ms-auto">
                  <small className="m-0">
                    View All
                    <RightArrowAlt className="icon-size-lg" />
                  </small>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Test Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>SAT</td>
                      <td>29/11/2020</td>
                      <td>1150/1600</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>SAT</td>
                      <td>29/11/2020</td>
                      <td>1150/1600</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* card 2 */}

            <div className="card">
              <div className="card-header border-bottom-0 bg-white d-flex align-items-center pt-3 pb-0">
                <div>
                  <h5 className="mb-0">Reschedules</h5>
                </div>
                <div className="ms-auto">
                  <small className="m-0">
                    View All
                    <RightArrowAlt className="icon-size-lg" />
                  </small>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Actual Date</th>
                      <th scope="col">RQ. Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Maths</td>
                      <td>29/11/2020</td>
                      <td>30/11/2020</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Maths</td>
                      <td>29/11/2020</td>
                      <td>30/11/2020</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Maths</td>
                      <td>29/11/2020</td>
                      <td>30/11/2020</td>
                    </tr>
                  </tbody>
                </table>
                <div className="alert alert-danger mt-4 mb-0" role="alert">
                  Too many reschedules is an act of indispline.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

export default ParentDashboard;
