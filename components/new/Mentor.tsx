import React from "react";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";

const Mentor = ({ productsList }: any) => {
  const [open, setOpen] = React.useState(false);

  const mentors = [
    { name: "Raj Gopal", image: "/bird.svg" },
    { name: "Venkat Kumar", image: "/bird.svg" },
    { name: "L.S.Murthy", image: "/bird.svg" },
    { name: "Ramchandra", image: "/bird.svg" },
  ];

  return (
    <div className="border rounded">
      <div className="p-3 pb-2 d-flex justify-content-between">
        <h6 className="text-muted">MENTORS</h6>

        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <ChevronUp width="16px" /> : <ChevronDown width="16px" />}
        </div>
      </div>
      {open && (
        <>
          <hr className="my-0" />
          <div className="p-3">
            {productsList &&
              productsList.length > 0 &&
              productsList.map((mentor: any, index: any) => (
                <div key={`mentors-index-${index}`}>
                  {mentor?.mentor && (
                    <div
                      key={`mentors-index-${index}`}
                      className="d-flex my-2 bg-light p-1 gap-2 align-items-center px-2 rounded"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          alt=""
                          className="img-fluid mx-auto d-block "
                          src="/bird.svg"
                          width="20"
                        />
                      </div>
                      <div className="">
                        {mentor?.mentor?.first_name} {mentor?.mentor?.last_name}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className=""></div>
        </>
      )}
    </div>
  );
};

export default Mentor;
