import React, { Fragment } from "react";

// icons
import { PriceTags } from "@styled-icons/icomoon/PriceTags";
// react-bootstrap
import { Button } from "react-bootstrap";
// constants
import { META_DESCRIPTION } from "@constants/page";
// swr
import useSWR from "swr";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import { TAGS_ENDPOINT } from "@constants/routes";
// components
import Page from "@components/page";
import TagsTable from "@components/tags/TableTags";
import Create from "@components/tags/createEdit";
// layouts
import AdminLayout from "@layouts/adminLayout";
// hoc
import withAdminAuth from "@lib/hoc/withAdminAuth";

const TagsPage = () => {
  const meta = {
    title: "Tags",
    description: META_DESCRIPTION,
  };
  const [editModal, setEditModal] = React.useState(false);

  const { data: tagsList, error: tagsListError } = useSWR(TAGS_ENDPOINT, APIFetcher);

  return (
    <Page meta={meta}>
      <AdminLayout>
        <Create modal={editModal} setModal={setEditModal} />

        <div className="container mx-auto pt-5 px-4 overflow-auto">
          <div className="d-flex justify-content-between mb-3">
            <h3>Tags</h3>
            <Button
              onClick={() => setEditModal(true)}
              variant="outline-primary"
              className="mb-2 btn-sm"
            >
              Create Tags
            </Button>
          </div>
          {tagsList && !tagsListError ? (
            <TagsTable tagsList={tagsList} />
          ) : (
            <div className="text-center">Loading...</div>
          )}
        </div>
      </AdminLayout>
    </Page>
  );
};

export default withAdminAuth(TagsPage);
