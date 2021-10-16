const express = require("express")
const route = express.Router()
const Room = require("../Schema/roomSchema")

route.post("/create", async (req, res) => {
  try {
    const { roomID } = req.body
    const room = new Room({ id: roomID, owner: "lehuyan" })
    await room.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
  }
})

module.exports = route
