import { Like, Dislike, ShareAlt, DotsHorizontal } from "@styled-icons/boxicons-regular";

function DiscussionFeedCardSearch() {
  return (
    <>
      <div className="card shadow-sm p-3 mb-3">
        {/* header */}
        <div className="d-flex h-100 align-items-center">
          <div className="me-4">
            <div className="bg-light border rounded-circle w-100 p-4"></div>
          </div>
          <div>
            <p className="m-0">Ashish Kumar</p>
          </div>
          <div className="ms-auto me-3">
            <img src="/sat.png" className="rounded-circle" width="20" />
          </div>
        </div>
        {/* detail */}

        <textarea
          className="form-control mt-3"
          placeholder="Start discussion here"
          style={{ height: "90px" }}
        ></textarea>
      </div>
    </>
  );
}

export default DiscussionFeedCardSearch;
