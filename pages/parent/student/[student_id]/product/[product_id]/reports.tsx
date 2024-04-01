import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Form } from "react-bootstrap";

// constants
import { META_DESCRIPTION } from "@constants/page";
import { USER_PRODUCT_RESOURCE_VIEW_ENDPOINT, USER_PRODUCT_REPORTS } from "@constants/routes";

// services
import { APIFetcher } from "@lib/services";

// hoc
import withParentAuth from "@lib/hoc/withParentAuth"

// layout
import ReportLayout from "@layouts/parent/ChildReportLayout";

// components
import Page from "@components/page";
import PerformanceView from "@components/reports/components/Performance";
import BehaviorView from "@components/reports/components/Behavior";
import SyllabusView from "@components/reports/components/Syllabus";
import Overview from "@components/reports/components/Overview";

const UserProductReportsView = () => {
    const meta = {
        title: "Child Reports",
        description: META_DESCRIPTION,
    };
    const router = useRouter()

    const { student_id, product_id } = router.query

    const [currentView, setCurrentView] = useState("overview")

    const { data: productDetail, error: productDetailError } = useSWR(
        student_id ? USER_PRODUCT_RESOURCE_VIEW_ENDPOINT(student_id) : null,
        APIFetcher,
        { refreshInterval: 0 }
    );

    const { data: userProductReports, error: userProductReportsError } = useSWR(
        student_id && product_id ? USER_PRODUCT_REPORTS(student_id, product_id) : null,
        (url) => APIFetcher(url),
        { refreshInterval: 0 })

    if (!productDetail || !userProductReports) {
        return <>Loading...</>
    }

    const { user, product, mentor } = productDetail?.product_users?.find((item: any) => item.product.id === Number(product_id))

    const Options = [
        { label: "Overview", value: "overview" },
        { label: "Behavior", value: "behavior" },
        { label: "Perfomance", value: "performance" },
        { label: "Syllabus", value: "syllabus" },
        { label: "Attendance", value: "attendance" },

    ]

    let componentToRender;

    switch (currentView) {
        case "overview":
            componentToRender = <Overview reports={userProductReports} />;
            break;
        case "syllabus":
            componentToRender = <SyllabusView reports={userProductReports} />;
            break;
        case "performance":
            componentToRender = <PerformanceView reports={userProductReports} />;
            break;
        case "behavior":
            componentToRender = <BehaviorView reports={userProductReports} />;
            break;
        case "attendance":
            componentToRender = <>Attendance View</>;
            break;
        default:
            componentToRender = null;
    }
    return <Page meta={meta}>
        <ReportLayout student={user} product={product} mentor={mentor}>
            <div className="d-flex justify-content-start gap-4">
                <Form.Group className="rounded-3">
                    <Form.Control type="date" required />
                </Form.Group>
                <Form.Select
                    className="tw-w-fit"
                    style={{
                        width: "10em",
                    }}
                    onChange={(e) => {
                        setCurrentView(e.target.value)
                    }}
                    value={currentView}
                >
                    {Options.map((item: any, index: any) => {
                        return <option value={item.value} key={index}>{item.label}</option>
                    })}
                </Form.Select>
                {
                    ["attendance", "syllabus"].includes(currentView) && <>

                        <Form.Select
                            className="tw-w-fit"
                            style={{
                                width: "10em",
                            }}
                            value=""
                        >
                            <option value="" disabled>Subject</option>
                        </Form.Select>

                        <Form.Select
                            className="tw-w-fit"
                            style={{
                                width: "10em",
                            }}
                            value=""
                        >
                            <option value="" disabled>Teacher</option>
                        </Form.Select>
                    </>
                }
            </div>
            {componentToRender}
        </ReportLayout>
    </Page>
}

export default withParentAuth(UserProductReportsView)