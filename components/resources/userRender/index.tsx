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
// components
import ResourceNotesView from "@components/notes/view";

const TreeView = (props: any) => {
  const TreeChildrenRenderView = ({
    tree,
    level,
    children,
    root_node_id,

    user,
  }: any) => {
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

    return (
      <>
        <div className="flex" style={{ paddingLeft: `${children}px` }}>
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

          {tree.data.kind === "SECTION" ? (
            <div className="flex-item title">{tree.data && tree.data.title}</div>
          ) : (
            <div className="flex-item title">
              <Link href={`/pdf-viewer/${tree.id}/`}>
                <a target="_blank">{tree.data && tree.data.title}</a>
              </Link>
            </div>
          )}

          <div
            className="flex-item delete"
            onClick={() => {
              props.handleNotesToggle(tree);
            }}
          >
            <ClipboardNotes />
          </div>
        </div>
        {dropdownToggle && tree.children && tree.children.length > 0 && (
          <div>
            <TreeRenderView
              tree={tree.children}
              level={level}
              children={children + 30}
              root_node_id={root_node_id}
              user={user}
            />
          </div>
        )}
      </>
    );
  };

  const TreeRenderView = ({ tree, level, children, root_node_id, user }: any) => {
    return (
      <>
        {tree &&
          tree.length > 0 &&
          tree.map((initialRoot: any, initialRootIndex: any) => (
            <div
              key={`tree-structure-level-${level}-${initialRootIndex}`}
              className={`${children ? "children" : ""}`}
            >
              <TreeChildrenRenderView
                tree={initialRoot}
                level={`${level}-${initialRootIndex}`}
                children={children}
                root_node_id={root_node_id}
                user={user}
              />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      {props.data && props.data.length > 0 ? (
        <div className="resource-tree-card">
          <TreeRenderView
            tree={props.data}
            level={0}
            children={10}
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
