import { GraphQLClient } from 'graphql-hooks'
import { buildAxiosFetch } from '@lifeomic/axios-fetch'
import axios from 'axios'

import {
    refreshToken,
    getToken,
    getRefreshToken,
    earseTokens,
    setTokens,
} from './TokenManager'

const gqlAxios = axios.create()
gqlAxios.interceptors.response.use(
    async function (response) {
        // all responses go here except network errors
        if (response.status === 200) {
            return response
        }

        const localRefreshToken = getRefreshToken()

        if (!localRefreshToken) {
            // throw new Error('unauth')
            return 'error'
        }

        if (response.status === 500) {
            const { data, error } = await refreshToken(localRefreshToken)

            if (error) {
                earseTokens()
                return error
            }

            const config = response.config || {}

            const {
                token: newToken,
                refreshToken: newRefresh,
            } = data.refreshToken
            config.headers['Authorization'] = `Bearer ${newToken}`

            setTokens(newToken, newRefresh)

            const prevRequest = axios.request(config)

            return prevRequest
        }
    },
    function (error) {
        return error
    }
)

gqlAxios.interceptors.request.use((config) => {
    const auth = getToken()
    if (auth) {
        config.headers['Authorization'] = `Bearer ${auth}`
    }
    return config
})

const client = new GraphQLClient({
    url: 'http://localhost:3001/graphql',
    fetch: buildAxiosFetch(gqlAxios),
    // fetch: gqlAxios
})

export default client
