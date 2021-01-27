import React from 'react'

import { UserContext } from '../services/AuthContext'

const UserInfo = () => {
    const { user } = UserContext()
    return <div>{user ? 'Logged in as ' + user.email : 'Anonymous'}</div>
}

export default UserInfo
