// a modal pop up for asking user name and room name

import React from 'react';
import JoinRoomForm from './JoinRoomForm';
import {  Modal } from 'antd';
import RoomList from './RoomList';

const JoinRoomModal = ({open, onJoin, onCancel, rooms}) => {
  const roomsAreAvailable = rooms && rooms.length > 0;

  return (
      <Modal
        title="Join a room"
        open={open}
        onCancel={onCancel}
        footer={null}
      >
        {roomsAreAvailable && <RoomList rooms={rooms}/>}
        <p>Input your user name and room name to join!</p>
        <JoinRoomForm
            onJoin={onJoin}
        />
      </Modal>
  );
};

export default JoinRoomModal;