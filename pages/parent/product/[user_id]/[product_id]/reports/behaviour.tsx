// react bootstrap
import { Form, Image } from "react-bootstrap";
// icons
import { LeftArrowAlt } from "@styled-icons/boxicons-regular";
import { Star } from "@styled-icons/boxicons-regular/Star";
import { Star as StarFill } from "@styled-icons/boxicons-solid/Star";
// layouts
import ParentLayout from "layouts/ParentLayout";
// components
import CustomNavTabs from "@components/navtabs/customNavtabs";
import Sonnet from "@components/navtabs/Sonnet";
// hoc
import withParentAuth from "@lib/hoc/withParentAuth";
// components
import Page from "@components/page";
// constants
import { META_DESCRIPTION } from "@constants/page";
import ReportLayout from "@layouts/ReportLayout";
import Rating from "@components/new/Rating";

function BehaviourReport() {
  const navTabsData = [
    { title: "Overview", component: <Sonnet /> },
    { title: "Performance Breakdown", component: <Sonnet /> },
    { title: "Behaviour", component: <Sonnet /> },
    { title: "Attendance", component: <Sonnet /> },
    { title: "Syllabus Covered", component: <Sonnet /> },
  ];
  const meta = {
    title: "Behaviour",
    description: META_DESCRIPTION,
  };
  return (
    <Page meta={meta}>
      <ReportLayout>
        <div className="position-relative tw-space-y-10 ">
          <div className="d-flex justify-content-start gap-4">
            <Form.Group className="rounded-3">
              <Form.Control type="date" required />
            </Form.Group>
            <Form.Select
              className="tw-w-fit"
              style={{
                width: "10em",
              }}
            >
              <option>Overview</option>
              <option>Overview</option>
              <option>Overview</option>
            </Form.Select>
          </div>
          <div className="position-relative tw-space-y-5">
            <Rating value={5} />

            <div className="position-relative">
              <h2>Lorem ipsum is placeholder text</h2>
              <p className="mt-3 tw-text-md tw-text-justify tw-text-gray-500">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="position-relative">
              <h2>Lorem ipsum is placeholder text</h2>
              <p className="mt-3 tw-text-md tw-text-justify tw-text-gray-500">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* <h2 className="tw-text-black">Mathematics</h2>
             */}
          </div>
        </div>
      </ReportLayout>
    </Page>
  );
}

export default withParentAuth(BehaviourReport);
