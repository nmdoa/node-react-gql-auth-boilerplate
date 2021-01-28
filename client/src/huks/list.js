import React, { useState } from 'react'
import { useQuery } from 'graphql-hooks'

export const useList = (LIST_QUERY, skip = 0, limit = 10) => {
    const [skipCount, setSkipCount] = useState(skip)
    const [paginationLimit, setPaginationLimit] = useState(limit)
    const { loading, error, data, refetch } = useQuery(LIST_QUERY, {
        variables: { skip: skipCount, limit: paginationLimit },
    })

    return [
        loading,
        error,
        data,
        refetch,
        { skipCount, setSkipCount },
        { paginationLimit, setPaginationLimit },
    ]
}
