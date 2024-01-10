// next imports
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";
// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular";

const ProfileCard = ({ data }: any) => {
  return (
    <div className="w-100">
      <Link href={`/parent/child/${data.id}`}>
        <a>
          <div className="w-100 border rounded-3 p-3 d-flex justify-content-start align-items-center gap-3">
            <div className="">
              <Image
                alt=""
                className="img-fluid mx-auto d-block"
                src={data.photo || "/bird.svg"}
                width="80"
              />
            </div>
            <div className="d-flex flex-column">
              <div className="fw-bold tw-text-xl" style={{ color: "black" }}>
                {data?.profile_data?.name
                  ? data?.profile_data?.name
                  : data.first_name + " " + data.last_name}
              </div>
              <small style={{ color: "gray" }}>
                {data?.profile_data?.school} public unknown but known school
              </small>
              <small className="" style={{ color: "gray" }}>
                {data.profile_data?.grade} Grade 12, testing
                {data.profile_data?.syllabus && `, ${data.profile_data?.syllabus}`}
              </small>
            </div>

            <div className="ms-auto text-primary">
              <RightArrowAlt className="tw-w-10" />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProfileCard;
