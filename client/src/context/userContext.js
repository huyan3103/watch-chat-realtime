import React, { useContext, useState } from 'react'
const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function useUserUpdate() {
  return useContext(UserUpdateContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: '',
    imageURL:
      'https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1635064831~hmac=bc005f80d9d249d428fe7022e2f4161c',
    owner: false,
  })
  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>{children}</UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}
