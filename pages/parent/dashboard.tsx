import React, { useRef, useState, useEffect } from "react";
// next imports
import Link from "next/link";
// chart js
import { Bar } from "react-chartjs-2";
// react bootstrap
import { Row, Col } from "react-bootstrap";
// icons
import { Calendar, RightArrowAlt } from "@styled-icons/boxicons-regular";
// swr
import useSWR from "swr";
// layouts
import ParentLayout from "layouts/ParentLayout";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { PRODUCTS_ENDPOINT } from "@constants/routes";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

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
  const { data: productsList, error: productsListError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher);

  const data = [
    { name: "Maths" },
    { name: "Physics" },
    { name: "Biology" },
    { name: "Chemistry" },
    { name: "Social" },
    { name: "English" },
  ];

  const meta = {
    title: "Dashboard",
    description: META_DESCRIPTION,
  };

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setCurrentUser(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else if (details.info.role === 3) setUserRole("parent");
        else setUserRole("student");
      }
    }
  }, []);

  return (
    <Page meta={meta}>
      <ParentLayout>
        <div className="container">
          {/* <div className="alert alert-light border" role="alert">
            <div className="d-flex">
              <div>
                <Calendar className="icon-size-lg me-2 text-danger" />
                180 days left before actual test
              </div>
              <div className="ms-auto">Exam Date : 25 July 2021</div>
            </div>
          </div> */}

          {/* Cards */}
          <h5 className="fw-bold mt-4 mb-2">Progress Report</h5>

          {!productsListError && !productsList ? (
            <div className="text-center text-muted mt-5 mb-5">Loading...</div>
          ) : (
            <Row className="mt-3 mb-3">
              {productsList &&
                productsList.length > 0 &&
                productsList.map((product: any, index: any) => (
                  <Col md={4} key={product.id}>
                    <Link href={`/parent/product/${product.id}`}>
                      <a>
                        <div className="card rounded mb-3">
                          <div
                            className="card-header d-flex align-items-center text-white"
                            style={{ backgroundColor: product.color ? product.color : "#ccc" }}
                          >
                            <div>
                              <h6 className="mb-0 text-white fw-bold single-line-text">
                                {product.name}
                              </h6>
                            </div>
                            <div className="ms-auto">
                              <RightArrowAlt className="icon-size-lg text-white" />
                            </div>
                          </div>

                          {/* <div className="card-body">
                            <div className="d-flex">
                              <div className="p-3 py-1">
                                <img className="img-fluid mb-3" src="/calender.svg" width="30" />
                                <p className="mb-0 fw-bolder text-black-50">20/24</p>
                                <p className="text-muted mb-0">Attendance</p>
                              </div>
                              <div className="p-3 py-1">
                                <img className="img-fluid mb-3" src="/clock.svg" width="30" />

                                <p className="mb-0 fw-bolder text-black">76%</p>
                                <p className="text-muted mb-0">Overall Progress</p>
                              </div>
                              <div className="p-3 py-1">
                                <img className="img-fluid mb-3" src="/exam.svg" width="30" />
                                <p className="mb-0 fw-bolder text-black-50">80/100</p>
                                <p className="text-muted mb-0">Avg. Score</p>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </a>
                    </Link>
                    {/* <div className="product-card-wrapper">
                      <div
                        className="header"
                        style={{ backgroundColor: product.color ? product.color : "#ccc" }}
                      >
                        <div className="left">{product.name}</div>
                      </div>
                      <div className="content">
                        <div className="description">{product.description}</div>
                      </div>
                    </div> */}
                  </Col>
                ))}
            </Row>
          )}

          {/* {data.map((item, index) => {
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
                          <img className="img-fluid mb-3" src="/calender.svg" width="30" />
                          <p className="mb-0 fw-bolder">20/24</p>
                          <p className="text-muted mb-0">Attendance</p>
                        </div>
                        <div className="p-3 py-1">
                          <img className="img-fluid mb-3" src="/clock.svg" width="30" />

                          <p className="mb-0 fw-bolder">76%</p>
                          <p className="text-muted mb-0">Overall Progress</p>
                        </div>
                        <div className="p-3 py-1">
                          <img className="img-fluid mb-3" src="/exam.svg" width="30" />
                          <p className="mb-0 fw-bolder">80/100</p>
                          <p className="text-muted mb-0">Avg. Score</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })} */}

          {/* <h3 className="fw-bold mt-4">Time spent on learning</h3>
          <div className="row mb-3">
            <div className="col-lg-8">
              <div className="border p-3">
                <Bar data={chartData} options={options} />
              </div>
            </div>
            <div className="col-lg-4">
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
          </div> */}
        </div>
      </ParentLayout>
    </Page>
  );
}

export default withParentAuth(ParentDashboard);
