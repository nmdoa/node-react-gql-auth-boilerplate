import React, { useContext } from 'react'
import { useQuery, ClientContext } from 'graphql-hooks'

const SOME_Q = `query {
    goods {
      _id
      name
    }
}`

const Secured = () => {
    const client = useContext(ClientContext)
    const { loading, error, data } = useQuery(SOME_Q)

    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'

    return (
        <ul>
            {data.goods.map(({ _id, name }) => (
                <li key={_id}>{name}</li>
            ))}
        </ul>
    )
}

export default Secured
