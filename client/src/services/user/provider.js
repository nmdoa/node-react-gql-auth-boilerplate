import React, { useState } from 'react'
import UserContext from './context'
import { getUserInfo } from '../TokenManager'

function UserProvider({ children }) {
    const [user, setUser] = useState(getUserInfo())
    const value = {
        state: { user },
        actions: { setUser },
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
