import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { earseTokens } from '../services/TokenManager'
import { AuthContext } from '../services/AuthContext'

const Logout = () => {
    const { setUser } = useContext(AuthContext)
    useEffect(() => {
        return () => {
            earseTokens()
            setUser()
        }
    })

    return <Redirect to="/" />
}

export default Logout
