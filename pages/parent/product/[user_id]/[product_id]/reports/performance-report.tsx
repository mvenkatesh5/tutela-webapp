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

function PerformanceReport() {
  const navTabsData = [
    { title: "Overview", component: <Sonnet /> },
    { title: "Performance Breakdown", component: <Sonnet /> },
    { title: "Behaviour", component: <Sonnet /> },
    { title: "Attendance", component: <Sonnet /> },
    { title: "Syllabus Covered", component: <Sonnet /> },
  ];
  const meta = {
    title: "Performance Breakdown",
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
            <div className="d-flex gap-4 align-items-center position-relative ">
              <h2 className="tw-text-black mb-0">Worksheet 1</h2>
              <Rating value={3} />
            </div>

            <div className="position-relative d-flex gap-3">
              <div className="">
                <Image src="/exam.svg" width={"45"} />
              </div>
              <div className="tw-leading-3">
                <p className="mb-0 tw-font-semibold tw-text-lg p-0">70/100</p>
                <small className="text-muted mt-0 p-0">score</small>
              </div>
            </div>

            <div className="position-relative">
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
              <ol start={1} className="px-3 tw-leading-8 tw-text-md">
                <li> Shorter is better- 10/11</li>
                <li> Diction, Idiom, and register - 13/13</li>
                <li> Transitions - 20/25</li>
                <li> Relevance and purpose - 12/14</li>
                <li> Relevance and purpose - 12/14</li>
              </ol>
            </div>

            {/* <h2 className="tw-text-black">Mathematics</h2>
             */}
          </div>

          <div className="position-relative tw-space-y-5">
            <div className="d-flex gap-4 align-items-center position-relative">
              <h2 className="tw-text-black mb-0">Drill 1</h2>
              <Rating value={4} />
            </div>

            <div className="position-relative d-flex gap-3">
              <div className="">
                <Image src="/exam.svg" width={"45"} />
              </div>
              <div className="tw-leading-3">
                <p className="mb-0 tw-font-semibold tw-text-lg p-0">80/100</p>
                <small className="text-muted mt-0 p-0">score</small>
              </div>
            </div>

            <div className="position-relative">
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

export default withParentAuth(PerformanceReport);
