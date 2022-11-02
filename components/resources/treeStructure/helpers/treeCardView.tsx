import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// material icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Delete } from "@styled-icons/material/Delete";
import { Folder } from "@styled-icons/boxicons-solid/Folder";
import { Upload } from "@styled-icons/boxicons-regular/Upload";
import { FolderAdd } from "@styled-icons/remix-fill/FolderAdd";
import { DragIndicator } from "@styled-icons/material/DragIndicator";
import { FilePng } from "@styled-icons/boxicons-solid/FilePng";
import { FileJson } from "@styled-icons/boxicons-solid/FileJson";
import { FileBlank } from "@styled-icons/boxicons-regular/FileBlank";
import { FilePdf } from "@styled-icons/boxicons-solid/FilePdf";
import { ClipboardNotes } from "@styled-icons/foundation/ClipboardNotes";
import { BookReader } from "@styled-icons/boxicons-regular/BookReader";
import { EyeFill } from "@styled-icons/bootstrap/EyeFill";
import { EyeWithLine } from "@styled-icons/entypo/EyeWithLine";
// react beautiful dnd
import { Draggable } from "react-beautiful-dnd";
// components
import TreeRenderView from "./treeRenderView";
import TreeUploadView from "../upload";
import TreeCreateView from "../create";
import TreeEditView from "../edit";
import TreeDeleteView from "../delete";
import TreePermissionView from "../treePermission";
import Tags from "../tags";
import ResourceNotesView from "@components/notes/view";
import { SlateEditor } from "@components/SlateEditor";

const TreeChildrenRenderView = ({
  tree,
  level,
  t_children,
  root_node_id,
  parent,
  index,
  admin,
  isDrag,
  resourceNode,
  user,
  pdfToggle,
  handlePdfToggle,
  tags,
  handleAssessmentUserData,
}: any) => {
  const router = useRouter();
  const { resource_id } = router.query;

  const [dropdownToggle, setDropdownToggle] = React.useState<any>(true);

  const imageFileNameSplitRender = (value: any) => {
    let splitValue = value.split("/");
    if (splitValue && splitValue.length > 0) {
      splitValue = splitValue[splitValue.length - 1];
      splitValue = splitValue.split(".");
      splitValue = splitValue[splitValue.length - 1];
      return splitValue.toUpperCase();
    }
    return "";
  };

  const extractFileNameFromUrl = (url: string) => {
    let urlPayload: any = url ? url.split("/") : "";
    urlPayload = urlPayload && urlPayload.length > 0 ? urlPayload[urlPayload.length - 1] : "";
    urlPayload = urlPayload ? urlPayload.split(".") : "";
    urlPayload = urlPayload && urlPayload.length > 0 ? urlPayload[urlPayload.length - 1] : "";
    if (urlPayload.toLowerCase() === "pdf") return true;
    return false;
  };

  return (
    <>
      <Draggable
        key={`${tree.id}`}
        draggableId={`${tree.id}`}
        index={index}
        isDragDisabled={isDrag ? false : true}
      >
        {(provided: any, snapshot: any) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div className="flex" style={{ paddingLeft: `${t_children}px` }}>
              {tree.children && tree.children.length > 0 ? (
                <div
                  className="flex-item dropdown"
                  onClick={() => setDropdownToggle(!dropdownToggle)}
                >
                  {dropdownToggle ? <ChevronDown /> : <ChevronRight />}
                </div>
              ) : (
                <div className="flex-item dropdown"></div>
              )}

              {admin && (
                <div className="flex-item" {...provided.dragHandleProps}>
                  <DragIndicator />
                </div>
              )}

              {tree.data.kind === "SECTION" ? (
                <div className="flex-item">
                  <Folder />
                </div>
              ) : (
                <div className="flex-item">
                  {imageFileNameSplitRender(tree.data.data.url) === "PNG" ? (
                    <FilePng style={{ color: "#28B446" }} />
                  ) : imageFileNameSplitRender(tree.data.data.url) === "JSON" ? (
                    <FileJson style={{ color: "#b6b0ff" }} />
                  ) : imageFileNameSplitRender(tree.data.data.url) === "PDF" ? (
                    <FilePdf style={{ color: "#E2574C" }} />
                  ) : (
                    <FileBlank style={{ color: "#518EF8" }} />
                  )}
                </div>
              )}

              {tree.data.kind === "SECTION" ? (
                <div className="flex-item title">{tree.data && tree.data.title}</div>
              ) : (
                <div className="flex-item title">
                  {extractFileNameFromUrl(tree.data.data.url) ? (
                    // <Link href={`/pdf-viewer/${tree.id}/`}>
                    //   <a target="_blank">{tree.data && tree.data.title}</a>
                    // </Link>
                    <div>
                      {tree.data && tree.data.title} - {tree.id}
                    </div>
                  ) : (
                    <>
                      {tree.data.data && tree.data.data.kind === "rich-text" ? (
                        <>
                          <div className="d-flex align-items-center">
                            <div className="me-2">{tree.data.data.kind} : </div>
                            <div>
                              <SlateEditor readOnly={true} initialValue={tree.data.data.content} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <a href={tree.data.data.url} target="_blank" rel="noreferrer">
                            {tree.data.data.kind} : {tree.data && tree.data.title} - {tree.id}
                          </a>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}

              {tree.data.kind === "SECTION" && (
                <div
                  className="text-sm hover-cursor text-primary"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => handleAssessmentUserData(tree)}
                >
                  Attach Users
                </div>
              )}

              {(tree.data.data.kind === "document_objective_answers" ||
                tree.data.data.kind === "document_subjective_answers") && (
                <div className="text-sm" style={{ whiteSpace: "nowrap" }}>
                  <Link href={`/resources/${resource_id}/assessment?resource_node_id=${tree?.id}`}>
                    <a target="_blank" rel="noreferrer">
                      Show answer sheet
                    </a>
                  </Link>
                </div>
              )}

              {admin &&
                (tree.data.data.kind === "document_objective_answers" ||
                  tree.data.data.kind === "document_subjective_answers") && (
                  <div className="ms-3 text-sm" style={{ whiteSpace: "nowrap" }}>
                    <Link
                      href={`/resources/${resource_id}/submissions?resource_node_id=${tree?.id}`}
                    >
                      <a target="_blank" rel="noreferrer">
                        View Submissions
                      </a>
                    </Link>
                  </div>
                )}

              {admin && (
                <Tags data={tree} root_node_id={root_node_id} add_to="children" tags={tags} />
              )}

              {admin && (
                <div className="flex-item upload">
                  <TreeUploadView
                    data={tree}
                    root_node_id={root_node_id}
                    add_to="children"
                    upload_new={
                      tree && tree.data.data && (tree.data.data.url || tree.data.data.kind)
                        ? false
                        : true
                    }
                  >
                    <Upload />
                  </TreeUploadView>
                </div>
              )}

              {tree.data.kind === "SECTION" && admin && (
                <div className="flex-item folder-add">
                  <TreeCreateView data={tree} root_node_id={root_node_id} add_to="children">
                    <FolderAdd />
                  </TreeCreateView>
                </div>
              )}

              {tree.data.kind === "SECTION" && admin && (
                <div className="flex-item folder-add">
                  <TreePermissionView data={tree} root_node_id={root_node_id} add_to="children">
                    {tree.data.visible ? <EyeFill /> : <EyeWithLine />}
                  </TreePermissionView>
                </div>
              )}

              {tree.data.kind === "SECTION" && admin && (
                <div className="flex-item edit">
                  <TreeEditView data={tree} root_node_id={root_node_id}>
                    <Edit />
                  </TreeEditView>
                </div>
              )}

              {tree.data.kind != "SECTION" && admin && extractFileNameFromUrl(tree.data.data.url) && (
                <>
                  <div
                    className={`flex-item pdf-reader ${
                      pdfToggle && pdfToggle.id === tree.id ? "active" : ""
                    }`}
                    onClick={() => handlePdfToggle(tree)}
                  >
                    <BookReader />
                  </div>
                </>
              )}

              {admin && (
                <div className="flex-item delete">
                  <TreeDeleteView data={tree} root_node_id={root_node_id}>
                    <Delete />
                  </TreeDeleteView>
                </div>
              )}
              {!admin && (
                <div className="flex-item delete">
                  <ResourceNotesView resourceNode={resourceNode} user={user} tree={tree}>
                    <ClipboardNotes />
                  </ResourceNotesView>
                </div>
              )}
            </div>
            {dropdownToggle && tree.children && tree.children.length > 0 && (
              <div>
                <TreeRenderView
                  tree={tree.children}
                  level={level}
                  t_children={t_children + 30}
                  root_node_id={root_node_id}
                  parent={tree.id}
                  admin={admin}
                  isDrag={isDrag}
                  resourceNode={resourceNode}
                  user={user}
                  pdfToggle={pdfToggle}
                  handlePdfToggle={handlePdfToggle}
                  tags={tags}
                  handleAssessmentUserData={handleAssessmentUserData}
                />
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default TreeChildrenRenderView;
