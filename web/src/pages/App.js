import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Layout  } from 'antd';
import ChatRoom from '../components/ChatRoom';
import JoinRoomModal from '../components/JoinRoomModal';
import UserList from '../components/UserList';

const { Content } = Layout;
const socket = io('ws://localhost:3500');

function App() {
  const [currentRoom, setCurrentRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    socket.on("userList", ({users}) => {
      console.log("userList", users);
      // Handle received message
      setUserList(users);
    });

    // unbind socket for cleanup
    return () => {
      socket.off("message");
      socket.off("userList");
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
      <Content 
        style={{ 
          height: '100vh',
          padding: '20px', width: '600px', margin: '0 auto', marginTop: '50px',
        }}
      >
        <JoinRoomModal open={JoinRoomModalOpen} onJoin={handleRoomJoin} onCancel={() => {}} />
        <ChatRoom socket={socket} userName={userName} room={currentRoom} />
        <UserList users={userList} />
      </Content>
    </Layout>
  );
}

export default App;
