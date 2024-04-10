import React, { Fragment } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/router";
// react-bootstrap
import { Row, Col, Image, Form, Container } from "react-bootstrap";
// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular/RightArrowAlt";
import { ExclamationTriangle } from "@styled-icons/fa-solid/ExclamationTriangle";
import { File } from "@styled-icons/fa-regular/File";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
import { ExclamationTriangleFill } from "@styled-icons/bootstrap/ExclamationTriangleFill";
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
import Resources from "@components/new/Resources";
import ProductCard from "@components/new/ProductCard";

// layout
import NewLayout from "@layouts/newLayout";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";
// date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// chart js
import CircularProgressBar from "@components/CircularProgressBar";
// api routes
import { PRODUCTS_ENDPOINT, USER_PRODUCT_RESOURCE_VIEW_ENDPOINT } from "@constants/routes";

const ChildDetail = () => {
  const meta = {
    title: "Child Detail",
    description: META_DESCRIPTION,
  };

  const router = useRouter();
  const student_id = router.query.student_id;
  const [startDate, setStartDate] = React.useState(new Date());
  const [products, setProducts] = React.useState<any>([]);
  const [resources, setResources] = React.useState<any>([]);
  const [mentors, setMentors] = React.useState<any>([]);

  // const mentors = [
  //   { name: "Raj Gopal", image: "/bird.svg" },
  //   { name: "Venkat Kumar", image: "/bird.svg" },
  //   { name: "L.S.Murthy", image: "/bird.svg" },
  //   { name: "Ramchandra", image: "/bird.svg" },
  // ];
  const tentativeDates = [
    { name: "Sectional tests" },
    { name: "Full lenght tests" },
    { name: "Actual test" },
    { name: "Main test" },
  ];

  // const products = [
  //   {
  //     name: "Scholastic Assessment Test Masterclass",
  //     desc: "This Python For Beginners Course Teaches You The Python Language Fast. Includes...",
  //     res: 31,
  //     color: "#313131",
  //   },
  //   {
  //     name: "Scholastic Assessment Tests (SAT)",
  //     desc: "This Python For Beginners Course Teaches You The Python Language Fast. Includes...",
  //     res: 31,
  //     color: "#C0405C",
  //   },
  //   {
  //     name: "American College Testing (ACT)",
  //     desc: "This Python For Beginners Course Teaches You The Python Language Fast. Includes...",
  //     res: 31,
  //     color: "#4FABF7",
  //   },
  // ];

  // const { data: productsList, error: productsError } = useSWR(PRODUCTS_ENDPOINT, APIFetcher, {
  //   refreshInterval: 0,
  // });

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

  // const { data: productsList, error: productsListError } = useSWR(
  //   student_id && student_id ? [PRODUCTS_WITH_USER_ID_ENDPOINT(student_id), student_id] : null,
  //   (url) => APIFetcher(url)
  // );

  const { data: userProductResourceList, error: userProductListError } = useSWR(
    student_id ? USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(student_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (userProductResourceList) {
      setProducts(userProductResourceList.product_users.map((prod: any) => prod.product));
      setResources(userProductResourceList.user_resources.map((prod: any) => prod.resource_node));
      const mentorList = userProductResourceList.product_users.filter((prod: any) => {
        if (prod.mentor) return prod.mentor;
      });
      setMentors(mentorList.map((ment: any) => ment.mentor));
    }
  }, [userProductResourceList]);

  console.log("these are mentors", mentors);
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        {userDetailList ? (
          <div className=" md:tw-px-[4em] lg:tw-px-[10em] h-100 w-100 py-4  position-relative  ">
            <Row className="position-relative w-100  mx-auto text-dark ">
              <Col md={3} className="position-relative  p-3 ">
                {/* profile card */}
                <div className="border rounded p-3">
                  <div className="w-100  d-flex justify-content-start align-items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        alt=""
                        className="img-fluid mx-auto d-block "
                        src={userDetailList?.photo || "/bird.svg"}
                        width="65"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <div className="tw-font-semibold">
                        {userDetailList?.profile_data?.name
                          ? userDetailList?.profile_data?.name
                          : userDetailList.first_name + " " + userDetailList.last_name}
                      </div>
                      <small style={{ color: "gray" }}>
                        {userDetailList?.profile_data?.school} public unknown but known school
                      </small>
                      <small className="" style={{ color: "gray" }}>
                        {userDetailList.profile_data?.grade} Grade 12, testing
                        {userDetailList.profile_data?.syllabus &&
                          `, ${userDetailList.profile_data?.syllabus}`}
                      </small>
                    </div>
                  </div>
                  <div className="mt-3 text-muted tw-font-semibold border-bottom pb-2 mb-2">
                    Personal Details
                  </div>
                  <div className="position-relative tw-space-y-2">
                    {userDetailList?.email && (
                      <div className="d-flex tw-flex-col">
                        <small className="text-muted tw-font-semibold">Email</small>
                        <small className="my-0">{userDetailList?.email}</small>
                      </div>
                    )}

                    {userDetailList?.profile_data?.phone && (
                      <div className="d-flex tw-flex-col">
                        <small className="text-muted tw-font-semibold">Mobile </small>
                        <small className="my-0">{userDetailList?.profile_data?.phone}</small>
                      </div>
                    )}

                    {userDetailList?.profile_data?.address && (
                      <div className="d-flex tw-flex-col">
                        <small className="text-muted tw-font-semibold">Address</small>
                        <small className="my-0">{userDetailList?.profile_data?.address}</small>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="position-relative mt-4 d-flex gap-3 border rounded-3 p-3">
                  <div className="position-relative">
                    <CircularProgressBar
                      percent={76}
                      show_text={true}
                      text_size="tw-text-xl tw-mt-4"
                      width={80}
                      stroke_width={10}
                      color="#F92814"
                      strokeLinecap="round"
                    />
                  </div>
                  <div className="position-relative tw-text-[#F92814] tw-font-semibold">
                    Attendance is below 80% , If this continues your ward will not be able to clear
                    the actaul test with a good score.
                  </div>
                </div> */}

                <div className="position-relative mt-4">
                  <Mentor mentors={mentors} />
                </div>
                <div className=" position-relative mt-4">
                  <Resources resources={resources} />
                </div>
              </Col>
              <Col md={9} className="position-relative  p-3 tw-space-y-3 ">
                <Row className="position-relative w-100 mx-auto tw-h-fit">
                  {/* <Col md={6} className=" px-3 pb-3">
                    <div className="position-relative mb-4 tw-text-[#313131] ">
                      <h4>Tentative Dates</h4>
                    </div>
                    <div className="position-relative border rounded-3 tw-h-64 tw-overflow-auto p-3 tw-space-y-3">
                      {tentativeDates.map((product: any, index: number) => (
                        <div key={`products-index-${index}`}>
                          <div
                            key={`products-index-${index}`}
                            className="d-flex justify-content-between tw-bg-gray-100 p-2 px-3 gap-3 align-items-center px-2 rounded"
                          >
                            <div className="tw-text-base tw-text-black">{product?.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col> */}
                  <Col md={6} className=" px-3 pb-3">
                    <div className="position-relative mb-4 tw-text-[#313131]">
                      <h4>Mentors </h4>
                    </div>
                    <div className="position-relative border rounded-3 tw-h-64 tw-overflow-auto p-3 tw-space-y-3">
                      {mentors?.map((mentor: any, index: number) => (
                        <div key={`mentors-index-${index}`}>
                          <div
                            key={`mentors-index-${index}`}
                            className="d-flex justify-content-between tw-bg-gray-100 p-2 px-3 gap-3 align-items-center px-2 rounded"
                          >
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <Image
                                  alt=""
                                  className="img-fluid mx-auto d-block rounded-3 "
                                  src="/bird.svg"
                                  width="30"
                                />
                              </div>
                              <div className="tw-font-semibold">
                                {mentor?.first_name + " " + mentor?.last_name}{" "}
                              </div>
                            </div>
                            <div className="cursor-pointer">
                              <RightArrowAlt className="tw-w-4 text-primary" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>

                <Row className="position-relative w-100 mx-auto">
                  <div className="position-relative mb-3 px-4 tw-text-[#313131]">
                    <h3>Products</h3>
                  </div>
                  {products.map((prod: any, index: number) => (
                    <Col md={4} className="p-3 pt-0" key={index}>
                      <div className="rounded-3 border tw-overflow-hidden">
                        <div
                          className="py-3"
                          style={{
                            background: prod.color,
                          }}
                        />

                        <div
                          className="position-relative tw-h-[10em] p-3 tw-cursor-pointer"
                          onClick={() => {
                            router.push(`/parent/student/${student_id}/product/${prod.id}/reports`);
                          }}
                        >
                          <h4>{prod.name}</h4>
                          <div className="position-relative py-2 text-muted">
                            <small>{prod.description}</small>
                          </div>
                        </div>
                        <div className=" tw-bottom-0 p-3 position-relative d-flex justify-content-between align-items-center">
                          <div className="text-muted d-flex tw-justify-start tw-items-bottom gap-2">
                            <File className="tw-w-3" />{" "}
                            <small className="text-dark">
                              {" "}
                              <span className="fw-bold">{prod.resources.length}</span> Resource
                            </small>
                          </div>
                          <div className="cursor-pointer">
                            <ThreeDotsVertical className="tw-w-3" />
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                {/* <Row className="position-relative w-100 mx-auto">
                    <div className="position-relative mb-0 px-4 tw-text-[#313131] d-flex justify-content-between align-items-center">
                      <div>
                        <h3>Cumulative Attendance</h3>
                      </div>
                      <div className="">
                        <DatePicker
                          selected={startDate}
                          onChange={(date: Date) => setStartDate(date)}
                          className="rounded-3 border-1 border-secondary px-2"
                        />
                      </div>
                    </div>
                    <div className="w-100 m-3 p-3 border rounded-3 tw-h-[15em] ">
                      <div className=" p-2 tw-bg-red-200 rounded-3 px-4 tw-text-red-500">
                        <ExclamationTriangle className="tw-w-4 me-3" />
                        Attendance is below 80% , If this continues your ward will not be able to
                        clear the actaul test with a good score.
                      </div>
                      <div className="tw-w-full tw-h-fit mt-3 position-relative tw-overflow-hidden">
                        
                      </div>
                    </div>
                  </Row> */}
              </Col>
            </Row>
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </NewLayout>
    </Page>
  );
};

export default withParentAuth(ChildDetail);
