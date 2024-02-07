import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import MessageInput from './MessageInput';


function ChatRoom({ socket, userName, room }) {
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = (message) => {
    if (message) {
      socket.emit('message', {
        name: userName,
        message,
        room,
      });
    }
  };

  useEffect(() => {
    socket.on('message', (msg) => {
      setChatHistory((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  return (
    <div style={{width: "100%"}}>
      <List
        className="chat-display"
        itemLayout="horizontal"
        dataSource={chatHistory}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={
                <>
                  <p>{item.text}</p>
                  <small>{item.time}</small>
                </>
              }
            />
          </List.Item>
        )}
      />

      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default ChatRoom;
