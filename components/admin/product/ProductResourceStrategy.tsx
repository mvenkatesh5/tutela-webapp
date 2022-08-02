import React from "react";
// react bootstrap
import { Dropdown } from "react-bootstrap";
// swr
import { mutate } from "swr";
// api routes
import { PRODUCTS_WITH_ID_ENDPOINT } from "@constants/routes";
// api services
import { ProductsUpdate } from "@lib/services/productsService";

const ProductResourceStrategy = ({ product, tags, name, productKey }: any) => {
  const [currentTags, setCurrentTags] = React.useState<any>([]);
  const handleCurrentTags = (tagId: any) => {
    let currentUpdatedTags =
      currentTags && currentTags.length > 0
        ? currentTags?.includes(tagId)
          ? currentTags.filter((id: any) => id !== tagId)
          : [...currentTags, tagId]
        : [tagId];
    setCurrentTags(() => currentUpdatedTags);
    handleProductStrategy(currentUpdatedTags);
  };
  React.useEffect(() => {
    if (product && product?.[productKey]) {
      setCurrentTags(() =>
        product?.[productKey] && product?.[productKey].length > 0 ? product?.[productKey] : []
      );
    }
  }, [product, productKey]);

  const handleProductStrategy = (updatedTags: any) => {
    let productPayload: any = {
      id: product?.id,
    };
    productPayload[productKey] = updatedTags;

    console.log("productPayload", productPayload);

    ProductsUpdate(productPayload)
      .then((res) => {
        console.log("res", res);
        mutate(
          PRODUCTS_WITH_ID_ENDPOINT(product?.id),
          async (elements: any) => {
            return res;
          },
          false
        );
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        {name}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ maxHeight: "150px" }} className="px-3 overflow-auto mt-1">
        {tags && tags?.length > 0 ? (
          <>
            {tags.map((tag: any, index: any) => (
              <div
                key={`dropdown-data-menu-${index}`}
                className="d-flex align-items-center gap-3 my-2"
              >
                <input
                  type="checkbox"
                  id={`message-not-accomplished-checkbox-${tag.id}`}
                  value={tag.id}
                  onChange={(e) => handleCurrentTags(tag.id)}
                  checked={currentTags && currentTags?.includes(tag.id) ? true : false}
                />{" "}
                <div>{tag.name}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-muted text-sm text-center">No strategies are available.</div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductResourceStrategy;
