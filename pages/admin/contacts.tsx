import React from "react";
// react bootstrap
import { Container, Table } from "react-bootstrap";
// swr
import useSWR from "swr";
// blueprint css
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
// global constants
import { datePreview } from "@constants/global";
// layouts
import AdminLayout from "@layouts/adminLayout";
// api routes
import { CONTACT_ENDPOINT } from "@constants/routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import withGlobalAuth from "@lib/hoc/withGlobalAuth";
// components
import Page from "@components/page";
import Create from "@components/admin/contacts/create";
import Edit from "@components/admin/contacts/edit";
import Delete from "@components/admin/contacts/delete";
// constants
import { META_DESCRIPTION } from "@constants/page";

const ContactsView = () => {
  const { data: contactList, error: contactListError } = useSWR(CONTACT_ENDPOINT, APIFetcher);

  const meta = {
    title: "Contacts",
    description: META_DESCRIPTION,
  };

  return (
    <Page meta={meta}>
      <div>
        <AdminLayout>
          <div className="right-layout">
            <Container>
              <>
                <div className="d-flex align-items-center mt-2 mb-4">
                  <div>
                    <h5 className="m-0 p-0">Contacts</h5>
                  </div>
                  <div className="ms-auto">
                    <Create />
                  </div>
                </div>
                {contactList && !contactListError ? (
                  <>
                    <Table bordered style={{ whiteSpace: "nowrap" }}>
                      <thead>
                        <tr>
                          <th className="text-center">#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Created at</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactList &&
                          contactList.length > 0 &&
                          contactList.map((contact: any, i: any) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="heading">{contact.name}</td>
                                <td className="description">{contact.email}</td>
                                <td className="heading">{contact.phone}</td>
                                <td className="description">
                                  {contact.created ? datePreview(contact.created) : "-"}
                                </td>
                                <td>
                                  <Edit data={contact} />
                                </td>
                                <td>
                                  <Delete data={contact} />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <div className="primary-decryption text-center mt-5">loading-...</div>
                )}
              </>
            </Container>
          </div>
        </AdminLayout>
      </div>
    </Page>
  );
};

export default withGlobalAuth(ContactsView);
