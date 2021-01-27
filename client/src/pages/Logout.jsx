import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { earseTokens } from '../services/TokenManager'
import useUser from '../services/user/use'

const Logout = () => {
    const {
        actions: { setUser },
    } = useUser()
    useEffect(() => {
        return () => {
            earseTokens()
            setUser()
        }
    })

    return <Redirect to="/" />
}

export default Logout
