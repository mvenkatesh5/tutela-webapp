import React from "react";
// next imports
import { useRouter } from "next/router";
// bootstrap
import { Form } from "react-bootstrap";
// swr
import useSWR from "swr";
// constants
import { META_DESCRIPTION } from "@constants/page";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// components
import Page from "@components/page";
import ReportHeader from "@components/new/ReportHeader";
import Dropdown from "@components/new/Dropdown";
import ProgressBarElement from "@components/new/ProgressBar";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import {
  USER_REPORTS_WITH_USER_ID_ENDPOINT,
  PRODUCTS_WITH_ID_ENDPOINT,
  USER_ENDPOINT,
  USER_WITH_ID_ENDPOINT,
  USER_PRODUCT_RESOURCE_VIEW_ENDPOINT,
} from "@constants/routes";
// layout
import NewLayout from "@layouts/newLayout";

const ProductReport = () => {
  const meta = {
    title: "Product Report",
    description: META_DESCRIPTION,
  };
  const router = useRouter();

  const defaultImageUrl = "/default-image.png";

  const [currentUser, setCurrentUser] = React.useState<any>();
  const [userRole, setUserRole] = React.useState<any>();

  React.useEffect(() => {
    if (getAuthenticationToken()) {
      let details: any = getAuthenticationToken();
      details = details ? JSON.parse(details) : null;
      if (details) {
        setCurrentUser(details);
        if (details.info.role === 2) setUserRole("admin");
        else if (details.info.role === 1) setUserRole("teacher");
        else if (details.info.role === 3) setUserRole("parent");
        else setUserRole("student");
      }
    }
  }, []);

  const user_id = router.query.user_id;
  const product_id = router.query.product_id;
  const product = router.query.product;

  const [userReports, setUserReports] = React.useState<any>();

  const report_tab_data = [
    { tab_key: "overview", tab_name: "Reports" },
    // { tab_key: "performance", tab_name: "Performance" },
    // { tab_key: "syllabus", tab_name: "Syllabus" },
    // { tab_key: "behavior", tab_name: "Behavior" },
  ];
  const [tabKey, setTabKey] = React.useState<any>(report_tab_data[0].tab_key);

  const { data: userDetailList, error: userDetailListError } = useSWR(
    user_id ? USER_WITH_ID_ENDPOINT(user_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: userProductResourceList, error: userProductListError } = useSWR(
    user_id ? USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(user_id) : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: productDetail, error: productDetailError } = useSWR(
    product_id ? PRODUCTS_WITH_ID_ENDPOINT(product_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const { data: reportList, error: reportListError } = useSWR(
    user_id ? USER_REPORTS_WITH_USER_ID_ENDPOINT(user_id) : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  React.useEffect(() => {
    if (reportList) setUserReports(reportList);
  }, [reportList]);

  // console.log("userDetailList", userDetailList);
  // console.log("userProductResourceList", userProductResourceList);
  // console.log("productDetail", productDetail);
  console.log("reportList", reportList);

  const getCurrentMentorDetails = () => {
    if (
      userProductResourceList &&
      userProductResourceList.product_users &&
      userProductResourceList.product_users.length > 0
    ) {
      const currentMentor = userProductResourceList.product_users.filter(
        (element: any) => element.product.id == product_id
      );

      if (currentMentor && currentMentor.length == 1)
        return {
          name:
            currentMentor[0].mentor && currentMentor[0].mentor.username
              ? currentMentor[0].mentor.username
              : "",
          email:
            currentMentor[0].mentor && currentMentor[0].mentor.email
              ? currentMentor[0].mentor.email
              : "",
        };
    }
    return {
      name: "",
      email: "",
    };
  };
  return (
    <Page meta={meta}>
      <NewLayout sidebar={false}>
        {userDetailList && productDetail ? (
          <>
            <ReportHeader
              userDetailList={userDetailList}
              productDetail={productDetail}
              mentor={getCurrentMentorDetails()}
            />
            <div className="container mx-auto mt-5">
              <h5 className="fw-bold">Syllabus completion </h5>
              <div></div>
              <ProgressBarElement percent={75} />

              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="text-muted">23 Jan 2022</div>
                <div className="text-muted">23 May 2022</div>
              </div>
              <div className="d-flex gap-3 pt-4 mb-4">
                <div>
                  <Form.Group className="mb-3">
                    <Form.Control type="date" required />
                  </Form.Group>
                </div>

                <Dropdown name="overview">
                  <div className="bg-light px-2 py-1">Overview</div>
                </Dropdown>
              </div>

              <h5 className="mt-4 fw-bold">Mathematics</h5>
              <div className="text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <h5 className="mt-5 fw-bold">Physics</h5>
              <div className="text-muted">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">loading...</div>
        )}
      </NewLayout>
    </Page>
  );
};

export default ProductReport;
