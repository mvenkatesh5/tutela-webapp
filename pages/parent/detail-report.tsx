// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular";
// layouts
import ParentLayout from "layouts/ParentLayout";
// components
import CustomNavTabs from "@components/navtabs/customNavtabs";
import Sonnet from "@components/navtabs/Sonnet";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";

function ParentDetailReport() {
  const navTabsData = [
    { title: "Overview", component: <Sonnet /> },
    { title: "Performance Breakdown", component: <Sonnet /> },
    { title: "Behaviour", component: <Sonnet /> },
    { title: "Attendance", component: <Sonnet /> },
    { title: "Syllabus Covered", component: <Sonnet /> },
  ];

  return (
    <ParentLayout>
      <div className="parent-detail-wrapper">
        <div className="container h-100">
          <div className="row h-100">
            {/* back arrow */}
            <div className="col-md-12 align-self-center">
              <div className="border p-1 py-2 d-inline">
                <LeftArrowAlt className="icon-size-elg text-white" />
              </div>

              {/* head */}
              <div className="d-flex mt-3">
                <div>
                  <h3 className="fw-bold m-0 text-white">Mathematics</h3>
                </div>
                <div className="ms-auto border rounded p-2">
                  <h6 className="mb-0 text-white">Jan 24, 2021</h6>
                </div>
              </div>
              <hr className="mt-2" style={{ borderTop: "1px solid #E2E2E2" }} />

              {/* progress */}
              <div className="">
                <div className="d-flex align-items-center">
                  <div className="p-3 ps-0">
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        border: "3px solid #fff",
                        padding: "30px",
                        borderRadius: "50%",
                      }}
                      className="me-3"
                    >
                      <h6 className="fw-bolder text-white m-0 mt-2">100%</h6>
                    </div>
                  </div>
                  <div className="p-3 px-5">
                    <img className="img-fluid mb-1" src="/calender.svg" width="30" />
                    <p className="mb-0 text-white fw-bolder">20/24</p>
                    <p className="text-white mb-0">Attendance</p>
                  </div>
                  <div className="p-3 px-5">
                    <img className="img-fluid mb-1" src="/clock.svg" width="30" />
                    <p className="mb-0 text-white fw-bolder">76%</p>
                    <p className="text-white mb-0">Overall Progress</p>
                  </div>
                  <div className="p-3 px-5">
                    <img className="img-fluid mb-1" src="/exam.svg" width="30" />
                    <p className="mb-0 text-white fw-bolder">80/100</p>
                    <p className="text-white mb-0">Average Score</p>
                  </div>

                  <div className="p-3 px-5">
                    <img className="img-fluid mb-1" src="/complete.svg" width="30" />

                    <p className="mb-0 text-white fw-bolder">147hrs</p>
                    <p className="text-white mb-0">Time Spent</p>
                  </div>
                  <div className="p-3 px-5">
                    <img className="img-fluid mb-1" src="/calender.svg" width="30" />
                    <p className="mb-0 text-white fw-bolder">Raj Gopal &amp; others</p>
                    <p className="text-white mb-0">Teachers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <CustomNavTabs data={navTabsData} />
      </div>
    </ParentLayout>
  );
}

export default withParentAuth(ParentDetailReport);
