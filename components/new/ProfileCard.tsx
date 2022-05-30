// react bootstrap
import { Image } from "react-bootstrap";
// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular";

function NewsCard({ data }: any) {
  return (
    <>
      <div
        // key={`index-profile-key-${index}`}
        className="w-100 border rounded p-3 d-flex justify-content-start align-items-center gap-2 mb-3"
      >
        <div className="">
          <Image alt="" className="img-fluid mx-auto d-block" src={data.image} width="55" />
        </div>
        <div className="d-flex flex-column">
          <div className="fw-bold">{data.name}</div>
          <small>{data.school}</small>
          <small className="">
            {data.grade}, {data.syllabus}
          </small>
        </div>
        <div className="ms-auto text-primary">
          <RightArrowAlt width="24px" />
        </div>
      </div>
    </>
  );
}

export default NewsCard;
