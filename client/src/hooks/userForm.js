import React, { useState } from 'react'
import { useInput } from './input'

export const useUserForm = (callbackAdd, callbackUpdate) => {
    const [id, setId] = useState()
    const email = useInput('')
    const password = useInput('')

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault()
        }
        if (id) {
            if (callbackUpdate(email.value, password.value, id)) {
                email.reset()
                password.reset()
            }
        } else {
            if (callbackAdd(email.value, password.value)) {
                email.reset()
                password.reset()
            }
        }

        setId(undefined)
    }
    const handleUpdate = (data) => {
        setId(data.id)
        email.setValue(data.email)
        password.setValue('')
    }

    return {
        email,
        password,
        handleSubmit,
        handleUpdate,
    }
}
