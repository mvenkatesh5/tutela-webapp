import React from "react";
// react bootstrap
import { Button, Form, Modal } from "react-bootstrap";
// material icons
import { MessageSquareEdit } from "@styled-icons/boxicons-regular/";
// swr
import { mutate } from "swr";
// components
import ProductsForm from "./productsForm";
import SearchCheckboxView from "components/admin/sessions/SearchCheckbox";
import ResourceSearchCheckboxView from "components/resources/ResourceCheckbox";
// api routes
import { PRODUCTS_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { ProductsUpdate } from "@lib/services/productsService";

const ProductsEditView = (props: any) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);
  const [formData, setFormData] = React.useState();
  const handleFormData = (value: any) => {
    setFormData(value);
  };

  React.useEffect(() => {
    if (props.data) {
      setFormData(props.data);
    }
  }, [props.data]);

  const productsUpdate = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    ProductsUpdate(formData)
      .then((res) => {
        mutate(PRODUCTS_WITH_ID_ENDPOINT(props.data?.id), false);
        setButtonLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setButtonLoader(false);
      });
  };

  return (
    <div>
      <Form onSubmit={productsUpdate}>
        {formData && (
          <div>
            <ProductsForm data={formData} handleData={handleFormData} />

            <Button
              variant="outline-primary"
              className="btn-sm"
              type="submit"
              style={{ marginRight: "10px" }}
              disabled={buttonLoader}
            >
              {buttonLoader ? "Updating..." : "Update"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ProductsEditView;
