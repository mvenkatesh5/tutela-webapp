import { Card } from "react-bootstrap";

import { Like, Dislike, ShareAlt, DotsHorizontal } from "@styled-icons/boxicons-regular";

function DiscussionCard(props: any) {
  return (
    <>
      <Card>
        <div className="p-3">
          <div className="d-flex h-100 align-items-center">
            <div className="me-4">
              <div className="bg-light border rounded-circle w-100 p-4"></div>
            </div>
            <div>
              <p className="m-0">Ashish Kumar</p>
              <span className="text-muted">2 Hrs Ago</span>
            </div>
          </div>
          <p className="mt-3">
            What are the most efficient and effective techniques to prepare for the SAT test?
          </p>
          <div className="mt-3">
            <div className="d-flex">
              <div>
                <span className="badge bg-primary me-3">Ilets</span>
              </div>
              <div>
                <span className="badge bg-secondary me-3">TOEFL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 px-3 py-2 border-top">
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
      </Card>
    </>
  );
}

export default DiscussionCard;
