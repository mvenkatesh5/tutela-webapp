import { useState } from "react"

import CompletedGrade from "@components/new/CompleteGraph";
import { SlateEditor } from "@components/SlateEditor"
import { RenderSlateContent } from "@lib/utils"
import ProgressBarElement from "@components/new/ProgressBar"
import { Card, Col, Form, Row } from "react-bootstrap";

const Overview = ({ reports }: any) => {
    const [percentage, setPercentage] = useState(76)

    const handlePercentage = (value: Number) => () => {
        setPercentage(value === 76 ? 100 : 76)
    }
    return <div className="mt-3">

        {percentage === 100 && <Card className="shadow border-0 p-5 my-4 mb-5 relative overflow-hidden">
            <div className="icon-complete-circle"></div>
            <h2 className="">Congratulations!! You completed the program.</h2>
            <div className="text-dark tw-text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="d-flex gap-4 mt-5">
                <div className="tw-text-lg">
                    <span className="text-muted">Join date: </span> Jan 2, 2022
                </div>
                <div className="tw-text-lg">
                    <span className="text-muted">Completion date: </span> Apr 25, 2022
                </div>
            </div>
        </Card>}

        <div className="position-relative">
            <h2 className="tw-text-black cursor-pointer" onClick={handlePercentage(percentage)}>Syllabus completion</h2>
            <ProgressBarElement percent={percentage} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted">23 Jan 2022</small>
            <small className="text-muted">23 May 2024</small>
        </div>


        {percentage === 100 && <Row className="mt-5">
            <Col xs={12} md={9} className="p-3">
                <div className="d-flex justify-content-start gap-4">
                    <Form.Group className="mb-3">
                        <Form.Control type="date" required />
                    </Form.Group>
                </div>
                <CompletedGrade />
            </Col>
            <Col xs={12} md={3}>
                <div className="position-relative mb-4">
                    <h3 className="mb-0">10</h3>
                    <div className="mb-3 text-muted">Avg. classes needed/week</div>
                    <div className="d-flex gap-2 mb-4">
                        <div className="px-3  bg-primary" />
                        <small className="">Planned Progress</small>
                    </div>
                    <hr />
                </div>
                <div className="position-relative mb-4">
                    <h3 className="mb-0">7</h3>
                    <div className="mb-3 text-muted">Classes happening/week</div>
                    <div className="d-flex gap-2 mb-4">
                        <div className="px-3  bg-success" />
                        <small className="">Planned Progress</small>
                    </div>
                    <hr />
                </div>

                <div>
                    <h4>18/180</h4>
                    <div className="mb-3 text-muted">Course days left</div>
                </div>
            </Col>
        </Row>}
        {reports.map((item: any, index: any) => (
            <>
                <div
                    key={index}
                    className="my-5"
                >
                    {item.title && <h4>{item.title}</h4>}

                    {item?.report?.content && (
                        <div className="my-2">
                            {RenderSlateContent(item?.report?.content) && (
                                <div>
                                    <SlateEditor
                                        readOnly={true}
                                        initialValue={RenderSlateContent(item?.report?.content)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        ))}</div>
}

export default Overview