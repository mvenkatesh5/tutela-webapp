import React from "react";
// next
import Link from "next/link";
// react-bootstrap
import { Image, Form } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";

const ReportHeaderTeacher = ({ userDetailList, productDetail, mentor }: any) => {
  return (
    <div className=" report-header p-5 text-white">
      <div className="container mx-auto">
        <div className=" d-flex justify-content-between align-items-center">
          <div>
            <div className=" d-flex align-items-center gap-2">
              <LeftArrowAlt width="20px" className="mr-2" />
              <Image
                alt=""
                className="img-fluid d-block rounded-circle"
                src="/bird.svg"
                width="30"
              />
              <div className="fw-bold">Anuchal mehta</div>
            </div>

            <h1 className="mt-4">SAT</h1>
          </div>
          <div className="mt-auto">
            <Form.Group className="mb-3 text-muted">
              <Form.Control className="background-none" type="date" required />
            </Form.Group>
          </div>
        </div>
        <hr />
        <div className="d-flex gap-5 align-items-center justify-content-between flex-wrap mt-5">
          <div>
            <Image alt="" className="img-fluid d-block " src="/progress.svg" width="120" />
          </div>
          <div className="">
            <div className="flex-shrink-0 round-image-lg">
              <Image alt="" className="img-fluid d-block" src="/bird.svg" width="32" />
            </div>
            <div className="fw-bold my-1">20/24</div>
            <small>Attendance</small>
          </div>
          <div className="">
            <div className="flex-shrink-0 round-image-lg">
              <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="32" />
            </div>
            <div className="fw-bold my-1">76%</div>
            <small>Overall Progress</small>
          </div>
          <div className="">
            <div className="flex-shrink-0 round-image-lg">
              <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="32" />
            </div>
            <div className="fw-bold my-1">80/100</div>
            <small>Average Score</small>
          </div>{" "}
          <div className="">
            <div className="flex-shrink-0 round-image-lg">
              <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="32" />
            </div>
            <div className="fw-bold my-1">147hrs</div>
            <small>Time Spent</small>
          </div>{" "}
          <div className="">
            <div className="flex-shrink-0 round-image-lg">
              <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="32" />
            </div>
            <div className="fw-bold my-1">Raj Gopal & others</div>
            <small>Teachers</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeaderTeacher;
