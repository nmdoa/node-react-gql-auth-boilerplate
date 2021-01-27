import React, { createContext, useContext } from 'react'

export const AuthContext = createContext()

export const UserContext = () => useContext(AuthContext)

export const checkAuth = ({ authorization, roleType }) => {
    //!TODO IMPLEMENT IT
    let hasRequiredRole = false

    if (authorization.roles) {
        let roles = authorization.roles.map((item) => item.toLowerCase())

        hasRequiredRole = roles.includes(roleType)
    }

    return [hasRequiredRole]
}
