import TeacherLayout from "layouts/teacherLayout";

// next
import Link from "next/link";

// icons
import { RightArrowAlt } from "@styled-icons/boxicons-regular";

// components
// import DiscussionFeaturedCard from "components/discussion/DiscussionFeaturedCard";
// import DiscussionCard from "components/discussion/DiscussionCard";

function DiscussionsPage() {
  return (
    <TeacherLayout>
      <div className="container mt-5">
        {/* Heading  */}
        <div className="d-flex align-items-center">
          <div>
            <h3 className="text-dark fw-light">Top Channels</h3>
          </div>
          <div className="ms-auto">
            <Link href="">
              <a>
                Learn More <RightArrowAlt className="styled-icon" />
              </a>
            </Link>
          </div>
        </div>
        {/* End Heading  */}
        {/* Featured  */}

        <div className="d-flex mt-3">
          <div className="me-3">{/* <DiscussionFeaturedCard title="Sat" img={"/ad.png"} /> */}</div>
          <div className="me-3">{/* <DiscussionFeaturedCard title="Sat" img={"/ad.png"} /> */}</div>
          <div className="me-3">{/* <DiscussionFeaturedCard title="Sat" img={"/ad.png"} /> */}</div>
          <div className="me-3">{/* <DiscussionFeaturedCard title="Sat" img={"/ad.png"} /> */}</div>
        </div>

        {/* End Featured */}

        <div className="d-flex align-items-center">
          <div>
            <h3 className="text- fw-light mt-5">Latest Discussions</h3>
          </div>
          <div className="ms-auto">
            <Link href="">
              <a>
                Learn More <RightArrowAlt className="styled-icon" />
              </a>
            </Link>
          </div>
        </div>
        {/* discussion cards */}

        <div className="row mt-4">
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
        </div>
        <div className="row mt-4">
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
          <div className="col-md-3">{/* <DiscussionCard /> */}</div>
        </div>
      </div>
    </TeacherLayout>
  );
}

export default DiscussionsPage;
