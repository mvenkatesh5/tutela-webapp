import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import TagsForm from "./tagsForm";
// api routes
import { TAGS_ENDPOINT } from "@constants/routes";
// api services
import { Tag } from "@lib/services/tagService";

const TagEditView = ({ data, modal, setModal }: any) => {
  const closeModal = () => setModal(false);
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const [tagsData, setTagsData] = React.useState<any>();
  const handleTagData = (value: any) => {
    setTagsData(value);
  };

  React.useEffect(() => {
    if (data) {
      setTagsData(data);
    }
  }, [data]);

  const SubmitTag = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);

    if (tagsData && tagsData?.id) {
      Tag.update(tagsData)
        .then((res) => {
          mutate(
            TAGS_ENDPOINT,
            async (elements: any) => {
              let index = elements.findIndex((mutateData: any) => mutateData.id === tagsData.id);
              return [...elements.slice(0, index), res, ...elements.slice(index + 1)];
            },
            false
          );
          setButtonLoader(false);
          closeModal();
        })
        .catch((errors) => {
          console.log(errors);
          setButtonLoader(false);
        });
    } else {
      Tag.create(tagsData)
        .then((res) => {
          mutate(
            TAGS_ENDPOINT,
            async (elements: any) => {
              return [...elements, res];
            },
            false
          );
          setButtonLoader(false);
          closeModal();
        })
        .catch((errors) => {
          setButtonLoader(false);
          console.log(errors);
        });
    }
  };

  return (
    <>
      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={SubmitTag}>
            <h5 className="mb-3">{tagsData?.id ? "Edit Tag" : "Create Tag"}</h5>

            <div>
              <TagsForm data={tagsData} handleData={handleTagData} />
              <Button
                disabled={buttonLoader}
                variant="outline-primary"
                className="btn-sm"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                {buttonLoader ? "Processing..." : tagsData?.id ? "Update Tag" : "Create Tag"}
              </Button>
              <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </>
  );
};

export default TagEditView;
