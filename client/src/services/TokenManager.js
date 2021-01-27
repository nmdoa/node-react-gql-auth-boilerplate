import { GraphQLClient } from 'graphql-hooks'

import { REFRESH_TOKEN, LOGIN_USER } from '../graphql/user'

const client = new GraphQLClient({
    url: 'http://localhost:3001/graphql',
})

export const refreshToken = async (token) => {
    return await client.request({
        query: REFRESH_TOKEN,
        variables: {
            token: token,
        },
    })
}

export const sendLogin = async (email, password) => {
    return await client.request({
        query: LOGIN_USER,
        variables: { email, password },
    })
}

export const isAuthenticated = () => {
    return localStorage.getItem('auth') ? true : false
}

export const getToken = () => {
    return localStorage.getItem('auth')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refresh')
}

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userInfo'))
}

export const setUserInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export const earseTokens = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('refresh')
    localStorage.removeItem('userInfo')
}

export const setTokens = (auth, refresh) => {
    localStorage.setItem('auth', auth)
    localStorage.setItem('refresh', refresh)
}
