import { useRouter } from "next/router";
import React, { useContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

interface AppStateValue {
  meetingId: string;
  localUserName: string;
  setAppMeetingInfo: (meetingId: string, name: string) => void;
}

const AppStateContext = React.createContext<AppStateValue | null>(null);

export function useAppState(): AppStateValue {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return state;
}

export function AppStateProvider({ children }: Props) {
  let [meetingId, setMeeting] = useState(`${useRouter().query.meet_id}`);
  const [localUserName, setLocalName] = useState("");

  const setAppMeetingInfo = (meetingId: string, name: string) => {
    setMeeting(meetingId);
    setLocalName(name);
  };

  const providerValue = {
    meetingId,
    localUserName,
    setAppMeetingInfo,
  };

  return (
    <AppStateContext.Provider value={providerValue}>
      {children}
    </AppStateContext.Provider>
  );
}
