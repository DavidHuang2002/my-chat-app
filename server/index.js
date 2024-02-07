import express from 'express'
import { Server } from "socket.io"
import { activateUser, deactivateUser, getUser } from './services/users.js'
import { makeMessage } from './services/messages.js'
import { onUserListChange } from './socket/eventHandlers.js'

const PORT = process.env.PORT || 3500
const ADMIN = "Admin"

const app = express()

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const io = new Server(server, {
    cors: {
        // TODO add env var for production and dev
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    }
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    // TODO extract messaging logic into one place
    socket.on("joinRoom", ({ name, room }) => {
        socket.join(room)
        socket.emit("message", { user: ADMIN, text: `${name}, welcome to room ${room}` })
        socket.broadcast.to(room).emit("message", { name: ADMIN, text: `${name} has joined!` })

        activateUser(socket.id, name, room)
        onUserListChange(socket, io, room)
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
            onUserListChange(socket, io, user.room)
        }
    })
})

