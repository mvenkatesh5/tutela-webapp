import React from "react";
// next
import Link from "next/link";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";

const ReportHeader = ({ userDetailList, productDetail, mentor }: any) => {
  return (
    <div style={{ background: "#C0405C" }} className="p-5 text-white rounded">
      <>
        <div className="container mx-auto d-flex justify-content-between align-items-center">
          <div>
            <h1 className="mt-4">SAT</h1>
          </div>
          <div className="d-flex gap-5">
            <div className="">
              <div className="flex-shrink-0 round-image-lg">
                <Image alt="" className="img-fluid d-block" src="/bird.svg" width="32" />
              </div>
              <div className="fw-bold my-1">User Name</div>
              <small>Grade 11, IGCSE</small>
            </div>
            <div className="">
              <div className="flex-shrink-0 round-image-lg">
                <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="32" />
              </div>
              <div className="fw-bold my-1">Mentor Name</div>
              <small>Mentor</small>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ReportHeader;
