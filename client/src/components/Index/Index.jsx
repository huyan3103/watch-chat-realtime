import React from 'react'
import './Index.css'
import { useHistory } from 'react-router'
import { nanoid } from 'nanoid'
import axios from 'axios'

const Index = () => {
  const [roomCodeTest, setRoomCodeTest] = React.useState('')
  const history = useHistory()
  const sessionStorage = window.sessionStorage

  const handleJoinRoom = async () => {
    try {
      if (roomCodeTest) {
        const response = await axios.post('http://localhost:5000/room/check', {
          roomID: roomCodeTest,
        })
        if (response.data === 'OK') {
          sessionStorage.setItem('ACTION', 'JOIN')
          history.push(`/room/${roomCodeTest}`)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateRoom = async () => {
    try {
      const roomID = nanoid(12)
      const response = await axios.post('http://localhost:5000/room/create', { roomID })
      if (response.status === 200) {
        sessionStorage.setItem('ACTION', 'CREATE')
        history.push(`/room/${roomID}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col items-center mt-6">
      {/* <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <img src="" alt="" className="h-20 w-20 border border-gray-900"></img>
          <input type="text" className="border border-gray-900 focus:outline-none"></input>
        </div>
        <div className="flex flex-col items-center">
          <span>Tên</span>
          <input type="text" className="border border-gray-900 focus:outline-none"></input>
        </div>
      </div> */}
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
  )
}

export default Index
