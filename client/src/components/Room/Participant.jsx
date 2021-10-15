import React from "react"
import "./Room.css"

export const Participant = () => {
  const [users, setUsers] = React.useState([])
  return (
    <div className="participant">
      {users.map((user) => {
        return (
          <div className="user">
            <div className="avatar">
              <img alt={`${user.name} avatar`} src={user.avatar}></img>
            </div>
            <div className="name">{user.name}</div>
          </div>
        )
      })}
    </div>
  )
}
