import React from 'react'
import { createContext,useState } from 'react'

export const UserDataContext = createContext()
const UserContext = ({children}) => {

    const [userData, setUserData] = useState({
        email: '',
        fullName: {
            
            FirstName: '',
            LastName: ''
        }})
  return (
    <div>
        <UserDataContext.Provider value={[userData, setUserData]}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext