import React from "react";
// swr
import { mutate } from "swr";
// react beautiful dnd
import { DragDropContext } from "react-beautiful-dnd";
// components
import TreeRenderView from "./helpers/treeRenderView";
// api routes
import { RESOURCE_WITH_NODE_ENDPOINT } from "@constants/routes";
// api services
import { ResourceNodeOperation } from "@lib/services/resource.service";
import { APIFetcher } from "@lib/services";
// node operations
import { moveNode } from "./helpers/nodeOperations";

const TreeView = (props: any) => {
  const [tree, setTree] = React.useState<any>();
  React.useEffect(() => {
    if (props.data) {
      setTree(props.data);
    }
  }, [props.data]);

  const findItemNested = (arr: any, itemId: any, nestingKey: any) =>
    arr.reduce((a: any, item: any) => {
      if (a) return a;
      if (item.id === itemId) return item;
      if (item[nestingKey]) return findItemNested(item[nestingKey], itemId, nestingKey);
    }, null);

  const sequenceReorder = (list: any, startIndex: any, endIndex: any) => {
    const result: any = Array.from(list);
    const [removed]: any = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const updateSequenceDataChange = (node: Array<object>, nodeId: number, data: object) => {
    node.map((nodeItem: any) => {
      if (nodeId === nodeItem.id) {
        nodeItem.children = data;
      } else {
        if (nodeItem.children) {
          updateSequenceDataChange(nodeItem.children, nodeId, data);
        }
      }
    });
    return node;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.source && result.destination) {
      let currentTreeParentNode: any = findItemNested(
        props.currentProduct.tree,
        parseInt(result.source.droppableId),
        "children"
      );

      let node_id: any = currentTreeParentNode.children[result.source.index].id;
      let target_id: any = currentTreeParentNode.children[result.destination.index].id;

      let execData: any;
      if (result.destination.index > result.source.index) {
        execData = moveNode(node_id, target_id, "right");
      } else {
        execData = moveNode(node_id, target_id, "left");
      }
      executeNodeBlockOperation(execData);

      let reorderedData: any = sequenceReorder(
        currentTreeParentNode.children,
        result.source.index,
        result.destination.index
      );

      let updatedCurrentTree: any = updateSequenceDataChange(
        props.currentProduct.tree,
        parseInt(result.source.droppableId),
        reorderedData
      );

      setTree([...updatedCurrentTree[0].children]);

      mutate(
        RESOURCE_WITH_NODE_ENDPOINT(props.root_node_id),
        async (elements: any) => {
          const payload = { ...elements, tree: updatedCurrentTree };
          return payload;
        },
        false
      );
    }
  };

  const executeNodeBlockOperation = (dataPayload: any) => {
    ResourceNodeOperation(dataPayload)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {tree && tree.length > 0 ? (
        <div className="resource-tree-card">
          <DragDropContext onDragEnd={onDragEnd}>
            <TreeRenderView
              tree={tree}
              level={0}
              children={20}
              root_node_id={props.root_node_id}
              parent={props.root_node_id}
            />
          </DragDropContext>
        </div>
      ) : (
        <div>No Data Available.</div>
      )}
    </>
  );
};

export default TreeView;
