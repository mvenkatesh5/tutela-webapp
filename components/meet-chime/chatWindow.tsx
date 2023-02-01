import React, { useState, useEffect } from 'react';
import { Arrow, ChatBubble } from 'amazon-chime-sdk-component-library-react';
import { v4 as uuidV4 } from 'uuid';

interface ChatWindowProps {
  meet_id: string;
  sendMessage: Function;
  messageList: string[];
  user: any;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  sendMessage,
  messageList,
  user,
}) => {
  const [chatMessage, setChatMessage] = useState<string>('');

  console.log('this is user info', user);

  return (
    <div
      style={{
        position: 'relative',
      }}
      className='md:w-96 h-fit '
    >
      <div
        className='flex flex-col w-full h-56'
        style={{
          position: 'relative',
          padding: '0.7em',
          marginBottom: '0.7em',
          overflowY: 'auto',
        }}
      >
        {messageList?.map((message: any) => (
          <div
            className='px-7 py-2'
            key={uuidV4()}
            style={{
              width: 'fit-content',
              marginBottom: '0.5em',
              boxSizing: 'border-box',
              boxShadow: '1px 1px 5px #333',
              borderRadius: '10px',
              backgroundColor:
                message?.user != user.userName ? '#0352fc' : 'inherit',
              color: message?.user != user.userName ? '#fff' : 'inherit',
            }}
          >
            <h3 className='font-bold text-md'>{message.user}</h3>
            <span>{message?.message}</span>
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center px-2 gap-3 relative bottom-1 h-fit'>
        <input
          onChange={(e) => {
            e.preventDefault();
            setChatMessage(e.target.value);
          }}
          value={chatMessage}
          placeholder='input your message'
          type='text'
          className='px-4 py-2 rounded-lg w-full border border-b-black-10 relative'
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              setChatMessage('');
              if (e.target.value.trim() !== '') sendMessage(e);
            }
          }}
        />
        <button
          className='bg-[#075FFF] rounded-full text-white p-1'
          onClick={async (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => {
            // console.log('do nothing');
            setChatMessage('');
            sendMessage(e);
          }}
        >
          <Arrow width='2rem' height='2rem' direction='right' />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
