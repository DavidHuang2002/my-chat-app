import React from 'react';

function RoomList({ rooms }) {
  return (
    <div>
      <em>Available Rooms: </em>
      {rooms && rooms.map((room, index) => (
        <span key={index}>{room}{index < rooms.length - 1 ? ', ' : ''}</span>
      ))}
    </div>
  );
}

export default RoomList;
