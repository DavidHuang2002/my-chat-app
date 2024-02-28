import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Layout  } from 'antd';
import ChatRoom from '../components/ChatRoom';
import JoinRoomModal from '../components/JoinRoomModal';
import UserList from '../components/UserList';
import ActivityIndicator from '../components/ActivityIndicator';

const { Content } = Layout;

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'ws://localhost:3500';
const socket = io(SERVER_URL);

function App() {
  console.log(process.env)
  console.log('SERVER_URL', SERVER_URL);
  const [currentRoom, setCurrentRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [activity, setActivity] = useState('');

  


  const setActivityTimeout = () => {
    setTimeout(() => {
      setActivity('');
    }, 500);
  }

  

  useEffect(() => {
    socket.on("userList", ({users}) => {
      console.log("userList", users);
      // Handle received message
      setUserList(users);
    });

    socket.on("roomList", ({rooms}) => {
      console.log("roomList", rooms);
      // Handle received message
      setRoomList(rooms);
    });

    let timeOut;
    const activityCallback = ({name}) => {
      console.log('activity received', name);
      clearTimeout(timeOut);
      const activity = `${name} is typing...`;
      setActivity(activity);
      timeOut = setActivityTimeout();
    }
    socket.on("activity", activityCallback);

    // unbind socket for cleanup
    return () => {
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
          minHeight: '100vh',
          padding: '20px', width: '600px', margin: '0 auto', marginTop: '50px',
        }}
      >
        <JoinRoomModal 
          open={JoinRoomModalOpen} 
          onJoin={handleRoomJoin} 
          onCancel={() => {}} 
          rooms={roomList}
        />
        <ChatRoom socket={socket} userName={userName} room={currentRoom} />
        <UserList 
          users={userList} 
        />
        <ActivityIndicator activity={activity} />
      </Content>
    </Layout>
  );
}

export default App;
