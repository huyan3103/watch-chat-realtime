import React from 'react'
import './Index.css'
import { useHistory } from 'react-router'
import Header from '../Header/Header'
import { nanoid } from 'nanoid'
import axios from 'axios'

export const Index = () => {
  const [roomCodeTest, setRoomCodeTest] = React.useState('')
  const history = useHistory()

  const handleJoinRoom = async () => {
    try {
      if (roomCodeTest) {
        const response = await axios.post('http://localhost:5000/room/check', {
          roomID: roomCodeTest,
        })
        response.data == 'OK' ? history.push(`/room/${roomCodeTest}`) : console.log(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateRoom = async () => {
    try {
      const roomID = nanoid(12)
      const response = await axios.post('http://localhost:5000/room/create', { roomID })
      response.status === 200 && history.push(`/room/${roomID}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="join-room">
          <input
            type="text"
            placeholder="Mã Phòng"
            value={roomCodeTest}
            onChange={(e) => setRoomCodeTest(e.target.value)}
          ></input>
          <button type="button" onClick={handleJoinRoom}>
            Vào
          </button>
        </div>
        <div className="create-room">
          <button type="button" onClick={handleCreateRoom}>
            Tạo Phòng
          </button>
        </div>
      </div>
    </>
  )
}