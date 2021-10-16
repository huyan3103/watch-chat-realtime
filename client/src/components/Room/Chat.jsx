import React from 'react'

export const Chat = ({ socket, id }) => {
  const [messages, setMessages] = React.useState([])
  const [chat, setChat] = React.useState('')
  const boxChat = React.useRef()

  const handleChatCame = ({ username, chat }) => {
    console.log(username, chat)
    setMessages((prevState) => [...prevState, { username, chat }])
  }

  const handleSendMess = (e) => {
    e.preventDefault()
    if (chat) {
      setMessages([...messages, { username: 'An', chat }])
      socket.emit('chatSend', { room: id, username: 'An', chat })
      setChat('')
    }
  }

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMess(e)
    }
  }

  React.useEffect(() => {
    boxChat.current.scrollTop = boxChat.current.scrollHeight - boxChat.current.clientHeight
  }, [messages])

  React.useEffect(() => {
    socket.on('chatCame', handleChatCame)
    return () => {
      socket.off('chatCame', handleChatCame)
    }
  }, [])

  return (
    <>
      <div className="messages" ref={boxChat}>
        {messages.map((message, index) => {
          return (
            <p className="chat-content" key={index}>
              {message.username}: {message.chat}
            </p>
          )
        })}
      </div>
      <div className="form">
        <form onSubmit={handleSendMess}>
          <textarea
            value={chat}
            maxLength="70"
            spellCheck="false"
            onChange={(e) => setChat(e.target.value)}
            onKeyPress={handleChatKeyPress}
          ></textarea>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </>
  )
}
