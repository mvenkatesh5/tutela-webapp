import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// swr
import { mutate } from "swr";
// components
import NewsForm from "./newsForm";
// api routes
import { NEWS_ENDPOINT } from "@constants/routes";
// api services
import { NewsUpdate } from "@lib/services/newsservice";

const NewsEditView = (props: any) => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const [newsData, setNewsData] = React.useState();
  const handleNewsData = (value: any) => {
    setNewsData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setNewsData(props.data);
    }
  }, [props.data]);

  const newsUpdate = (event: any) => {
    event.preventDefault();
    NewsUpdate(newsData)
      .then((res) => {
        mutate(
          NEWS_ENDPOINT,
          async (elements: any) => {
            let index = elements.findIndex((mutateData: any) => mutateData.id === res.id);
            return elements.map((oldElement: any, i: Number) => (i === index ? res : oldElement));
            // return elements.filter((oldElement: any, i) => i != index);
          },
          false
        );
        closeModal();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div>
      <Button variant="primary" className="btn-sm" onClick={openModal}>
        Edit News
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={newsUpdate}>
            {newsData && (
              <div>
                <NewsForm data={newsData} handleData={handleNewsData} />
                <Button
                  variant="outline-primary"
                  className="btn-sm"
                  type="submit"
                  style={{ marginRight: "10px" }}
                >
                  Update News
                </Button>
                <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default NewsEditView;
