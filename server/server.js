require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const { Server } = require('socket.io')
const accountRoute = require('./Route/accountRoute')
const roomRoute = require('./Route/roomRoute')
// console.log(process.env.DB_STRING)

mongoose.connect('mongodb://localhost:27017/watch-chat-realtime', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors({ origin: '*' }))
app.use(express.json())

// app.get("/", (req, res) => {
//   res.json("OK")
// })

const io = new Server(
  app.listen('5000', () => console.log('Server is running')),
  { cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true } }
)

io.on('connection', (socket) => {
  socket.on('videoUrlChanged', (data) => {
    const { room, url } = data
    socket.to(room).emit('setVideoUrl', url)
  })

  socket.on('videoTimeChanged', ({ room, currentTime, loadedTime }) => {
    if (currentTime != loadedTime) socket.to(room).emit('setVideoTime', currentTime)
  })

  // socket.on("playingStateVideoChanged", () => {
  //   socket.to(room).emit("setVideoPlayingState")
  // })

  socket.on('joinRoom', ({ room, username }) => {
    socket.join(room)
    const numberClient = io.sockets.adapter.rooms
    io.to(room).emit('participantChange', {
      action: 'join',
      username,
      url: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
    })
  })

  socket.on('leaveRoom', ({ room, username }) => {
    socket.leave(room)
    const numberClient = io.sockets.adapter.rooms.get(room)?.size
    io.to(room).emit('participantChange', {
      action: 'leave',
      username,
    })
  })

  socket.on('chatSend', ({ room, username, chat }) => {
    socket.to(room).emit('chatCame', { username, chat })
  })
})

app.use('/account', accountRoute)
app.use('/room', roomRoute)
