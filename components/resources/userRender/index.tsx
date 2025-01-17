import React from "react";
// next imports
import Link from "next/link";
// material icons
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
import { Folder } from "@styled-icons/boxicons-solid/Folder";
import { FilePng } from "@styled-icons/boxicons-solid/FilePng";
import { FileJson } from "@styled-icons/boxicons-solid/FileJson";
import { FileBlank } from "@styled-icons/boxicons-regular/FileBlank";
import { FilePdf } from "@styled-icons/boxicons-solid/FilePdf";
import { ClipboardNotes } from "@styled-icons/foundation/ClipboardNotes";
import { BookReader } from "@styled-icons/boxicons-regular/BookReader";
import { LaptopChromebook } from "@styled-icons/material-rounded/LaptopChromebook";
// components
import ResourceNotesView from "@components/notes/view";
import { SlateEditor } from "@components/SlateEditor";
import SubmissionsModal from "@components/resources/userResources/SubmissionsModal";
import DigiSatTestModal from "../userResources/DigiSatTestModal";
// swr
import useSWR from "swr";
// api routes
import { TAGS_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";

const TreeView = (props: any) => {
  const TreeChildrenRenderView = ({ tree, level, t_children, root_node_id, user }: any) => {
    const [dropdownToggle, setDropdownToggle] = React.useState<any>(true);
    const [submissionsModal, setSubmissionsModal] = React.useState<any>(false);
    const [digiSatModal, setDigiSatModal] = React.useState<any>(false);

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

    const { data: tagData, error: tagDataError } = useSWR(
      tree.data.tag && tree.data.tag ? TAGS_WITH_ID_ENDPOINT(tree.data.tag) : null,
      (url) => APIFetcher(url),
      { refreshInterval: 0 }
    );
    React.useEffect(() => {
      setSelectedTag(tagData);
    }, [tagData]);

    const [selectedTag, setSelectedTag] = React.useState<any>(tagData);

    const pickTextColorBasedOnBgColorSimple = (
      bgColor?: string,
      lightColor: string = "#fff",
      darkColor: string = "#000000"
    ) => {
      if (!bgColor) return;

      var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
      var r = parseInt(color.substring(0, 2), 16); // hexToR
      var g = parseInt(color.substring(2, 4), 16); // hexToG
      var b = parseInt(color.substring(4, 6), 16); // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
    };
    return (
      <>
        <div className="flex" style={{ paddingLeft: `${t_children}px` }}>
          {tree.children && tree.children.length > 0 ? (
            <div className="flex-item dropdown" onClick={() => setDropdownToggle(!dropdownToggle)}>
              {dropdownToggle ? <ChevronDown /> : <ChevronRight />}
            </div>
          ) : (
            <div className="flex-item dropdown"></div>
          )}

          {tree.data.kind === "SECTION" ? (
            <div className="flex-item">
              <Folder />
            </div>
          ) : tree.data.data.kind === "digital_sat" ? (
            <div className="flex-item" style={{ color: "#0077C8" }}>
              <LaptopChromebook />
            </div>
          ) : (
            <div className="flex-item">
              {imageFileNameSplitRender(tree.data.data.url) === "PNG" ? (
                <FilePng />
              ) : imageFileNameSplitRender(tree.data.data.url) === "JSON" ? (
                <FileJson />
              ) : imageFileNameSplitRender(tree.data.data.url) === "PDF" ? (
                <FilePdf />
              ) : (
                <FileBlank />
              )}
            </div>
          )}

          {/* {tree.data.kind === "SECTION" ? (
            <div className="flex-item title">{tree.data && tree.data.title}</div>
          ) : (
            <div className="flex-item title">
              <Link href={`/pdf-viewer/${tree.id}/`}>
                <a target="_blank">{tree.data && tree.data.title}</a>
              </Link>
            </div>
          )} */}

          {tree.data.kind === "SECTION" ? (
            <div className="flex-item title">{tree.data && tree.data.title}</div>
          ) : (
            <div className="flex-item title">
              {extractFileNameFromUrl(tree.data.data.url) ? (
                // <Link href={`/pdf-viewer/${tree.id}/`}>
                //   <a target="_blank">{tree.data && tree.data.title}</a>
                // </Link>
                <>{tree.data && tree.data.title}</>
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
                  ) : tree.data.data && tree.data.data.kind === "digital_sat" ? (
                    <>
                      <div>
                        Digital SAT : {tree.data && tree.data.title} - {tree.id}
                      </div>
                    </>
                  ) : (
                    <>
                      <a href={tree.data.data.url} target="_blank" rel="noreferrer">
                        {tree.data.data.kind} : {tree.data && tree.data.title}
                      </a>
                    </>
                  )}
                </>
              )}
            </div>
          )}

          {(tree.data.data.kind === "document_objective_answers" ||
            tree.data.data.kind === "document_subjective_answers") && (
            <div className="text-sm" style={{ whiteSpace: "nowrap" }}>
              <Link
                href={`/user-resources/${root_node_id}/assessment?resource_node_id=${tree?.id}`}
              >
                <a target="_blank" rel="noreferrer">
                  Take test
                </a>
              </Link>
            </div>
          )}

          {tree.data.data.kind === "digital_sat" && (
            <>
              <div className="flex gap-2 items-center">
                <div className="text-sm" style={{ whiteSpace: "nowrap" }}>
                  <div
                    style={{ color: "#0077C8" }}
                    className="cursor-pointer"
                    onClick={() => setSubmissionsModal(true)}
                  >
                    View Submissions
                  </div>
                </div>
                <div
                  className="text-sm cursor-pointer"
                  style={{ whiteSpace: "nowrap", color: "#0077C8" }}
                >
                  <div onClick={() => setDigiSatModal(true)} className="">
                    Start test
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedTag && (
            <div
              className="text-xs flex-shrink-0 mx-2 px-2 rounded-pill fw-bold"
              style={{
                backgroundColor: selectedTag?.color ? selectedTag.color : "#ccc",
                color: pickTextColorBasedOnBgColorSimple(selectedTag?.color),
              }}
            >
              {selectedTag?.name}
            </div>
          )}

          {tree.data.kind != "SECTION" && extractFileNameFromUrl(tree.data.data.url) && (
            <div
              className={`flex-item pdf-reader ${
                props.pdfToggle && props.pdfToggle.id === tree.id ? "active" : ""
              }`}
              onClick={() => props.handlePdfToggle(tree)}
            >
              <BookReader />
            </div>
          )}

          <div
            className={`flex-item notes ${
              props.notesToggle && props.notesToggle.id === tree.id ? "active" : ""
            }`}
            onClick={() => props.handleNotesToggle(tree)}
          >
            <ClipboardNotes />
          </div>
        </div>
        {dropdownToggle && tree.children && tree.children.length > 0 && (
          <div>
            <TreeRenderView
              tree={tree.children}
              level={level}
              t_children={t_children + 30}
              root_node_id={root_node_id}
              user={user}
            />
          </div>
        )}
        <SubmissionsModal
          resourceDetail={tree.data}
          selectedUser={props?.user?.user?.id}
          modal={submissionsModal}
          setModal={setSubmissionsModal}
          user={true}
        />
        <DigiSatTestModal
          treeId={tree?.id}
          modal={digiSatModal}
          setModal={setDigiSatModal}
          href={`${tree.data.data.url}?email=${user?.user?.email}`}
        />
      </>
    );
  };

  const TreeRenderView = ({ tree, level, t_children, root_node_id, user }: any) => {
    return (
      <>
        {tree &&
          tree.length > 0 &&
          tree.map((initialRoot: any, initialRootIndex: any) => {
            if (initialRoot.data.visible) {
              return (
                <div
                  key={`tree-structure-level-${level}-${initialRootIndex}`}
                  className={`${t_children ? "children" : ""}`}
                >
                  <TreeChildrenRenderView
                    tree={initialRoot}
                    level={`${level}-${initialRootIndex}`}
                    t_children={t_children}
                    root_node_id={root_node_id}
                    user={user}
                  />
                </div>
              );
            }
          })}
      </>
    );
  };

  return (
    <>
      {props.data && props.data.length > 0 ? (
        <div className="resource-tree-card border">
          <TreeRenderView
            tree={props.data}
            level={0}
            t_children={10}
            root_node_id={props.root_node_id}
            user={props.user}
          />
        </div>
      ) : (
        <div>No Data Available.</div>
      )}
    </>
  );
};

export default TreeView;
