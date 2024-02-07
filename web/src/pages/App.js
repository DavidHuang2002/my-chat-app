import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Layout } from 'antd';
import ChatRoom from '../components/ChatRoom';
import JoinRoomModal from '../components/JoinRoomModal';

const { Content } = Layout;
const socket = io('ws://localhost:3500');

function App() {
  const [currentRoom, setCurrentRoom] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on("message", (message) => {
      // Handle received message
    });

    // unbind socket for cleanup
    return () => {
      socket.off("message");
    };
  }, []);

  const handleRoomJoin = (name, room) => {
    setJoinRoomModalOpen(false);
    setUserName(name);
    setCurrentRoom(room);
    socket.emit('joinRoom', { name, room });
  };
  

  // ---
  const [JoinRoomModalOpen, setJoinRoomModalOpen] = useState(true);

  return (
    <Layout>
      <Content style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {/* <JoinRoomForm onJoin={handleRoomJoin} /> */}
        <JoinRoomModal open={JoinRoomModalOpen} onJoin={handleRoomJoin} onCancel={() => {}} />
        <ChatRoom socket={socket} userName={userName} room={currentRoom} />
      </Content>
    </Layout>
  );
}

export default App;
