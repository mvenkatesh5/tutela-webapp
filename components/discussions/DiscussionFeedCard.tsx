import { Like, Dislike, ShareAlt, DotsHorizontal } from "@styled-icons/boxicons-regular";

function DiscussionFeedCard() {
  return (
    <>
      <div className="card shadow-sm p-3 mb-3">
        {/* header */}
        <div className="d-flex h-100 align-items-center">
          <div className="me-4">
            <div className="bg-light border rounded-circle w-100 p-4"></div>
          </div>
          <div>
            <p className="m-0">Bhavesh Raja</p>
            <span className="text-muted">2 Hrs Ago</span>
          </div>
          <div className="ms-auto me-3">
            <img src="/sat.png" className="rounded-circle" width="20" />
          </div>
          <div className="">
            <strong>SAT</strong>
          </div>
        </div>
        {/* detail */}

        <div className="bg-light border p-5 w-100 mt-3" style={{ height: "350px" }}></div>

        <div className="mt-3">
          <div className="d-flex align-items-center">
            <div className="me-1">
              <Like className="styled-icon text-primary" />
            </div>
            <div className="me-3">
              <small>140</small>
            </div>
            <div className="me-1">
              <Dislike className="styled-icon text-danger" />
            </div>
            <div className="me-3">
              <small>2</small>
            </div>
            <div className="ms-auto me-3">
              <ShareAlt className="styled-icon text-muted" />
            </div>

            <div>
              <DotsHorizontal className="styled-icon text-muted" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiscussionFeedCard;
