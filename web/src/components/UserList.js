import React from 'react';

function UserList({ users }) {
  return (
    <div style={{margin: "10px 0"}}>
      <em>Users in room: </em>
      {users && users.map((user, index) => (
        <span key={index}>{user.name}{index < users.length - 1 ? ', ' : ''}</span>
      ))}
    </div>
  );
}

export default UserList;
