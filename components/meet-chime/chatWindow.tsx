import React, { useState, useEffect, useRef } from "react";
import { Arrow, ChatBubble } from "amazon-chime-sdk-component-library-react";
import { v4 as uuidV4 } from "uuid";

interface ChatWindowProps {
  ref: any;
  meet_id: string;
  sendMessage: Function;
  messageList: string[];
  user: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ sendMessage, messageList, user, ref }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [chatMessage, setChatMessage] = useState<string>("");

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
    ref?.current?.focus();
  }, [messageList]);

  return (
    <div className="md:tw-w-96 tw-h-fit tw-relative ">
      <div className="tw-w-full tw-h-64 tw-relative tw-overflow-y-auto tw-overflow-x-hidden tw-mb-[0.7em] tw-p-[0.7em] tw-rounded-lg  ">
        {messageList?.map((message: any) => (
          <div
            className={`tw-flex tw-justify-${message?.user != user.firstName ? "start" : "end"}`}
            key={uuidV4()}
          >
            <div
              className="tw-px-5 tw-py-2 tw-rounded-md"
              ref={messageRef}
              style={{
                width: "fit-content",
                marginBottom: "0.5em",

                backgroundColor: message?.user != user.firstName ? "#d3d3d3" : "#0352fc",
                color: message?.user != user.firstName ? "inherit" : "#fff",
              }}
            >
              <p className="tw-font-bold tw-text-lg tw-m-0">
                {message.user?.charAt(0)?.toUpperCase() + message.user?.slice(1)}
              </p>
              <span>{message?.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-gap-3 tw-relative tw-bottom-1 tw-h-fit">
        <input
          tabIndex={1}
          autoFocus
          onChange={(e) => {
            e.preventDefault();
            setChatMessage(e.target.value);
          }}
          value={chatMessage}
          placeholder="Enter your message"
          type="text"
          className="tw-px-4 tw-py-2 tw-rounded-lg tw-w-full  tw-relative focus:tw-outline-none"
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              setChatMessage("");
              if (e.target.value.trim() !== "") sendMessage(e);
            }
          }}
          style={{ border: "1px solid #d3d3d3" }}
        />
        <button
          className="tw-bg-[#075FFF] tw-rounded-full tw-text-white p-1 tw-border-none tw-outline-none"
          onClick={() => {
            if (chatMessage.trim() !== "") sendMessage(chatMessage);
            setChatMessage("");
          }}
        >
          <Arrow width="2rem" height="2rem" direction="right" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
