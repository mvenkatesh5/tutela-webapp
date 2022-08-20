import React from "react";
// next imports
import Link from "next/link";
// react bootstrap
import { Image } from "react-bootstrap";
// global
import { timeDateFormat } from "@constants/global";

function NewsCard({ data, users }: any) {
  console.log("data", data);

  const [user, setUser] = React.useState<any>("");

  React.useEffect(() => {
    if (users) {
      let userData = users.find((user: any) => data.student == user.id);
      setUser(userData);
    }
  }, []);

  return (
    <>
      <div className="border-bottom p-3 ">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Image alt="" className="img-fluid mb-1 rounded-circle" src="/bird.svg" width="22" />
          <small className="text-primary">
            {" "}
            {/* {FilterUser(data.student)} */}
            {user && user.first_name} {user && user.last_name}
          </small>
        </div>
        <Link href={`/parent/concern?concern=${data.id}`}>
          <a href="">
            <p className="fw-bold text-dark mb-1">{data.title || "Concern"}</p>
          </a>
        </Link>
        <small className="fw-light text-secondary mb-0">
          {timeDateFormat(data.created)}
          {/* {data.reply} {data.reply == 1 ? "reply" : "replies"} */}
        </small>
      </div>
    </>
  );
}

export default NewsCard;
