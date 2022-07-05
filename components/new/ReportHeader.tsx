import React from "react";
// next
import Link from "next/link";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";

const ReportHeader = ({ userDetailList, productDetail, mentor }: any) => {
  return (
    <div className="py-5 text-white report-header">
      {productDetail && (
        <>
          <div className="container mx-auto d-flex justify-content-between align-items-center">
            <div>
              <Link href="/new/child-detail">
                <a>
                  <LeftArrowAlt className="text-white" width="32px" />
                </a>
              </Link>
              <h1 className="mt-4">{productDetail.name}</h1>
            </div>
            <div className="d-flex gap-5">
              <div className="">
                <div className="flex-shrink-0 round-image-lg">
                  <Image alt="" className="img-fluid d-block" src="/bird.svg" width="32" />
                </div>
                <div className="fw-bold my-1">
                  {userDetailList.first_name} {userDetailList.last_name}
                </div>
                <small>Grade 11, IGCSE</small>
              </div>
              <div className="">
                <div className="flex-shrink-0 round-image-lg">
                  <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="32" />
                </div>
                <div className="fw-bold my-1">{mentor.name}</div>
                <small>Mentor</small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportHeader;
