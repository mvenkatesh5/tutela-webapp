import React from "react";
// next imports
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// react bootstrap
import { Container, Button, Row, Col } from "react-bootstrap";
// components
// swr
import useSWR from "swr";
import NotesEdit from "@components/notes/edit";
import NotesDelete from "@components/notes/delete";
// cookie
import { getCurrentUser } from "@constants/global";
// layouts
import StudentLayout from "@layouts/studentLayout";
// api routes
import { NOTES_WITH_USER_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withStudentAuth from "@lib/hoc/withStudentAuth";

const NotesView = () => {
  const [currentUser, setCurrentUser] = React.useState<any>();
  const validateCurrentUser = () => {
    const currentUser: any = getCurrentUser() ? getCurrentUser() : null;
    if (currentUser && currentUser.user) {
      setCurrentUser(currentUser.user);
    }
  };

  React.useEffect(() => {
    validateCurrentUser();
  }, []);

  const { data: notes, error: notesError } = useSWR(
    currentUser && currentUser.id ? NOTES_WITH_USER_ID_ENDPOINT(currentUser.id) : null,
    (url) => APIFetcher(url),
    {
      refreshInterval: 0,
    }
  );

  return (
    <div>
      <Head>
        <title>notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StudentLayout>
        <Container className="pt-3 pb-3">
          <h3 className="mb-4">Notes</h3>
          {!notes && !notesError ? (
            <div className="text-secondary mt-5 mb-5 text-center">Loading...</div>
          ) : (
            <div>
              {notes && notes.length === 0 ? (
                <div className="text-secondary mt-5 mb-5 text-center">No notes are available.</div>
              ) : (
                <Row>
                  {notes.map((note: any, notesIndex: number) => (
                    <Col md={3} key={`note-title-${notesIndex}`} className="mb-3">
                      <div className="card">
                        <div className="card-body">
                          <p>{note.text}</p>
                          <div className="d-flex mt-2">
                            <div>
                              <NotesEdit data={note} user={currentUser} />
                            </div>
                            <div className="ms-2">
                              <NotesDelete data={note} user={currentUser} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          )}
        </Container>
      </StudentLayout>
    </div>
  );
};

export default withStudentAuth(NotesView);
