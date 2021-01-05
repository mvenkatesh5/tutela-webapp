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
import { NewsCreate } from "@lib/services/newsservice";

const NewsCreateView = () => {
  const [modal, setModal] = React.useState(false);
  const closeModal = () => {
    setModal(false);
    setNewsData({
      title: "",
      description: "",
      data: {},
    });
  };
  const openModal = () => setModal(true);

  const [newsData, setNewsData] = React.useState({
    title: "",
    description: "",
    data: {},
  });
  const handleNewsData = (value: any) => {
    setNewsData(value);
  };

  const newsCreate = (event: any) => {
    event.preventDefault();
    console.log(newsData);
    NewsCreate(newsData)
      .then((res) => {
        console.log(res);
        mutate(
          NEWS_ENDPOINT,
          async (elements: any) => {
            return [...elements, res];
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
        Add News
      </Button>

      <Modal show={modal} onHide={closeModal} centered backdrop={"static"}>
        <Modal.Body>
          <Form onSubmit={newsCreate}>
            <NewsForm data={newsData} handleData={handleNewsData} />
            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
            >
              Create News
            </Button>
            <Button variant="outline-secondary" className="btn-sm" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Form></Form>
    </div>
  );
};

export default NewsCreateView;
