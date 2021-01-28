import React, { useEffect } from 'react'
import { useMutation } from 'graphql-hooks'

export const useCrud = (ADD_MUTATION, UPDATE_MUTATION, DELETE_MUTATION) => {
    const [addMutation, { loading: loadingAdd }] = useMutation(ADD_MUTATION)
    const [updateMutation, { loading: loadingUpdate }] = useMutation(
        UPDATE_MUTATION
    )
    const [deleteMutation, { loading: loadingDelete }] = useMutation(
        DELETE_MUTATION
    )

    return [
        addMutation,
        updateMutation,
        deleteMutation,
        { loading: loadingAdd || loadingUpdate || loadingDelete },
    ]
}
