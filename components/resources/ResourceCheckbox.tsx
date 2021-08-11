import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";

const ResourceSearchCheckbox = (props: any) => {
  const [searchOptions, SetSearchOptions] = React.useState<any>([]);
  const [searchInput, setSearchInput] = React.useState<any>("");
  const [focusToggle, setFocusToggle] = React.useState<any>(false);
  // user answers
  const [resourceOptions, SetResourceOptions] = React.useState<any>([]);

  const validateResourceOptions = (search: any) => {
    console.log(search);
    let currentUsers: any = [];
    props.resources.map((data: any, index: any) => {
      if (search) {
        if (data && data.title.toLowerCase().includes(search.toLowerCase()))
          if (!resourceOptions.includes(data.id)) currentUsers.push(data);
      } else {
        if (!resourceOptions.includes(data.id)) currentUsers.push(data);
      }
    });
    SetSearchOptions(currentUsers);
  };

  React.useEffect(() => {
    if (props.resources && props.resources.length > 0) {
      validateResourceOptions(null);
    }
  }, [props.resources]);

  React.useEffect(() => {
    if (props.data && props.data.length > 0) {
      SetResourceOptions(props.data);
    }
  }, [props.data]);

  const handleSearchInput = (value: any) => {
    setSearchInput(value);
    if (value) {
      validateResourceOptions(value);
    } else {
      validateResourceOptions(null);
    }
  };

  const handleResourceOptions = (key: any, id: any, index: any) => {
    if (key === "add") {
      let payload: any = [...resourceOptions, id];
      SetResourceOptions(payload);
      props.handleData(payload);
      setSearchInput("");
      setFocusToggle(false);
    } else {
      let payload: any = resourceOptions.filter((_: any, i: any) => index != i);
      SetResourceOptions(payload);
      props.handleData(payload);
    }
    validateResourceOptions(null);
  };

  const getCurrentResourceName = (resource_id: any) => {
    if (props.resources && props.resources.length > 0) {
      const currentData: any = props.resources.find(
        (element: any, i: any) => element.id === parseInt(resource_id)
      );
      if (currentData) return `${currentData.title}`;
    }
  };

  return (
    <div className="mb-2">
      <div className="search-root-wrapper">
        <div className="search-container">
          <Form.Group controlId="bulk-search-input">
            <Form.Control
              type="text"
              placeholder={`Search Resources`}
              value={searchInput}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => setFocusToggle(true)}
            />
          </Form.Group>
        </div>
        {focusToggle && (
          <div className="search-dropdown">
            <div className="search-dropdown-Header">
              <div className="content">Resources</div>
              <div
                className="icon"
                onClick={() => {
                  setFocusToggle(false);
                  validateResourceOptions(null);
                  setSearchInput("");
                }}
              >
                <Times />
              </div>
            </div>
            <div className="search-dropdown-content">
              {searchOptions && searchOptions.length > 0 ? (
                <div>
                  {searchOptions.map((resource: any, index: any) => (
                    <div
                      className="search-dropdown-option"
                      key={`search-resource-options-${index}`}
                      onClick={() => handleResourceOptions("add", resource.id, index)}
                    >
                      {resource.title}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted text-center">
                  <small>No Resources are found.</small>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="search-user-options">
        {resourceOptions && resourceOptions.length > 0 ? (
          <div>
            {resourceOptions.map((resource: any, index: any) => (
              <div key={`resource-options-${index}`} className="user-option-card">
                {console.log(resource)}
                <div className="content">{getCurrentResourceName(resource)}</div>
                <div
                  className="icon"
                  onClick={() => handleResourceOptions("remove", resource, index)}
                >
                  <Times />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted text-center">
            <small>No resources are assigned.</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceSearchCheckbox;
