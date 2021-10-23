const express = require('express')
const route = express.Router()
const Room = require('../Schema/roomSchema')

route.post('/create', async (req, res) => {
  try {
    const { roomID } = req.body
    const room = new Room({
      id: roomID,
      owner: 'lehuyan',
      participants: [
        {
          username: 'lehuyan',
          url: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
        },
      ],
    })
    await room.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

route.post('/join', async (req, res) => {
  try {
    const existRoom = await Room.findOne({ id: req.body.roomID })
    if (existRoom?.currentNumber < existRoom?.totalNumber)
      res.status(200).json({ mess: 'Phòng đã đầy' })
    else {
      existRoom.participants = [
        ...existRoom.participants,
        { username: req.body.username, url: req.body.url },
      ]
      await existRoom.save()
      res.sendStatus(200)
    }
  } catch (err) {
    console.log(err)
  }
})

route.get('/:id', async (req, res) => {
  try {
    const existRoom = await Room.findOne({ id: req.params.id })
    res.status(200).json({ participants: existRoom.participants, videoUrl: existRoom.videoUrl })
  } catch (err) {
    console.log(err)
  }
})

route.post('/:id', async (req, res) => {
  try {
    await Room.updateOne({ id: req.params.id }, { videoURL: req.body.videoUrl })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

module.exports = route
