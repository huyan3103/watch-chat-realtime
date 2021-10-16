import React from "react"
import "./Room.css"

export const Participant = ({ participants }) => {
  console.log(participants)
  return (
    <div className="participant">
      {participants.map((user, index) => {
        return (
          <div className="user" key={index}>
            <div className="avatar">
              <img alt={`${user.username} avatar`} src={user.url}></img>
            </div>
            <div className="name">{user.username}</div>
          </div>
        )
      })}
    </div>
  )
}
