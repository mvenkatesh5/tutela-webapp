import React from "react";
// react bootstrap
import { Form, Container, Card, Button } from "react-bootstrap";
// layouts
import AdminLayout from "@layouts/adminLayout";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";

const Profile = () => {
  const profileData = [
    {
      key: "name",
      label: "Name",
      required: true,
      data: [],
      kind: "text",
    },
    {
      key: "email",
      label: "Email",
      required: true,
      data: [],
      kind: "text",
    },
    {
      key: "phone",
      label: "Phone",
      required: true,
      data: [],
      kind: "text",
    },
    {
      key: "occupation",
      label: "Occupation",
      required: true,
      data: [],
      kind: "text",
    },
    {
      key: "company",
      label: "Company",
      required: true,
      data: [],
      kind: "text",
    },
    {
      key: "communication",
      label: "Preferred mode of Communication",
      required: true,
      data: [],
      kind: "text",
    },
    {
      key: "grade",
      label: "Current Grade",
      required: true,
      data: ["12", "above"],
      kind: "select",
    },
    {
      key: "curriculum",
      label: "Curriculum",
      required: true,
      data: ["CBSC", "ISC/ICSE", "IB", "IGCSE/MYP", "APS", "others"],
      kind: "select",
    },
  ];

  const [profile, setProfile] = React.useState<any>({ subjects: [] });
  const handleProfile = (key: any, value: any) => {
    setProfile({ ...profile, [key]: value });
  };

  const [subjectInput, setSubjectInput] = React.useState<any>("");

  const handleSubjects = (kind: any = "add", index: any = null) => {
    if (kind === "add") {
      setProfile({ ...profile, subjects: [...profile.subjects, subjectInput] });
      setSubjectInput("");
    }
    if (kind === "remove") {
      setProfile({
        ...profile,
        subjects: profile.subjects.filter((_: any, i: any) => i != index),
      });
    }
  };

  return (
    <div>
      <AdminLayout>
        <div className="right-layout">
          <Container>
            {profileData &&
              profileData.length > 0 &&
              profileData.map((data: any, i: any) => (
                <div key={i}>
                  {data.kind === "text" && (
                    <div>
                      <Form.Group className="mb-2">
                        <Form.Label className="mb-1 text-muted">{data.label}</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile && profile[data.key] ? profile[data.key] : ""}
                          onChange={(e) => handleProfile(data.key, e.target.value)}
                          required
                        />
                      </Form.Group>
                    </div>
                  )}
                  {data.kind === "select" && (
                    <div>
                      <Form.Group className="mb-2">
                        <Form.Label className="mb-1 text-muted">{data.label}</Form.Label>
                        <Form.Control
                          as="select"
                          value={profile && profile[data.key] ? profile[data.key] : ""}
                          onChange={(e) => handleProfile(data.key, e.target.value)}
                        >
                          {data.data &&
                            data.data.map((value: any, index: any) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  )}
                </div>
              ))}
            <div>
              <Form.Group className="mb-2">
                <Form.Label className="mb-1 text-muted">Subjects</Form.Label>
                <Card>
                  <Card.Body>
                    <div>
                      {profile &&
                        profile.subjects &&
                        profile.subjects.length > 0 &&
                        profile.subjects.map((data: any, i: any) => (
                          <div key={i} className="d-flex justify-items-center mb-2">
                            <div className="w-100">{data}</div>
                            <div className="ms-2" onClick={() => handleSubjects("remove", i)}>
                              Delete
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="d-flex justify-items-center">
                      <div className="w-100">
                        <Form.Control
                          type="text"
                          placeholder="Enter Subjects"
                          value={subjectInput}
                          onChange={(e: any) => setSubjectInput(e.target.value)}
                        />
                      </div>
                      <div className="ms-2">
                        <Button className="btn-sm" onClick={() => handleSubjects("add", null)}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Form.Group>
            </div>
          </Container>
        </div>
      </AdminLayout>
    </div>
  );
};

export default withStudentAuth(Profile);
