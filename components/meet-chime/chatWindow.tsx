import React, { useState, useEffect } from "react";
import { Arrow, ChatBubble } from "amazon-chime-sdk-component-library-react";
import { v4 as uuidV4 } from "uuid";

interface ChatWindowProps {
  meet_id: string;
  sendMessage: Function;
  messageList: string[];
  user: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ sendMessage, messageList, user }) => {
  const [chatMessage, setChatMessage] = useState<string>("");

  return (
    <div className="md:tw-w-96 tw-h-fit tw-relative ">
      <div className="tw-flex tw-flex-col tw-w-full tw-h-56 tw-relative tw-overflow-y-auto tw-mb-[0.7em] tw-p-[0.7em]">
        {messageList?.map((message: any) => (
          <div
            className="tw-px-7 tw-py-2"
            key={uuidV4()}
            style={{
              width: "fit-content",
              marginBottom: "0.5em",
              boxSizing: "border-box",
              boxShadow: "1px 1px 5px #333",
              borderRadius: "10px",
              backgroundColor: message?.user != user.userName ? "#0352fc" : "inherit",
              color: message?.user != user.userName ? "#fff" : "inherit",
            }}
          >
            <h3 className="tw-font-bold tw-text-md">{message.user}</h3>
            <span>{message?.message}</span>
          </div>
        ))}
      </div>
      <div className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-gap-3 tw-relative tw-bottom-1 tw-h-fit">
        <input
          onChange={(e) => {
            e.preventDefault();
            setChatMessage(e.target.value);
          }}
          value={chatMessage}
          placeholder="input your message"
          type="text"
          className="tw-px-4 tw-py-2 tw-rounded-lg tw-w-full tw-border tw-border-b-black-10 tw-relative"
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              setChatMessage("");
              if (e.target.value.trim() !== "") sendMessage(e);
            }
          }}
        />
        <button
          className="tw-bg-[#075FFF] tw-rounded-full tw-text-white p-1"
          onClick={async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // console.log('do nothing');
            setChatMessage("");
            sendMessage(e);
          }}
        >
          <Arrow width="2rem" height="2rem" direction="right" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
