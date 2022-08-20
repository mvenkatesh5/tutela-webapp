import React from "react";
// react-bootstrap
import { Dropdown } from "react-bootstrap";
// icons
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical";
// components
import Edit from "./createEdit";
import Delete from "./delete";
// global
import { timeDateFormat } from "@constants/global";

const TagsTable = (tagsList: any) => {
  const [editModal, setEditModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selected, setSelected] = React.useState<any>();
  const openEdit = (data: any) => {
    setSelected(data);
    setEditModal(true);
  };
  const openDelete = (data: any) => {
    setSelected(data);
    setDeleteModal(true);
  };
  return (
    <>
      <Edit modal={editModal} setModal={setEditModal} data={selected} />
      <Delete modal={deleteModal} setModal={setDeleteModal} data={selected} />
      {tagsList.tagsList && (
        <div className="border overflow-auto rounded custom-table mt-5">
          <table className="mb-0">
            <thead className="bg-light">
              <tr className="my-3">
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Color</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>
                  <div className="mb-1 p-2">...</div>
                </th>
              </tr>
            </thead>
            {tagsList.tagsList && tagsList.tagsList.length > 0 ? (
              <>
                <tbody>
                  {tagsList.tagsList.map((data: any, index: any) => (
                    <tr key={`attendanceData-key-${index}`}>
                      <td className="text-center">{index + 1}</td>
                      <td>{data.name}</td>
                      <td className="d-flex gap-2">
                        <div
                          className="p-2 px-3"
                          style={{
                            backgroundColor: data.color ? data.color : "#ccc",
                          }}
                        ></div>
                        {data.color}
                      </td>
                      <td>{data.created && timeDateFormat(data.created)}</td>
                      <td>{data.updated && timeDateFormat(data.updated)}</td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle className="text-button text-black d-flex align-items-center gap-2 plain-dropdown">
                            <div className="text-capitalize">
                              <ThreeDotsVertical width="12px" />
                            </div>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => openEdit(data)}>edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => openDelete(data)}>delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="test-center p-2">No tags are available</div>
            )}
          </table>
        </div>
      )}
    </>
  );
};

export default TagsTable;
