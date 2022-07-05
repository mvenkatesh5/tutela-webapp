import React, { Fragment } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/router";
// react-bootstrap
import { Row, Col, Image, Form } from "react-bootstrap";
// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";
import { ExclamationTriangle } from "@styled-icons/fa-solid/ExclamationTriangle";
// constants
import { META_DESCRIPTION } from "@constants/page";
// swr
import useSWR from "swr";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { PRODUCTS_WITH_USER_ID_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/routes";
// components
import Page from "@components/page";
import Mentor from "@components/new/Mentor";
import Products from "@components/new/Products";
import ProductCard from "@components/new/ProductCard";
// layout
import NewLayout from "@layouts/newLayout";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";

const ChildDetail = () => {
  const meta = {
    title: "Child Detail",
    description: META_DESCRIPTION,
  };

  const router = useRouter();
  const student_id = router.query.student_id;

  const mentors = [
    { name: "Raj Gopal", image: "/bird.svg" },
    { name: "Venkat Kumar", image: "/bird.svg" },
    { name: "L.S.Murthy", image: "/bird.svg" },
    { name: "Ramchandra", image: "/bird.svg" },
  ];
  const tentativeDates = [
    { name: "Sectional tests" },
    { name: "Full lenght tests" },
    { name: "Actual test" },
    { name: "Main test" },
  ];

  console.log("student_id", student_id);
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

  const { data: userDetailList, error: userDetailListError } = useSWR(
    student_id ? USER_WITH_ID_ENDPOINT(student_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: productsList, error: productsListError } = useSWR(
    student_id && student_id ? [PRODUCTS_WITH_USER_ID_ENDPOINT(student_id), student_id] : null,
    (url) => APIFetcher(url)
  );

  console.log("productsList", productsList);

  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        <Row className="mt-4  mx-auto">
          {userDetailList ? (
            <>
              <Col className="p-3" md={3}>
                <div className="border rounded p-3">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="flex-shrink-0">
                      <Image
                        alt=""
                        className="img-fluid mx-auto d-block "
                        src="/bird.svg"
                        width="65"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div className="fw-bold">
                        {userDetailList?.profile_data?.name
                          ? userDetailList?.profile_data?.name
                          : userDetailList.first_name + " " + userDetailList.last_name}
                      </div>
                      <small className="text-muted">{userDetailList?.profile_data?.school}</small>
                      {/* <small className="text-muted">Grade 11, IGCSE</small> */}
                    </div>
                  </div>

                  <div className="text-muted mt-3 ">Personal Details</div>
                  <hr className="my-1" />
                  <div className=" d-flex flex-column">
                    {userDetailList?.email && (
                      <>
                        <small className="text-muted mt-2">Email</small>
                        <small className="my-0">{userDetailList?.email}</small>
                      </>
                    )}
                    {userDetailList?.profile_data?.phone && (
                      <>
                        <small className="text-muted mt-2">Mobile </small>
                        <small className="my-0">{userDetailList?.profile_data?.phone}</small>
                      </>
                    )}
                    {userDetailList?.profile_data?.address && (
                      <>
                        <small className="text-muted mt-2">Address</small>
                        <small className="my-0">{userDetailList?.profile_data?.address}</small>
                      </>
                    )}
                  </div>
                </div>
                <div className="border rounded mt-4 p-3 d-flex gap-2">
                  <div className="flex-shrink-0">
                    <Image alt="" className="img-fluid d-block " src="/progress.svg" width="60" />
                  </div>
                  <small className="text-danger">
                    Attendance is below 80% , If this continues your ward will not be able to clear
                    the actaul test with a good score.
                  </small>
                </div>

                <div className=" mt-4">
                  <Mentor />
                </div>
                <div className=" mt-4">
                  {productsList ? (
                    <Products data={productsList.product_users} />
                  ) : (
                    <div className="">loading...</div>
                  )}
                </div>
              </Col>

              <Col md={9}>
                <Row>
                  <Col className="p-3" md={6}>
                    <h5 className="">Tentative Dates</h5>
                    <div className="border w-100  rounded p-3 py-2">
                      {tentativeDates &&
                        tentativeDates.map((date: any, index: any) => (
                          <div key={`dates-index-${index}`} className=" my-2 bg-light p-2 rounded">
                            {/* <Link href="/new/product-report"> */}
                            {/* <a> */}
                            <div className="text-black">{date.name}</div>
                            {/* </a> */}
                            {/* </Link> */}
                          </div>
                        ))}
                    </div>
                  </Col>
                  <Col className="p-3" md={6}>
                    <h5 className="">Mentors</h5>

                    <div className="border w-100 rounded p-3 py-2">
                      {mentors &&
                        mentors.map((mentor: any, index: any) => (
                          <div
                            key={`mentors-index-${index}`}
                            className="d-flex my-2 bg-light gap-2 align-items-center p-2 rounded"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                alt=""
                                className="img-fluid mx-auto d-block "
                                src="/bird.svg"
                                width="20"
                              />
                            </div>
                            <div className="">{mentor.name}</div>

                            <div className="ms-auto text-primary">
                              <RightArrowAlt width="18px" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </Col>
                  <h5 className="mt-2 ms-1">Products</h5>

                  <Row className="pe-0">
                    {userDetailList && (
                      <>
                        {!productsListError && !productsList ? (
                          <div className="text-center text-muted mt-5 mb-5">Loading...</div>
                        ) : (
                          <>
                            {productsList &&
                              productsList.product_users &&
                              productsList.product_users.length > 0 &&
                              productsList.product_users.map((product: any, index: any) => (
                                <Col className="my-2" md={4} key={`products-key-${index}`}>
                                  <ProductCard
                                    data={product.product}
                                    user_id={currentUser?.user.id}
                                    productsList={productsList}
                                    view={"parent"}
                                  />
                                </Col>
                              ))}
                          </>
                        )}
                      </>
                    )}
                  </Row>
                </Row>

                {/* <div className="d-flex justify-content-between mt-4 mb-2">
              <h5>Cumulative Attendace</h5>
              <div>
                <Form.Group className="mb-3">
                  <Form.Control type="date" required />
                </Form.Group>
              </div>
            </div>
            <div className="border w-100 p-3 rounded">
              <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
                <ExclamationTriangle width="18px" />
                <div>
                  Attendance is below 80% , If this continues your ward will not be able to clear
                  the actaul test with a good score.
                </div>
              </div>
              <div className="flex-shrink-0 mt-4">
                <Image alt="" className="img-fluid d-block " src="/progress.svg" width="100" />
              </div>
            </div> */}
              </Col>
            </>
          ) : (
            <div className="text-center">Loading...</div>
          )}
        </Row>
      </NewLayout>
    </Page>
  );
};

export default withParentAuth(ChildDetail);
