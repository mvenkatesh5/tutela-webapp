// next imports
import Link from "next/link";
// react bootstrap
import { Image, Col } from "react-bootstrap";
import moment from "moment";

function NewsCard(props: any) {
  return (
    <>
      <Link href={props.data.link ? props.data.link : "#"}>
        <a className="h-100 w-100 border rounded p-4 pb-0 my-3" target="_blank">
          <div className="d-flex gap-3">
            <div className="mb-2">
              <p className="fw-bold text-dark mb-0">{props.data.title}</p>
              <small className=" text-secondary text-sm-start ">
                {moment.utc(props?.data?.created).local().startOf("seconds").fromNow()}
              </small>
            </div>
            <div className="text-end flex-shrink-0 ms-auto">
              <Image
                className="img-fluid rounded-3"
                src={props.data.image_url ? props.data.image_url : "/news.svg"}
                width="100"
                height="100"
                alt=""
              />
            </div>
          </div>
          <p className="fw-light text-secondary mb-0 mt-3">
            {props.data.description.slice(0, 100)}.......
          </p>
        </a>
      </Link>
    </>
  );
}

export default NewsCard;

// // next imports
// import Link from "next/link";
// // react bootstrap
// import { Image, Col } from "react-bootstrap";
// import moment from "moment";

// function NewsCard(props: any) {
//   console.log("this is props.data", props?.data);
//   return (
//     <>
//       <Link href={props.data.link ? props.data.link : "#"}>
//         <a className="h-100 w-100 px-3 py-4 border rounded" target="_blank">
//           <div className="d-flex align-items-center">
//             <div className="position-relative d-flex flex-column align-items-start">
//               <p className="fw-bold text-dark p-0 m-0">{props.data.title}</p>
//               <small className=" text-secondary text-sm-start ">
//                 {moment.utc(props?.data?.created).local().startOf("seconds").fromNow()}
//               </small>
//             </div>
//             <div className="text-end flex-shrink-0 ms-auto">
//               <Image
//                 className="img-fluid rounded-3"
//                 src={props.data.image_url ? props.data.image_url : "/news.svg"}
//                 width="90"
//                 height="90"
//                 alt=""
//               />
//             </div>
//           </div>
//         </a>
//       </Link>
//     </>
//   );
// }

// export default NewsCard;
