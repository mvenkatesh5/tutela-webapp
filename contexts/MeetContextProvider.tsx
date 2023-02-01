import { useReducer, createContext } from "react";

export const meetContext = createContext<any>(null);

const contextInitialState = {
  session: null,
  audioToggle: true,
  videoToggle: true,
  messageToggle: true,
  videoPinned: null,
};

const contextReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SESSION":
      return {
        ...state,
        session: action.payload,
      };
    case "AUDIO_TOGGLE":
      return {
        ...state,
        audioToggle: action.payload,
      };
    case "VIDEO_TOGGLE":
      return {
        ...state,
        videoToggle: action.payload,
      };
    case "MESSAGE_TOGGLE":
      return {
        ...state,
        messageToggle: action.payload,
      };
    case "VIDEO_PINNED":
      return {
        ...state,
        videoPinned: action.payload,
      };
    case "CLEAR":
      return {
        ...state,
        contextInitialState,
      };
    default:
      throw new Error();
  }
};

export const MeetContextProvider = (props: any) => {
  const [meetState, meetDispatch] = useReducer(contextReducer, contextInitialState);

  return (
    <meetContext.Provider value={[meetState, meetDispatch]}>{props.children}</meetContext.Provider>
  );
};
