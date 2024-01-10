import React from "react";
// react-bootstrap
import { Image } from "react-bootstrap";
// icons
import { ChevronDown } from "@styled-icons/boxicons-solid/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-solid/ChevronUp";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const Mentor = ({ mentors }: any) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState();
  const [filteredMentors, setFilteredMentors] = React.useState<any>([]);

  const filterFunction = (event: any) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredMentors(
      mentors.filter(
        (mentor: any) =>
          mentor.first_name.toLowerCase().includes(query) ||
          mentor.last_name.toLowerCase().includes(query)
      )
    );
  };

  React.useEffect(() => {
    setFilteredMentors(mentors);
  }, [mentors]);

  return (
    <div className="border rounded">
      <div className="p-3 pb-2  d-flex justify-content-between align-items-start">
        <div className="">
          <h6 className="text-muted">MENTORS</h6>
        </div>
        <div className="cursor-pointer  " onClick={() => setOpen(!open)}>
          {open ? <ChevronUp className="tw-w-5  " /> : <ChevronDown className="tw-w-5  " />}
        </div>
      </div>
      {open && (
        <>
          <hr className="my-0" />
          <div className="p-3">
            <input
              type="text"
              className="w-100 border px-3 py-2 rounded-3"
              placeholder="Search and add mentors"
              value={search}
              onChange={filterFunction}
            />
            {/* {productsList &&
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
              ))} */}
            {filteredMentors?.map((mentor: any, index: number) => (
              <div key={`mentors-index-${index}`}>
                <div
                  key={`mentors-index-${index}`}
                  className="d-flex justify-content-between my-2 tw-bg-gray-100 p-2 px-3 gap-3 align-items-center px-2 rounded"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="flex-shrink-0">
                      <Image
                        alt=""
                        className="img-fluid mx-auto d-block rounded-3 "
                        src="/bird.svg"
                        width="30"
                      />
                    </div>
                    <div className="tw-font-semibold">
                      {mentor?.first_name + " " + mentor?.last_name}{" "}
                    </div>
                  </div>
                  {/* <div className="cursor-pointer">
                    <CloseOutline className="tw-w-4 text-muted" />
                  </div> */}
                </div>
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
