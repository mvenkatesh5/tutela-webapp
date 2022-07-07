// next imports
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";
// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular";

function NewsCard({ data }: any) {
  console.log("--------data-------",data);
  return (
    <>
      <div className="w-100 border rounded p-3 d-flex justify-content-start align-items-center gap-2 mb-3">
        <div className="">
          <Image
            alt=""
            className="img-fluid mx-auto d-block"
            src={data.photo|| "/bird.svg"}
            width="55"
          />
        </div>
        <div className="d-flex flex-column">
          <div className="fw-bold">
            {data?.profile_data?.name
              ? data?.profile_data?.name
              : data.first_name + " " + data.last_name}
          </div>
          <small>{data?.profile_data?.school}</small>
          <small className="">
            {data.profile_data?.grade}
            {data.profile_data?.syllabus && `, ${data.profile_data?.syllabus}`}
          </small>
        </div>
        <Link href={`/parent/${data.id}`}>
          <a className="ms-auto text-primary">
            <RightArrowAlt width="24px" />
          </a>
        </Link>
      </div>
    </>
  );
}

export default NewsCard;
