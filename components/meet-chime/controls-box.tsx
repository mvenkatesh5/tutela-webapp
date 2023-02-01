import React, { useEffect, useState } from 'react';
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
} from 'amazon-chime-sdk-component-library-react';
import { useRouter } from 'next/router';
import { Dialog } from '@headlessui/react';
import ChatWindow from './chatWindow';
const { NEXT_PUBLIC_WS_URL } = process.env;
// lib
import { removeMeetingAttendee } from 'lib/meet/attendees';
import { createRecordingSession, stopRecordingSession } from 'lib/meet/record';

type ControlProps = {
  meet_id: string;
  user: any;
  attendee: string;
  internalMeetId: string;
};

const Controls: React.FC<ControlProps> = ({
  meet_id,
  user,
  attendee,
  internalMeetId,
}) => {
  const router = useRouter();
  const meetingManager = useMeetingManager();
  const { muted, toggleMute } = useToggleLocalMute();
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { toggleContentShare } = useContentShareControls();
  const { isLocalUserSharing } = useContentShareState();
  const { isAudioOn, toggleAudio } = useLocalAudioOutput();

  const [open, setOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [hasConnection, setConnectionStatus] = useState(false);
  const [chatSocket, setChatSocket] = useState<any>(undefined);
  const [messages, setMessages] = useState();
  const [chatMessage, setChatMessage] = useState<string>('');
  const [recording, setRecording] = useState<boolean>(false);
  const [recordingResponse, setRecordingResponse] = useState<any>(null);

  const host = NEXT_PUBLIC_WS_URL || 'ws://127.0.0.1:8000';

  const onMessage = function (e: any) {
    e.preventDefault();
    const data = JSON.parse(e.data);
    setMessages(data);
  };

  const onClose = function (e: any) {
    console.error('Chat socket closed unexpectedly');
  };

  useEffect(() => {
    if (hasConnection == false) {
      const chatWS = new WebSocket(`${host}/api/ws/chat/${meet_id}/`);
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
          user: user.userName,
        })
      );
      setChatMessage('');
    } else {
      setConnectionStatus(false);
    }
  };

  const muteButtonProps = {
    icon: <Microphone muted={muted} />,
    label: muted ? 'Unmute' : 'mute',
    onClick: () => toggleMute(),
  };

  const videoButtonProps = {
    icon: <Camera disabled={!isVideoEnabled} />,
    label: 'Video',
    onClick: () => toggleVideo(),
  };

  const screenButtonProps = {
    icon: isLocalUserSharing ? <Remove /> : <ScreenShare />,
    label: isLocalUserSharing ? 'Stop' : 'Screen',
    onClick: () => toggleContentShare(),
  };

  const soundButtonProps = {
    icon: <Sound disabled={!isAudioOn} />,
    label: 'Speaker',
    onClick: () => toggleAudio(),
  };

  const recordButtonProps = {
    icon: <Record />,
    label: recording ? 'Stop' : 'Record',
    onClick: async () => {
      if (!recording && recordingResponse == null) {
        const record = await createRecordingSession(internalMeetId);
        if (record) {
          setRecording(true);
          setRecordingResponse(record?.response);
        }
      } else {
        const stopRecording = await stopRecordingSession(
          recordingResponse?.MediaCapturePipeline?.MediaPipelineId,
          internalMeetId,
          recordingResponse?.MediaCapturePipeline?.MediaPipelineArn
        );
        if (stopRecording) {
          setRecording(false);
          setRecordingResponse(null);
        }
      }
    },
  };

  // console.log('This is record response', recordingResponse);
  // console.log(
  //   'media pipeline id',
  //   recordingResponse?.MediaCapturePipeline?.MediaPipelineId
  // );
  const endButtonProps = {
    icon: <Phone />,
    onClick: async () => {
      await router.push('/meet_end/end');
      await removeMeetingAttendee(internalMeetId, attendee)
        .then((res) => res)
        .catch((e) => e);
      await meetingManager.leave();
    },
    label: 'End',
  };
  const chatButtonProps = {
    icon: open ? <Clear /> : <Chat />,
    label: 'Chat',
    onClick: () => setOpen(!open),
  };

  useEffect(() => {
    muted ? '' : toggleMute();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ControlBar
        showLabels={true}
        responsive={true}
        layout='bottom'
        className='flex justify-center items-center gap-3 sm:gap-4 h-full w-full px-4 '
      >
        <div className='flex justify-center items-center w-14'>
          <ControlBarButton {...muteButtonProps} />
        </div>
        <div className='flex justify-center items-center w-14'>
          {/* <ControlBarButton {...videoButtonProps} /> */}
          <VideoInputControl />
        </div>
        <div className='flex justify-center items-center w-14'>
          <ControlBarButton {...screenButtonProps} />
        </div>
        {/* <div className='flex justify-center items-center w-14'>
          <ControlBarButton {...recordButtonProps} />
        </div> */}
        <div className='flex justify-center items-center w-14'>
          <ControlBarButton {...soundButtonProps} />
        </div>

        <div className='flex justify-center items-center w-14'>
          <ControlBarButton {...endButtonProps} />
        </div>
        {/* <div className='flex justify-center items-center w-14 absolute right-10'>
          <ControlBarButton {...chatButtonProps} />
        </div> */}
      </ControlBar>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className='absolute z-50 bottom-20 md:right-10 xs:right-0 '
        style={{
          background: 'white',
          padding: '1em',
          borderRadius: '10px',
          border: '2px solid black',
          boxSizing: 'border-box',
          boxShadow: '2px 3px 15px black',
        }}
      >
        <Dialog.Panel>
          <Dialog.Title className='font-bold text-lg flex justify-between'>
            Chat{' '}
            <IconButton
              label='Clear'
              icon={<Clear />}
              iconSize='md'
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
    </>
  );
};

export default Controls;
