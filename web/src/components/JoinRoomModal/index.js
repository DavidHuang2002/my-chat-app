// a modal pop up for asking user name and room name

import React from 'react';
import JoinRoomForm from './JoinRoomForm';
import {  Modal } from 'antd';

const JoinRoomModal = ({open, onJoin, onCancel}) => {


  return (
    <>
        <Modal
        title="Join a room"
        open={open}
        onCancel={onCancel}
        footer={null}
      >
        <p>Input your user name and room name to join!</p>
        <JoinRoomForm
            onJoin={onJoin}
        />
      </Modal>
    </>
  );
};

export default JoinRoomModal;