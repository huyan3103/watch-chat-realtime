import React from "react"
import "./Index.css"
import { useHistory } from "react-router"
import { nanoid } from "nanoid"

export const Index = () => {
  const [roomCodeTest, setRoomCodeTest] = React.useState("")
  const history = useHistory()

  const handleJoinRoom = () => {
    roomCodeTest && history.push(`/room/${roomCodeTest}`)
  }

  const handleCreateRoom = () => {
    history.push(`/room/${nanoid(12)}`)
  }

  return (
    <>
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
    </>
  )
}
