export const addNodeAsChild = (node_id: any, name: any, kind: any) => {
  const data = {
    node_id: node_id,
    operation: "add",
    title: name,
    props: { data: true },
    kind: kind,
    description: "",
  };
  return data;
};

export const addNodeAsSibling = (node_id: any, position: any = "right", name: any, kind: any) => {
  const data = {
    node_id: node_id,
    operation: "append",
    position: position,
    title: name,
    props: { data: true },
    kind: kind,
    description: "",
  };
  return data;
};

export const deleteNode = (node_id: any) => {
  const data = {
    node_id: node_id,
    operation: "delete",
  };
  return data;
};

export const addFileNodeAsChild = (node_id: any, name: any, url: any) => {
  const data = {
    node_id: node_id,
    operation: "add",
    title: name,
    props: { data: true },
    kind: "FILE",
    description: "",
    data: { url: url },
  };
  return data;
};
