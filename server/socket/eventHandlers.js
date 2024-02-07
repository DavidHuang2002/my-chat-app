import { getAllActiveRooms, getUsersInRoom } from "../services/users.js"


export const onUserListChange = (socket, io, room) => {
    // Update user list for room 
    io.to(room).emit('userList', {
        users: getUsersInRoom(room)
    })

    // whenever a user connects or disconnects, check the active rooms and update the room list
    onRoomListChange(socket, io)
}

// TODO pretty inefficient to get all users in all rooms just to get the room list
export const onRoomListChange = (socket, io) => {
    // Update room list
    io.emit('roomList', {
        rooms: getAllActiveRooms()
    })
}