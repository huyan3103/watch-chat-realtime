import React from "react"
import "./Room.css"
import { Chat } from "./Chat"
import { Participant } from "./Participant"
import ReactPlayer from "react-player/youtube"
import io from "socket.io-client"
import { useParams } from "react-router-dom"
const socket = io("localhost:5000", { withCredentials: true })

export const Room = () => {
  const [videoUrl, setVideoUrl] = React.useState("") //
  const [playing, setPlaying] = React.useState(true)
  const [numberParticipant, setNumberParticipant] = React.useState(0)
  const [control, setControl] = React.useState(true)
  const player = React.useRef() //use to access react-player's instance method
  const { id } = useParams()

  //set video url and send url to another clients
  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value.split("&")[0])
    socket.emit("videoUrlChanged", { room: id, url: e.target.value.split("&")[0] })
  }

  // const handleSeek = (e) =>{
  //   console.log(player.current)
  // }

  const handleOnBuffer = () => {
    const currentTime = Math.trunc(player.current.getCurrentTime())
    const loadedTime = Math.trunc(player.current.getSecondsLoaded())
    socket.emit("videoTimeChanged", { room: id, currentTime, loadedTime })
  }

  const setVideoTime = (time) => {
    player.current.seekTo(time, "second")
  }

  // const handlePauseVideo = () => {
  //   console.log(1)
  //   socket.emit("playingStateVideoChanged")
  // }

  // const setVideoPlayingState = () => {
  //   setPlaying(!playing)
  // }

  //Remove event when press shift key make new line in textarea

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(id)
  }

  const handleNumberParticipantChange = (numberClient) => {
    setNumberParticipant(numberClient)
  }

  //Auto scroll to the bottom of the chat box

  //Connect to socket when component mount and disconnect when component unmount
  React.useEffect(() => {
    const ROOMCODE = id
    // setRoomCode(id)
    socket.emit("joinRoom", id)
    socket.on("setVideoUrl", setVideoUrl)
    socket.on("setVideoTime", setVideoTime)
    socket.on("numberParticipantChange", handleNumberParticipantChange)
    // socket.on('setVideoPlayingState', setVideoPlayingState)

    return () => {
      socket.off("setVideoUrl", setVideoUrl)
      socket.off("setVideoTime", setVideoTime)
      socket.emit("leaveRoom", ROOMCODE)
      // socket.off('setVideoPlayingState', setVideoPlayingState)
    }
  }, [id])

  return (
    <>
      <div className="video-chat">
        <div className="video">
          <input type="text" value={videoUrl} onChange={handleVideoUrlChange}></input>
          <ReactPlayer
            ref={player}
            url={videoUrl}
            playing={playing}
            controls={true}
            onBuffer={handleOnBuffer}
            // onPause={handlePauseVideo}
            style={{ backgroundColor: "gray" }}
          />
        </div>
        <div className="chat">
          <div className="control">
            <button className="chat-control" onClick={() => setControl(!control)}>
              Chat
            </button>
            <button className="joiner-control" onClick={() => setControl(!control)}>
              Participant
            </button>
          </div>
          <div className="chat-ui">
            {control ? <Participant /> : <Chat socket={socket} id={id} />}
          </div>
        </div>
      </div>
      <div className="room-code">
        <p>
          Mã Phòng: <span>{id}</span>
        </p>
        <button type="button" onClick={handleCopyRoomCode}>
          Copy Mã
        </button>
      </div>
      <div>
        <p>Số lượng: {numberParticipant}</p>
        <p>Sẵn sàng: </p>
      </div>
    </>
  )
}
