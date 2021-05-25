import React from "react";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";
// swr
import useSWR from "swr";
// components
import NotesCreate from "./create";
import NotesEdit from "./edit";
import NotesDelete from "./delete";
// api routes
import { USER_NOTES_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

const Notes = (props: any) => {
  const [notesToggle, setNotesToggle] = React.useState<any>(false);

  const { data: notes, error: notesError } = useSWR(
    props.tree && props.tree.id && props.resourceNode && props.resourceNode.id
      ? [
          USER_NOTES_ENDPOINT(props.resourceNode.id, props.tree.id),
          props.resourceNode.id,
          props.tree.id,
        ]
      : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  if (!notes) {
    return <div></div>;
  }

  return (
    <div>
      {notesToggle && (
        <div className="notes-wrapper">
          <div className="notes-header">
            <div className="notes-title">Notes</div>
            <div className="toggle-icon" onClick={() => setNotesToggle(!notesToggle)}>
              <Times />
            </div>
          </div>
          <div className="notes-content">
            <div className="notes-create-container">
              <NotesCreate resourceNode={props.resourceNode} user={props.user} tree={props.tree} />
            </div>

            {notes && notes.length > 0 ? (
              <div>
                {notes.map((note: any, index: any) => (
                  <div key={`notes-card-${index}`} className="notes-card">
                    <div className="notes-card-title">{note.text}</div>
                    <div className="d-flex">
                      <div className="me-2">
                        <NotesEdit
                          data={note}
                          resourceNode={props.resourceNode}
                          user={props.user}
                          tree={props.tree}
                        />
                      </div>
                      <div>
                        <NotesDelete
                          data={note}
                          resourceNode={props.resourceNode}
                          user={props.user}
                          tree={props.tree}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <small>No notes are available.</small>
              </div>
            )}
          </div>
        </div>
      )}
      <div onClick={() => setNotesToggle(!notesToggle)}>{props.children}</div>
    </div>
  );
};

export default Notes;
