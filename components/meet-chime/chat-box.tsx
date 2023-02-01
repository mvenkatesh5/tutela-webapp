import {
  RosterHeader,
  Arrow,
  ChatBubble,
} from "amazon-chime-sdk-component-library-react";
import React, { useState } from "react";
import { useAppState } from "provider/AppStateProvide";
import { useRealitimeSubscribeChatState } from "provider/RealtimeSubscribeChatProvider";

export interface ChatProps {
  attendeeId: string;
  text: string;
}

const ChatView = () => {
  const { localUserName } = useAppState();
  const { chatData, sendChatData } = useRealitimeSubscribeChatState();
  const [chatMessage, setChatMessage] = useState("");

  const chats = chatData.map((c) => {
    const senderName = "user";
    const text = c.data;
    const time = new Date(c.createdDate).toLocaleTimeString();
    return (
      <ChatBubble
        key={time}
        variant="outgoing"
        className="flex justify-start items-center m-2 p-2 w-full "
      >
        {`${senderName} : ${text}`}
      </ChatBubble>
    );
  });

  return (
    <div className="rounded bg-blue-200 p-2  w-full">
      <RosterHeader title="Chat" className="font-semibold"></RosterHeader>
      <div className="flex flex-col w-full">{chats}</div>
      <br />
      <div className="flex justify-between items-center px-2 gap-2 ">
        <input
          //@ts-ignore
          onChange={(e) => setChatMessage(e.target.value)}
          value={chatMessage}
          placeholder="input your message"
          type="text"
          className="px-4 py-2 rounded-lg w-full"
        />
        <button
          className="bg-[#075FFF] rounded-full text-white p-1"
          onClick={async (e) => {
            console.log(chatMessage);
            setChatMessage("");
            sendChatData(chatMessage);
          }}
        >
          <Arrow width="2rem" height="2rem" direction="right" />
        </button>
      </div>
    </div>
  );
};

export default ChatView;
