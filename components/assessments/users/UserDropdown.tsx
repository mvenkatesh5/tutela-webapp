import React from "react";
// react bootstrap
import { Form } from "react-bootstrap";
// material icons
import { Times } from "@styled-icons/fa-solid/Times";

const UserDropdown = (props: any) => {
  const [searchOptions, SetSearchOptions] = React.useState<any>([]);
  const [searchInput, setSearchInput] = React.useState<any>("");
  const [focusToggle, setFocusToggle] = React.useState<any>(false);
  // user answers
  const [userOptions, setUserOptions] = React.useState<any>([]);

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
      setUserOptions(props.data);
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
      setUserOptions(payload);
      props.handleData(payload);
      // adding user date payload
      if (props.role === 0) {
        let datePayload = {
          student_id: id,
          datetime: null,
        };
        props.handleDates([...props.dates, datePayload]);
      }
      setSearchInput("");
      setFocusToggle(false);
    } else {
      let payload: any = userOptions.filter((_: any, i: any) => index != i);
      setUserOptions(payload);
      props.handleData(payload);
      if (props.role === 0) {
        props.handleDates(props.dates.filter((_: any, i: any) => _.student_id != id));
      }
    }
    validateUserOptions(null);
  };

  const handleUpdateUserDate = (id: any, date: any) => {
    let currentIndex = props.dates.findIndex((d: any) => d.student_id === id);
    if (currentIndex >= 0) {
      let currentDates = [...props.dates];
      currentDates[currentIndex].datetime = date;
      props.handleDates(currentDates);
    }
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
            {props.role === 0 && (
              <>
                {props?.dates.map((user: any, index: any) => (
                  <div
                    key={`user-options-${index}`}
                    className="user-option-card"
                    style={{ overflow: "auto" }}
                  >
                    <div className="content me-2 text-primary">
                      <div>{getCurrentUserName(user?.student_id)}</div>
                      <div className="mt-2">
                        <Form.Group className="mb-3">
                          <Form.Label className="mb-1 text-muted text-sm">Scheduled At</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={user?.datetime}
                            onChange={(e) => handleUpdateUserDate(user?.student_id, e.target.value)}
                            required
                            placeholder="time"
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div
                      className="icon"
                      onClick={() => handleUserOptions("remove", user?.student_id, index)}
                    >
                      <Times />
                    </div>
                  </div>
                ))}
              </>
            )}
            {props.role === 1 && (
              <>
                {userOptions.map((user: any, index: any) => (
                  <div
                    key={`user-options-${index}`}
                    className="user-option-card"
                    style={{ overflow: "auto" }}
                  >
                    <div className="content me-2 text-primary">
                      <div>{getCurrentUserName(user)}</div>
                    </div>
                    <div className="icon" onClick={() => handleUserOptions("remove", user, index)}>
                      <Times />
                    </div>
                  </div>
                ))}
              </>
            )}
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

export default UserDropdown;
