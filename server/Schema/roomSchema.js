const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema({
  id: {
    type: String,
    require,
  },
  totalNumber: {
    type: Number,
    default: 4,
  },
  currentNumber: {
    type: Number,
    default: 1,
  },
  owner: String,
  videoURL: String,
  participants: [Object],
})

const Room = mongoose.model('room', roomSchema)
module.exports = Room
