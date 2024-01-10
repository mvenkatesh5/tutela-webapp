import React from "react";
// react-bootstrap
import { Image, Dropdown, Button } from "react-bootstrap";
// icons
import { DeleteOutline } from "@styled-icons/material-rounded/DeleteOutline";
import { ExclamationCircle } from "@styled-icons/heroicons-outline/ExclamationCircle";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";

const CommentCard = ({ data, deleteComment, currentUser }: any) => {
  const [loader, setLoader] = React.useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  const handleDeleteConfirmation = async () => {
    setLoader(true);
    try {
      let response = await deleteComment(data.id);
      if (response) {
        setLoader(false);
        setDeleteConfirmation(false);
      }
    } catch (error) {
      setLoader(false);
      setDeleteConfirmation(false);
    }
  };

  const handleDeleteConfirmationTimer = () => {
    setTimeout(() => {
      setLoader(false);
      setDeleteConfirmation(false);
    }, 2000);
  };

  return (
    <div className="d-flex gap-3 mb-3">
      <div className="flex-shrink-0 mx-2 mt-1">
        <Image alt="" className="img-fluid mx-auto d-block " src="/bird.svg" width="35" />
      </div>

      <div>
        <div className="fw-bold mb-2">
          {data?.user_detail?.first_name} {data?.user_detail?.last_name}
        </div>
        <small className=" ">{data.text}</small>
      </div>

      {/* <div className="items-center space-x-1 cursor-pointer ms-auto my-auto">
        <Dropdown>
          <Dropdown.Toggle className="text-button text-black plain-dropdown">
            <ThreeDotsVertical width="16px" height="16px" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="content-wrapper p-0 rounded overflow-auto">
            <div className="p-2 bg-light">
              {deleteConfirmation ? (
                <>
                  {loader ? (
                    <button
                      className={`d-flex gap-2 align-items-center text-danger text-button`}
                      onClick={handleDeleteConfirmation}
                      disabled={loader}
                    >
                      <DeleteOutline className="flex-shrink-0" width="18px" />
                      <div>Deleting...</div>
                    </button>
                  ) : (
                    <button
                      className={`d-flex gap-2 align-items-center text-warning text-button`}
                      onClick={handleDeleteConfirmation}
                    >
                      <ExclamationCircle className="flex-shrink-0" height="18px" />
                      <div className="flex-shrink-0">Confirm Delete</div>
                    </button>
                  )}
                </>
              ) : (
                <span
                  className="d-flex gap-2 align-items-center text-danger"
                  onClick={() => {
                    handleDeleteConfirmationTimer();
                    setDeleteConfirmation(!deleteConfirmation);
                  }}
                >
                  <DeleteOutline width="18px" />
                  <div>Delete</div>
                </span>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}
    </div>
  );
};

export default CommentCard;
