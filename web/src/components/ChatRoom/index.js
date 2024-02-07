import React, { useState, useEffect } from 'react';
import { Input, Button, List, Form } from 'antd';

const { TextArea } = Input;

function ChatRoom({ socket, userName, room }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = (e) => {
    if (message) {
      socket.emit('message', {
        name: userName,
        text: message,
        room,
      });
      setMessage('');
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
    <div>
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
      <Form className="chat-form" onFinish={sendMessage}>
        <Form.Item>
          <TextArea rows={2} onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Type a message" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Send</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChatRoom;
