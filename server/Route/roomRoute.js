const express = require('express')
const route = express.Router()
const Room = require('../Schema/roomSchema')

route.post('/create', async (req, res) => {
  try {
    const { roomID } = req.body
    const room = new Room({ id: roomID, owner: 'lehuyan' })
    await room.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

route.post('/check', async (req, res) => {
  try {
    const existRoom = await Room.findOne({ id: req.body.roomID })
    existRoom?.currentNumber < existRoom?.totalNumber
      ? res.sendStatus(200)
      : res.status(200).json({ mess: 'Phòng đã đầy' })
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
