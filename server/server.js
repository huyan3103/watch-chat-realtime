const express = require("express")
const app = express()
const cors = require("cors")
const { Server } = require("socket.io")

app.use(cors())

app.get("/", (req, res) => {
  res.json("OK")
})

const io = new Server(
  app.listen("5000", () => console.log("Server is running")),
  { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"], credentials: true } },
)

io.on("connection", (socket) => {
  console.log(socket.id)
  // console.log(socket.rooms)
  socket.on("videoUrlChanged", (data) => {
    const { room, url } = data
    socket.to(room).emit("setVideoUrl", url)
  })

  socket.on("videoTimeChanged", ({ room, currentTime, loadedTime }) => {
    if (currentTime != loadedTime) socket.to(room).emit("setVideoTime", currentTime)
  })

  // socket.on("playingStateVideoChanged", () => {
  //   socket.to(room).emit("setVideoPlayingState")
  // })

  socket.on("joinRoom", (room) => {
    socket.join(room)
    const numberClient = io.sockets.adapter.rooms.get(room).size
    io.to(room).emit("numberParticipantChange", numberClient)
  })

  socket.on("leaveRoom", (room) => {
    socket.leave(room)
    const numberClient = io.sockets.adapter.rooms.get(room)?.size
    io.to(room).emit("numberParticipantChange", numberClient)
  })

  socket.on("chatSend", ({ room, username, chat }) => {
    socket.to(room).emit("chatCame", { username, chat })
  })
})
