import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";

const SearchCheckbox = (props: any) => {
  const [searchOptions, SetSearchOptions] = React.useState<any>([]);
  const [searchInput, setSearchInput] = React.useState<any>("");
  const [focusToggle, setFocusToggle] = React.useState<any>(false);
  // user answers
  const [userOptions, SetUserOptions] = React.useState<any>([]);

  const validateUserOptions = (search: any) => {
    let currentUsers: any = [];
    props.users.map((data: any, index: any) => {
      if (data.role === props.role) {
        if (search) {
          if (
            (data.first_name && data.first_name.toLowerCase().includes(search.toLowerCase())) ||
            (data.last_name && data.last_name.toLowerCase().includes(search.toLowerCase())) ||
            (data.email && data.email.toLowerCase().includes(search.toLowerCase())) ||
            (data.username && data.username.toLowerCase().includes(search.toLowerCase()))
          ) {
            if (!userOptions.includes(data.id)) currentUsers.push(data);
          }
        } else {
          if (!userOptions.includes(data.id)) currentUsers.push(data);
        }
      }
    });
    SetSearchOptions(currentUsers);
  };

  React.useEffect(() => {
    if (props.users && props.users.length > 0) {
      validateUserOptions(null);
    }
  }, [props.users]);
  React.useEffect(() => {
    if (focusToggle && props.users && props.users.length > 0) {
      validateUserOptions(null);
    }
  }, [focusToggle]);

  React.useEffect(() => {
    if (props.data && props.data.length > 0) {
      SetUserOptions(props.data);
    }
  }, [props.data]);

  const handleSearchInput = (value: any) => {
    setSearchInput(value);
    if (value) {
      validateUserOptions(value);
    } else {
      validateUserOptions(null);
    }
  };

  const handleUserOptions = (key: any, id: any, index: any) => {
    if (key === "add") {
      let payload: any = [...userOptions, id];
      SetUserOptions(payload);
      props.handleData(payload);
      setSearchInput("");
      setFocusToggle(false);
    } else {
      let payload: any = userOptions.filter((_: any, i: any) => index != i);
      SetUserOptions(payload);
      props.handleData(payload);
    }
    validateUserOptions(null);
  };

  const getCurrentUserName = (user_id: any) => {
    if (props.users && props.users.length > 0) {
      const currentData: any = props.users.find(
        (element: any, i: any) => element.id === parseInt(user_id)
      );
      if (currentData)
        return `${currentData.first_name} ${currentData.last_name} (${currentData.email})`;
    }
  };

  return (
    <div className="mb-2">
      <div className="search-root-wrapper">
        <div className="search-container">
          <Form.Group controlId="bulk-search-input">
            <Form.Control
              type="text"
              placeholder={`Search ${props.role === 0 ? `User's` : `Mentor's`}`}
              value={searchInput}
              onChange={(e) => handleSearchInput(e.target.value)}
              onFocus={() => setFocusToggle(true)}
              disabled={props.validInput === userOptions.length}
            />
          </Form.Group>
        </div>
        {focusToggle && (
          <div className="search-dropdown">
            <div className="search-dropdown-Header">
              <div className="content">{props.role === 0 ? `User's` : `Mentor's`}</div>
              <div
                className="icon"
                onClick={() => {
                  setFocusToggle(false);
                  validateUserOptions(null);
                  setSearchInput("");
                }}
              >
                <Times />
              </div>
            </div>
            <div className="search-dropdown-content">
              {searchOptions && searchOptions.length > 0 ? (
                <div>
                  {searchOptions.map((user: any, index: any) => (
                    <div
                      className="search-dropdown-option"
                      key={`search-user-options-${index}`}
                      onClick={() => handleUserOptions("add", user.id, index)}
                    >
                      {getCurrentUserName(user.id)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted text-center">
                  <small>No {props.role === 0 ? `User's` : `Mentor's`} are found.</small>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="search-user-options">
        {userOptions && userOptions.length > 0 ? (
          <div>
            {userOptions.map((user: any, index: any) => (
              <div key={`user-options-${index}`} className="user-option-card">
                <div className="content">{getCurrentUserName(user)}</div>
                <div className="icon" onClick={() => handleUserOptions("remove", user, index)}>
                  <Times />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted text-center">
            <small>No {props.role === 0 ? `User's` : `Mentor's`} are assigned.</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCheckbox;
