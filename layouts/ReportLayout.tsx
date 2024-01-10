import React from "react";
// components
import DashboardNav from "@components/new/Navbar";
import SidebarView from "@components/new/Sidebar";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// global context provider
import { globalContext } from "@contexts/global";
import ReportNavbar from "@components/ReportNavbar";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";

const ReportLayout = ({ children, exam, teachers }: any) => {
  const router = useRouter();
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [tokenDetails, setTokenDetails] = React.useState<any>();
  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setTokenDetails(details);
      }
    }
  }, []);

  return (
    <div className="position-relative">
      <div className="position-relative w-100">
        <ReportNavbar />
      </div>
      <div className="tw-bg-[#C0405C]  ">
        <div className="md:tw-p-10 lg:tw-p-16 d-flex md:tw-px-[4em] lg:tw-px-[10em]">
          <div className="position-relative  tw-w-fit py-0">
            <LeftArrowAlt
              className="tw-text-white tw-w-8 tw-cursor-pointer"
              onClick={router.back}
            />
            <h1 className="tw-text-white tw-font-bold tw-text-6xl tw-mt-8">ACT</h1>
          </div>
          <div className="mx-auto"></div>
          <div className="position-relative  tw-w-fit d-flex align-items-end p-5 py-0 ">
            <div className="position-relative ">
              <div className="d-flex justify-content-start align-items-center ">
                <Image
                  src={"/bird.svg"}
                  alt="firstImage"
                  width={"50"}
                  className="img-fluid m-0 p-0 tw-rounded-full "
                />
              </div>
              <div className="position-relative tw-text-xl tw-font-bold tw-text-white mt-2">
                Anuchal Mehta
              </div>
              <div className="position-relative tw-text-white mt-1 text-left ">Grade 11, IGCSE</div>
            </div>
          </div>
          <div className="position-relative  tw-w-fit d-flex align-items-end p-5 py-0 ">
            <div className="position-relative ">
              <div className="d-flex justify-content-start align-items-center ">
                <Image
                  src={"/bird.svg"}
                  alt="firstImage"
                  width={"50"}
                  className="img-fluid m-0 p-0 tw-rounded-full "
                />
                {/* <Image
                  src={"/bird.svg"}
                  alt="firstImage"
                  width={"50"}
                  className="img-fluid m-0 p-0 tw-rounded-full tw-z-10"
                /> */}
              </div>
              <div className="position-relative tw-text-xl tw-font-bold tw-text-white mt-2">
                Raj Gopal
              </div>
              <div className="position-relative tw-text-white mt-1 text-left">Mentor</div>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative tw-bg-white h-auto w-100 md:tw-px-[4em] lg:tw-px-[10em] pt-5 pb-3">
        {children}
      </div>
    </div>
  );
};

export default ReportLayout;
