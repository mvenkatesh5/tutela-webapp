import React from "react";
// react beautiful dnd
import { Droppable } from "react-beautiful-dnd";
// components
import TreeChildrenRenderView from "./treeCardView";

const TreeRenderView = ({
  tree,
  level,
  children,
  root_node_id,
  parent,
  admin,
  isDrag,
  resourceNode,
  notes,
  user,
  pdfToggle,
  handlePdfToggle,
}: any) => {
  return (
    <>
      <Droppable droppableId={`${parent}`} type={`${parent}`}>
        {(provided: any) => (
          <div ref={provided.innerRef}>
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
                    parent={parent}
                    index={initialRootIndex}
                    admin={admin}
                    isDrag={isDrag}
                    resourceNode={resourceNode}
                    notes={notes}
                    user={user}
                    pdfToggle={pdfToggle}
                    handlePdfToggle={handlePdfToggle}
                  />
                </div>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default TreeRenderView;
