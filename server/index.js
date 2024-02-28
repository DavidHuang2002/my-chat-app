import express from 'express'
import { Server } from "socket.io"
import { activateUser, deactivateUser, getUser, getAllActiveRooms } from './services/users.js'
import { makeMessage } from './services/messages.js'
import { onUserListChange } from './socket/eventHandlers.js'

const PORT = process.env.PORT || 3500
const ADMIN = "Admin"

const app = express()

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})

const server = app.listen(PORT, () => {
    console.log(`Server running`)
})


// Get allowed origins from environment variables
const localOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://10.76.234.9:3000"];
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : localOrigins;

const io = new Server(server, {
    cors: {
        // TODO add env var for production and dev
        origin: allowedOrigins,
    }
})

// TODO make it into APIs
const sendRooms = (socket) => {
    socket.emit("roomList", {
        rooms: getAllActiveRooms()
    })
}

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)
    
    sendRooms(socket)

    // TODO extract messaging logic into one place
    socket.on("joinRoom", ({ name, room }) => {
        socket.join(room)
        socket.emit("message", { user: ADMIN, text: `${name}, welcome to room ${room}` })
        socket.broadcast.to(room).emit("message", { name: ADMIN, text: `${name} has joined!` })

        activateUser(socket.id, name, room)
        onUserListChange(socket, io, room)
    })

    socket.on("activity", ({name, room} ) => {
        console.log(`Received activity from ${name} in room ${room}`)
        socket.broadcast.to(room).emit("activity", { name })
    })

    // TODO extract a common message interface to be used for both front and back end
    socket.on("message", ({ text }) => {
        const user = getUser(socket.id)
        const { name, room } = user
        console.log(`Received message from ${name} in room ${room}: ${text}`)
        // TODO add time stamp to message
        io.to(room).emit("message", makeMessage(name, text))
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`)
        const user = deactivateUser(socket.id)
        if (user) {
            const { name, room } = user
            io.to(room).emit("message", { user: ADMIN, text: `${name} has left room ${room}` })
            onUserListChange(socket, io, room)
        }
    })
})


// Export the Express API
export default app