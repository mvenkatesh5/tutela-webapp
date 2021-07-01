import TeacherLayout from "layouts/teacherLayout";

// react bootstrap
import { Button } from "react-bootstrap";

// icons
import { People } from "@styled-icons/ionicons-sharp";
import { DotsHorizontal } from "@styled-icons/boxicons-regular";

// components
// import DiscussionFeedCard from "components/discussion/DiscussionFeedCard";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";

function discussionsDetail() {

  const meta = {
    title: "Discussion Details",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
    <TeacherLayout>
      <div className="container-fluid">
        <div className="d-flex align-items-center mt-3 p-3 border">
          <div className="me-3">
            <img src="/sat.png" className="rounded" />
          </div>

          <div className="w-50">
            <h3 className="fw-bold mb-1">Channel Name</h3>
            <p className="text-muted m-0">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          <div className="ms-auto me-3">
            <People className="styled-icon" />
          </div>
          <div className="me-3">
            <span className="fw-bold">8.2k</span>
          </div>
          <div className="me-3">
            <Button className="py-1 px-4"> Follow</Button>
          </div>
          <div className="bg-light rounded border">
            <DotsHorizontal className="styled-icon text-muted" />
          </div>
        </div>

        {/* content */}

        <div className="row mt-5">
          <div className="col-md-3">
            <div className="border p-5"></div>
          </div>
          <div className="col-md-6">
            <div className="border p-3">
              {/* <DiscussionFeedCard /> */}
              {/* <DiscussionFeedCard /> */}
              {/* <DiscussionFeedCard /> */}
            </div>
          </div>
          <div className="col-md-3">
            <div className="border p-5"></div>
          </div>
        </div>
      </div>
    </TeacherLayout>
    </Page>
  );
}

export default discussionsDetail;
