import React from "react";
// uuid
import { v4 as uuidV4 } from "uuid";

export const globalContext = React.createContext<any>(null);

const initialState = {
  // toast alerts
  toastAlert: [],
  unratedSessionStatus: false,
  unratedSessions: [],
  sidebarToggle: false,
  profileMandatoryToggle: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TOAST_ALERT":
      action.payload["id"] = uuidV4();
      return {
        ...state,
        toastAlert: [...state.toastAlert, action.payload],
      };
    case "REMOVE_TOAST_ALERT":
      return {
        ...state,
        toastAlert: state.toastAlert.filter((item: any, i: number) => item.id != action.payload.id),
      };
    case "UNRATED_SESSION_STATUS":
      return {
        ...state,
        unratedSessionStatus: action.payload,
      };
    case "UNRATED_SESSIONS":
      return {
        ...state,
        unratedSessions: action.payload,
      };
    case "SIDEBAR_TOGGLE":
      return {
        ...state,
        sidebarToggle: action.payload,
      };
    case "PROFILE_MANDATORY_TOGGLE":
      return {
        ...state,
        profileMandatoryToggle: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContextProvider = (props: any) => {
  const [globalState, globalDispatch] = React.useReducer(reducer, initialState);

  return (
    <globalContext.Provider value={[globalState, globalDispatch]}>
      {props.children}
    </globalContext.Provider>
  );
};
