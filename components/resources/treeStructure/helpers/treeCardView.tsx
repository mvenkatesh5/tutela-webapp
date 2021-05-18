import React from "react";

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
// react beautiful dnd
import { Draggable } from "react-beautiful-dnd";
// components
import TreeRenderView from "./treeRenderView";
import TreeUploadView from "../upload";
import TreeCreateView from "../create";
import TreeEditView from "../edit";
import TreeDeleteView from "../delete";

const TreeChildrenRenderView = ({ tree, level, children, root_node_id, parent, index }: any) => {
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
      <Draggable key={`${tree.id}`} draggableId={`${tree.id}`} index={index}>
        {(provided: any, snapshot: any) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div className="flex" style={{ paddingLeft: `${children}px` }}>
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

              <div className="flex-item" {...provided.dragHandleProps}>
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
                <div className="flex-item title">
                  {tree.id} - {tree.data && tree.data.title}
                </div>
              ) : (
                <div className="flex-item title">
                  <a href={tree.data.data.url} target="_blank">
                    {tree.id} - {tree.data && tree.data.title}
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
                  parent={tree.id}
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
