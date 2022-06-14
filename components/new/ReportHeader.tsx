import React from "react";
// next
import Link from "next/link";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";

const ReportHeader = () => {
  return (
    <div style={{ margin: "-15px", background: "#C0405C" }} className="py-5 text-white">
      <div className="container mx-auto d-flex justify-content-between align-items-center">
        <div>
          <Link href="/new/child-detail">
            <a>
              <LeftArrowAlt className="text-white" width="25px" />
            </a>
          </Link>
          <h2 className="mt-4">ACT</h2>
        </div>
        <div className="d-flex gap-4">
          <div className="">
            <div className="flex-shrink-0 round-image">
              <Image alt="" className="img-fluid d-block" src="/bird.svg" width="24" />
            </div>
            <div className="fw-bold my-1">Anuchal Mehta</div>
            <small>Grade 11, IGCSE</small>
          </div>
          <div className="">
            <div className="flex-shrink-0 round-image">
              <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="24" />
            </div>
            <div className="fw-bold my-1">Raj Gopal</div>
            <small>Teacher</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
