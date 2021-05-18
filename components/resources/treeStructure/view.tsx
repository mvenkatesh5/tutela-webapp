import React from "react";
// react bootstrap
import { Button } from "react-bootstrap";
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
// components
import TreeUploadView from "./upload";
import TreeCreateView from "./create";
import TreeEditView from "./edit";
import TreeDeleteView from "./delete";

export const TreeChildrenRenderView = ({ tree, level, children, root_node_id }: any) => {
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
    <div>
      <div className="flex" style={{ paddingLeft: `${children}px` }}>
        {tree.children && tree.children.length > 0 && (
          <div className="flex-item dropdown" onClick={() => setDropdownToggle(!dropdownToggle)}>
            {dropdownToggle ? <ChevronDown /> : <ChevronRight />}
          </div>
        )}

        <div className="flex-item">
          <DragIndicator />
        </div>

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
            <a href={tree.data.data.url} target="_blank">
              {tree.data && tree.data.title}
            </a>
          </div>
        )}

        {tree.data.kind === "SECTION" && (
          <div className="flex-item upload">
            <TreeUploadView data={tree} root_node_id={root_node_id} add_to="children">
              <Upload />
            </TreeUploadView>
          </div>
        )}

        {tree.data.kind === "SECTION" && (
          <div className="flex-item folder-add">
            <TreeCreateView data={tree} root_node_id={root_node_id} add_to="children">
              <FolderAdd />
            </TreeCreateView>
          </div>
        )}

        {tree.data.kind === "SECTION" && (
          <div className="flex-item edit">
            <TreeEditView data={tree} root_node_id={root_node_id}>
              <Edit />
            </TreeEditView>
          </div>
        )}

        <div className="flex-item delete">
          <TreeDeleteView data={tree} root_node_id={root_node_id}>
            <Delete />
          </TreeDeleteView>
        </div>
      </div>

      {dropdownToggle && tree.children && tree.children.length > 0 && (
        <div>
          <TreeRenderView
            tree={tree.children}
            level={level}
            children={children + 30}
            root_node_id={root_node_id}
          />
        </div>
      )}
    </div>
  );
};

export const TreeRenderView = ({ tree, level, children, root_node_id }: any) => {
  return (
    <div>
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
            />
          </div>
        ))}
    </div>
  );
};

const TreeView = (props: any) => {
  return (
    <>
      {props.data && props.data.length > 0 ? (
        <div className="resource-tree-card">
          <TreeRenderView
            tree={props.data}
            level={0}
            children={20}
            root_node_id={props.root_node_id}
          />
        </div>
      ) : (
        <div>No Data Available.</div>
      )}
    </>
  );
};

export default TreeView;
