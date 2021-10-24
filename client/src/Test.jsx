import React from 'react'
import { useUser, useUserUpdate } from './context/userContext'

const Test = () => {
  const user = useUser()
  const userUpdate = useUserUpdate()

  const test = () => {
    userUpdate(Math.random())
  }

  React.useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div>
      <button type="button" onClick={test}>
        test
      </button>
    </div>
  )
}

export default Test
