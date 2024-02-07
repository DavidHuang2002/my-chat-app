import React from 'react';

function UserList({ users }) {
  return (
    <div>
      <em>Users in room: </em>
      {users && users.map((user, index) => (
        <span key={index}>{user.name}{index < users.length - 1 ? ', ' : ''}</span>
      ))}
    </div>
  );
}

export default UserList;
