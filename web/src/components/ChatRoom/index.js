import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import MessageInput from './MessageInput';


// TODO separate the chat history into a separate component
function ChatRoom({ socket, userName, room }) {
  const [chatHistory, setChatHistory] = useState([]);

  // TODO move the logic - separate all socket events into a separate file
  useEffect(() => {
    socket.on('message', (msg) => {
      setChatHistory((prev) => [...prev, msg]);
      console.log('received message', msg);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);


  const sendMessage = (text) => {
    if (text) {
      socket.emit('message', {
        name: userName,
        text,
        room,
      });
    }
  };

  const renderName = (name) => {
    if (name === userName) {
      return 'You';
    } else if (name === 'Admin') {
      return null;
    }
    return name;
  }

  return (
    <div style={{width: "100%"}}>

      <List
        className="chat-display"
        itemLayout="horizontal"
        style={{minHeight: "60vh", marginBottom: "30px", backgroundColor: "white", padding: "20px", borderRadius: "10px"}}
        dataSource={chatHistory}
        bordered
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={renderName(item.name)}
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
