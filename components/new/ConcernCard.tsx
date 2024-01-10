import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";
// global
import { timeDateFormat } from "@constants/global";
import Moment from "moment";

function NewsCard({ data, users }: any) {
  const [user, setUser] = React.useState<any>("");

  React.useEffect(() => {
    if (users) {
      let userData = users.find((user: any) => data.student == user.id);
      setUser(userData);
    }
  }, []);

  console.log("data", data);
  return (
    <>
      <Link href={`/parent/concern?concern=${data.id}`}>
        <div className="border-bottom p-3 px-4 ">
          <div className="position-relative gap-2 d-flex mb-2 tw-items-center">
            <Image src="/bird.svg" width={25} className="tw-rounded-full" />
            <small className="text-primary tw-text-md fw-bold">
              {data?.student_detail?.first_name} {data?.student_detail?.last_name}
            </small>
          </div>
          <Link href={`/parent/concern?concern=${data.id}`}>
            <a href="">
              <p className="fw-bold text-dark mb-0">{data.title || "Concern"}</p>
            </a>
          </Link>
          <small className=" text-secondary mb-0">
            {data?.concern_comments.length}{" "}
            {data.concern_comments.length <= 1 ? "reply" : "replies"}
          </small>
        </div>
      </Link>
    </>
  );
}

export default NewsCard;
