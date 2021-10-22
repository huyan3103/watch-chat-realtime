import React from 'react'
import './Room.css'
import { Chat } from './Chat'
import { Participant } from './Participant'
import ReactPlayer from 'react-player/youtube'
import io from 'socket.io-client'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const socket = io('localhost:5000', { withCredentials: true })

export const Room = () => {
  const [videoUrl, setVideoUrl] = React.useState('') //
  const [playing, setPlaying] = React.useState(true)
  const [participants, setParticipants] = React.useState([])
  const [control, setControl] = React.useState(true)
  const player = React.useRef() //use to access react-player's instance method
  const { id } = useParams()
  const testUsername = React.useRef(`An ${Math.floor(Math.random() * 21)}`)

  //set video url and send url to another clients
  const handleVideoUrlChange = async (e) => {
    setVideoUrl(e.target.value.split('&')[0])
    const response = await axios.post(`http://localhost:5000/room/${id}`, {
      videoUrl: e.target.value.split('&')[0],
    })
    response.status === 200 &&
      socket.emit('videoUrlChanged', { room: id, url: e.target.value.split('&')[0] })
  }

  const handleOnBuffer = () => {
    const currentTime = Math.trunc(player.current.getCurrentTime())
    const loadedTime = Math.trunc(player.current.getSecondsLoaded())
    socket.emit('videoTimeChanged', { room: id, currentTime, loadedTime })
  }

  const pauseVideo = () => {
    setPlaying(false)
  }

  const setVideoTime = (time) => {
    player.current.seekTo(time, 'second')
  }

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(id)
  }

  const handleParticipantsChange = ({ action, username, url }) => {
    action === 'join'
      ? setParticipants((prevState) => [...prevState, { username, url }])
      : setParticipants((prevState) => prevState.filter((user) => user.username !== username))
  }

  const getRoomData = async () => {
    const response = await axios.get(`htpp://localhost:5000/room/${id}`)
    setParticipants(response.data.participants)
    setVideoUrl(response.data.videoUrl)
  }

  //Connect to socket when component mount and disconnect when component unmount
  React.useEffect(() => {
    const ROOMCODE = id
    // setRoomCode(id)
    socket.emit('joinRoom', { room: id, username: testUsername.current })
    socket.on('setVideoUrl', setVideoUrl)
    socket.on('setVideoTime', setVideoTime)
    socket.on('participantChange', handleParticipantsChange)
    socket.on('pauseVideo', pauseVideo)
    // socket.on('setVideoPlayingState', setVideoPlayingState)

    return () => {
      socket.off('setVideoUrl', setVideoUrl)
      socket.off('setVideoTime', setVideoTime)
      socket.emit('leaveRoom', { ROOMCODE, username: testUsername.current })
      testUsername.current = ''
      // socket.off('setVideoPlayingState', setVideoPlayingState)
    }
  }, [id])

  return (
    <>
      <div className="video-chat pt-6">
        <div className="video">
          <input
            className="border border-gray-900 focus:outline-none px-1"
            type="text"
            value={videoUrl}
            onChange={handleVideoUrlChange}
          ></input>
          <ReactPlayer
            ref={player}
            url={videoUrl}
            playing={playing}
            controls={true}
            onBuffer={handleOnBuffer}
            // onPause={handleOnPause}
            style={{ backgroundColor: 'gray' }}
          />
        </div>
        <div className="chat">
          <div className="control">
            <button className="chat-control" onClick={() => setControl(false)}>
              Chat
            </button>
            <button className="joiner-control" onClick={() => setControl(true)}>
              Participants
            </button>
          </div>
          <div className="chat-ui">
            {control ? (
              <Participant participants={participants} />
            ) : (
              <Chat socket={socket} id={id} />
            )}
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
        <p>Số lượng: {participants.length}</p>
        <p>Sẵn sàng: </p>
      </div>
    </>
  )
}
