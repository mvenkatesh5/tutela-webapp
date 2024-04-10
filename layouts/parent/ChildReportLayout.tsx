import React from "react";
import ReportNavbar from "@components/ReportNavbar";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular/LeftArrowAlt";
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";

const ReportLayout = ({ children, student, product, mentors }: any) => {
  const router = useRouter();

  const profile = student.profile_data;
  let studentName = student.username || student.first_name + " " + student.last_name;
  let studentDetail;
  if (profile) {
    studentName = profile.name;
    studentDetail = profile.class + ", " + profile.school;
  }
  let mentorName;
  if (mentors.length > 1) {
    mentorName = mentors[0].username || mentors[0].first_name + " " + mentors[0].last_name;
    if (mentors[0].profile_data) {
      mentorName = mentors[0].profile_data.name;
    }
  }
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
            <h1 className="tw-text-white tw-font-bold tw-text-6xl tw-mt-8">{product?.name}</h1>
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
                {studentName}
              </div>
              <div className="position-relative tw-text-white mt-1 text-left ">{studentDetail}</div>
            </div>
          </div>
          {mentorName && (
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
                  {mentorName} {mentors.length > 1 && "& Others"}
                </div>
                <div className="position-relative tw-text-white mt-1 text-left">Mentor</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="position-relative tw-bg-white h-auto w-100 md:tw-px-[4em] lg:tw-px-[10em] pt-5 pb-3">
        {children}
      </div>
    </div>
  );
};

export default ReportLayout;
