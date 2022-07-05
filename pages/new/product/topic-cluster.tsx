import React from "react";
// layout
import NewLayout from "@layouts/newLayout";
// bootstrap
import { Col, Row, Image, Button } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// components
import Page from "@components/page";
import TopicModal from "@components/new/TopicModal";
import FeedbackCard from "@components/new/FeedbackCard";
import { da } from "date-fns/locale";

const TeacherFeedback = () => {
  const meta = {
    title: "Topic Cluster",
    description: META_DESCRIPTION,
  };
  const productDetail = [
    { name: "Vamsi", kinematics: true, electricity: false, thermodynamics: true, mechanics: true },
    { name: "Vihar", kinematics: false, electricity: true, thermodynamics: true, mechanics: false },
    {
      name: "Sainath",
      kinematics: true,
      electricity: true,
      thermodynamics: false,
      mechanics: true,
    },
    { name: "Bhavesh", kinematics: true, electricity: true, thermodynamics: true, mechanics: true },
    {
      name: "Nikihil",
      kinematics: true,
      electricity: false,
      thermodynamics: true,
      mechanics: true,
    },
  ];

  return (
    <Page meta={meta}>
      <NewLayout>
        <div className="container mx-auto">
          <div className="d-flex align-items-center justify-content-between mt-4">
            <h3>Topics</h3>
            <div className="d-flex gap-3 pt-4 mb-5">
              <TopicModal>
                <Button className="btn btn-primary">Add Topic</Button>
              </TopicModal>
            </div>
          </div>
          <div className="border overflow-auto rounded">
            <table className="mb-0 custom-table w-100">
              <thead className="bg-light">
                <tr>
                  <th className="text-center">
                    <div className="py-2">#</div>
                  </th>
                  <th>Student</th>
                  <th>Kinematics</th>
                  <th>Electricity</th>
                  <th>Thermodynamics</th>
                  <th>Mechanics</th>
                </tr>
              </thead>
              <tbody>
                {productDetail &&
                  productDetail.length > 0 &&
                  productDetail.map((data: any, index: any) => (
                    <tr key={`attendanceData-key-${index}`}>
                      <td className="text-center">{index + 1}</td>
                      <td>{data.name}</td>
                      <td>
                        <div className="my-2">
                          {data.kinematics ? (
                            <div className="text-success">Completed</div>
                          ) : (
                            <div className="text-warning">Pending</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <>
                          {data.electricity ? (
                            <div className="text-success">Completed</div>
                          ) : (
                            <div className="text-warning">Pending</div>
                          )}
                        </>
                      </td>
                      <td>
                        <>
                          {data.thermodynamics ? (
                            <div className="text-success">Completed</div>
                          ) : (
                            <div className="text-warning">Pending</div>
                          )}
                        </>
                      </td>
                      <td>
                        <>
                          {data.mechanics ? (
                            <div className="text-success">Completed</div>
                          ) : (
                            <div className="text-warning">Pending</div>
                          )}
                        </>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </NewLayout>
    </Page>
  );
};

export default TeacherFeedback;
