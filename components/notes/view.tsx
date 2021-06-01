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
  return (
    <>
      <div className="notes-wrapper">
        <div className="notes-header">
          <div className="notes-title">Notes</div>
          <div className="toggle-icon" onClick={() => props.handleNotesToggle(props.tree)}>
            <Times />
          </div>
        </div>
        {!props.notes ? (
          <div className="text-center text-secondary">
            <small>Loading...</small>
          </div>
        ) : (
          <div className="notes-content">
            <div className="notes-create-container">
              <NotesCreate resourceNode={props.resourceNode} user={props.user} tree={props.tree} />
            </div>

            {props.notes && props.notes.length > 0 ? (
              <div>
                {props.notes.map((note: any, index: any) => (
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
        )}
      </div>
    </>
  );
};

export default Notes;
