import React, { Fragment } from "react";
// next
import Link from "next/link";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";
import { Calendar } from "@styled-icons/boxicons-regular/Calendar";
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
// layout
import NewLayout from "@layouts/newLayout";

const ProductReport = () => {
  const meta = {
    title: "Product Report",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
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
                <div className="flex-shrink-0">
                  <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="20" />
                </div>
                <div className="fw-bold my-1">Anuchal Mehta</div>
                <small>Grade 11, IGCSE</small>
              </div>
              <div className="">
                <div className="flex-shrink-0">
                  <Image alt="" className="img-fluid d-block rounded" src="/bird.svg" width="20" />
                </div>
                <div className="fw-bold my-1">Raj Gopal & others</div>
                <small>Teachers</small>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <h5 className="fw-bold">Syllabus completion </h5>
          <div className="progress mt-4">
            <div
              className="progress-bar w-75 bg-success"
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">23 Jan 2022</small>
            <small className="text-muted">23 May 2022</small>
          </div>

          <div className="d-flex gap-3 pt-3">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary btn-sm"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <Calendar width="16px" />
                  <div> Janurary 2021</div>
                  <ChevronDown width="16px" />
                </div>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Overview <ChevronDown width="16px" />
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>

          <h5 className="mt-4 fw-bold">Mathematics</h5>
          <div className="text-muted">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
          <h5 className="mt-4 fw-bold">Physics</h5>
          <div className="text-muted">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
        </div>
      </NewLayout>
    </Page>
  );
};

export default ProductReport;
