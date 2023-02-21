import React, { useEffect, useState } from "react";
import {
  ControlBar,
  ControlBarButton,
  Phone,
  useMeetingManager,
  useToggleLocalMute,
  AudioOutputControl,
  useContentShareControls,
  ScreenShare,
  useContentShareState,
  Chat,
  Clear,
  IconButton,
  Record,
  Microphone,
  useLocalVideo,
  Camera,
  Remove,
  useLocalAudioOutput,
  Sound,
  VideoInputControl,
  Attendees,
  Hamburger,
  PopOver,
  PopOverItem,
  PrimaryButton,
} from "amazon-chime-sdk-component-library-react";
import { Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";
// Components
import ChatWindow from "./chatWindow";
import Participant from "./Participant";
const { NEXT_PUBLIC_WS_URL } = process.env;
// lib
import { leaveMeeting, deleteMeeting } from "@components/meet-chime/helpers/chime-session";

type ControlProps = {
  meet_id: string;
  user: any;
  attendee: string;
  internalMeetId: string;
  hostId?: any;
  attendeeArr: Array<any>;
};

const Controls: React.FC<ControlProps> = ({
  meet_id,
  user,
  attendee,
  internalMeetId,
  hostId,
  attendeeArr,
}) => {
  // console.log("this is users", attendeeArr);
  const router = useRouter();
  const meetingManager = useMeetingManager();
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing } = useContentShareState();
  const { isAudioOn, toggleAudio } = useLocalAudioOutput();
  const [showParticipants, setShowParticipants] = useState(false);

  const [open, setOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [hasConnection, setConnectionStatus] = useState(false);
  const [chatSocket, setChatSocket] = useState<any>(undefined);
  const [messages, setMessages] = useState();
  const [chatMessage, setChatMessage] = useState<string>("");

  const host = NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000";

  const onMessage = function (e: any) {
    e.preventDefault();
    const data = JSON.parse(e.data);
    setMessages(data);
  };

  const onClose = function (e: any) {
    console.error("Chat socket closed unexpectedly");
  };

  const meeting_id = meet_id.replaceAll("-", "_").trim();

  useEffect(() => {
    if (hasConnection == false) {
      const chatWS = new WebSocket(`${host}/api/ws/chat/${meeting_id}/`);
      chatWS.onmessage = onMessage;
      chatWS.onclose = onClose;
      setChatSocket(chatWS);
      setConnectionStatus(true);
    }

    if (messages) {
      setMessageList([...messageList, messages]);
    }
  }, [messages]);

  const sendMessage = (e: any) => {
    if (hasConnection && chatSocket) {
      chatSocket.send(
        JSON.stringify({
          message: e.target.value,
          user: user.firstName,
        })
      );
      setChatMessage("");
    } else {
      setConnectionStatus(false);
    }
  };

  const muteButtonProps = {
    icon: <Microphone muted={muted} />,
    label: muted ? "Unmute" : "mute",
    onClick: () => toggleMute(),
  };

  const videoButtonProps = {
    icon: <Camera disabled={!isVideoEnabled} />,
    label: "Video",
    onClick: () => toggleVideo(),
  };

  const screenButtonProps = {
    icon: isLocalUserSharing ? <Remove /> : <ScreenShare />,
    label: isLocalUserSharing ? "Stop" : "Screen",
    onClick: () => toggleContentShare(),
  };

  const soundButtonProps = {
    icon: <Sound disabled={!isAudioOn} />,
    label: "Speaker",
    onClick: () => toggleAudio(),
  };

  const endButtonHostProps = {
    icon: <Phone />,
    onClick: async () => {
      router.replace("/calendar");
      leaveMeeting(internalMeetId, attendee);
      await meetingManager.leave();
    },

    label: "Leave Meeting",
    popOver: [
      {
        onClick: async () => {
          await router.replace({
            pathname: "/calendar",
            query: { id: internalMeetId },
          });
          deleteMeeting(internalMeetId, attendee);
          await meetingManager.leave();
        },
        children: <span> End Meeting for All</span>,
      },
    ],
  };

  const endButtonProps = {
    icon: <Phone />,
    onClick: async () => {
      router.replace("/calendar");
      leaveMeeting(internalMeetId, attendee);
      await meetingManager.leave();
    },
    label: "Leave Meeting",
  };

  const chatButtonProps = {
    icon: open ? <Clear /> : <Chat />,
    label: "Chat",
    onClick: () => setOpen(!open),
  };

  const participantsButtonProps = {
    icon: <Attendees />,
    label: "Participants",
    onClick: () => setShowParticipants(!showParticipants),
  };
  useEffect(() => {
    muted ? "" : toggleMute();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-bg-gray-200 tw-h-[10%] tw-px-3 tw-relative ">
        <div className="">
          <ControlBarButton {...muteButtonProps} />
        </div>
        <div className="">
          {/* <ControlBarButton {...videoButtonProps} /> */}
          <VideoInputControl />
        </div>
        <div className="xs:tw-hidden md:tw-flex ">
          <ControlBarButton {...screenButtonProps} />
        </div>

        <div className="">
          <ControlBarButton {...soundButtonProps} />
        </div>
        <div className="xs:tw-hidden md:tw-flex">
          <ControlBarButton {...participantsButtonProps} />
        </div>
        <div className="xs:tw-flex md:tw-hidden">
          <PopOver
            a11yLabel="More Option"
            renderButton={(isOpen) => <IconButton label="Open PopOver" icon={<Hamburger />} />}
          >
            <PopOverItem as="button" onClick={() => setOpen(true)} children={<span>Chat</span>} />
            <PopOverItem
              as="button"
              onClick={() => setShowParticipants(true)}
              children={<span>Participants</span>}
            />
          </PopOver>
        </div>
        <div className="">
          {"0" + user.userId.toString() === hostId?.toString() ? (
            <ControlBarButton {...endButtonHostProps} />
          ) : (
            <ControlBarButton {...endButtonProps} />
          )}
        </div>

        <div className="xs:tw-hidden md:tw-flex tw-justify-center tw-items-center tw-p-1 tw-align-middle tw-absolute tw-right-10">
          <ControlBarButton {...chatButtonProps} />
        </div>
      </div>

      {showParticipants && (
        <Offcanvas
          scroll={true}
          show={showParticipants}
          onHide={() => setShowParticipants(false)}
          backdrop={true}
          placement="start"
          as="div"
          style={{
            // margin: "1em",
            padding: "1em",
            borderRadius: "1em",
            boxSizing: "border-box",
            boxShadow: "2px 4px 35px black",
          }}
          className="tw-my-[1em] sm:tw-mx-[1em]"
        >
          <Offcanvas.Header closeButton>
            <span className="tw-font-bold tw-text-2xl">Participants</span>
          </Offcanvas.Header>
          <Offcanvas.Body className="tw-overflow-y-auto ">
            {attendeeArr?.map((data: any, i) => (
              <Participant attendee={data} key={i} />
            ))}
          </Offcanvas.Body>
        </Offcanvas>
      )}

      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="tw-absolute tw-z-50 tw-bottom-20 md:tw-right-10 sm:tw-right-0 "
          style={{
            background: "white",
            padding: "1em",
            borderRadius: "10px",
            border: "2px solid black",
            boxSizing: "border-box",
            boxShadow: "2px 3px 15px black",
          }}
        >
          <Dialog.Panel>
            <Dialog.Title className="tw-font-bold tw-text-lg tw-flex tw-justify-between">
              Chat{" "}
              <IconButton
                label="Clear"
                icon={<Clear />}
                iconSize="md"
                onClick={() => setOpen(false)}
              />
            </Dialog.Title>

            <ChatWindow
              meet_id={meet_id}
              messageList={messageList}
              sendMessage={(e: any) => sendMessage(e)}
              user={user}
            />
          </Dialog.Panel>
        </Dialog>
      )}
    </>
  );
};

export default Controls;
