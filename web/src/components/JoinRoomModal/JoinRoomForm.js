import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

function JoinRoomForm({ onJoin }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = () => {
    if (name && room) {
      onJoin(name, room);
    }
  };

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Input placeholder="Chat room" value={room} onChange={(e) => setRoom(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Join</Button>
      </Form.Item>
    </Form>
  );
}

export default JoinRoomForm;
