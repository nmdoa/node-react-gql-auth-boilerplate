import React, { useRef, useEffect, useState } from 'react'
import { useQuery, useMutation, useManualQuery } from 'graphql-hooks'

import Pagination from '../components/Pagination/Pagination'

import { ADD_USER, LIST_USERS, DELETE_USER, UPDATE_USER } from '../graphql/user'
import Modal from '../components/Modal'
import UserAddForm from '../components/UserAddForm'
import List from '../components/List'
import {useCrud} from "../huks/CRUD";
import {useList} from "../huks/list";

const listSchema = [0, 5, 5, 2]

const Users = () => {
    const [addUser, updateUser, deleteUser, {loadingCrud}] = useCrud(ADD_USER, UPDATE_USER, DELETE_USER)
    const [
        loading,
        error,
        data,
        refetch,
        {skipCount, setSkipCount},
        {paginationLimit}
    ] = useList(LIST_USERS)

    const [isModalShown, setIsModalShown] = useState(false)
    const [updatingId, setUpdatingId] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleOnDelete = async (id) => {
        if (window.confirm('Are you sure you want to Delete selected user?')) {
            await deleteUser({ variables: { id } })
            refetch()
        }
    }

    const onUpdate = (object) => {
        setUpdatingId(object._id)
        emailRef.current.value = object.email
        setIsModalShown(true)
    }

    const handleUpdate = async () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value

        emailRef.current.value = ''
        passwordRef.current.value = ''

        const { data, error } = await updateUser({
            variables: {
                id: updatingId,
                email,
                password,
            },
        })

        if (error) {
            console.log(error)
        } else {
            setIsModalShown(false)
            refetch()
        }
    }

    const handleSave = async () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value

        emailRef.current.value = ''
        passwordRef.current.value = ''

        const { data, error } = await addUser({
            variables: { email, password },
        })
        if (error) {
            console.log(error)
        } else {
            const createdUser = {
                email: email,
                password: null,
                _id: data.createUser._id,
            }
            setIsModalShown(false)
            refetch()
        }
    }

    if (!data) return 'Loading...'
    if (error) return 'Something Bad Happened'

    const { users, _usersMeta } = data
    // const areMore = users.length < _usersMeta.count

    return (
        <React.Fragment>
            <List
                model={users}
                onDelete={handleOnDelete}
                onUpdate={onUpdate}
                schema={listSchema}
            />
            <div className="row">
                <div className="col-6 d-flex">
                    <Pagination
                        total={_usersMeta.count}
                        skip={skipCount}
                        limit={paginationLimit}
                        onPageChanged={(page) =>
                            setSkipCount((page - 1) * paginationLimit)
                        }
                    />
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-outline-primary btn"
                        onClick={() => {
                            setUpdatingId(false)
                            setIsModalShown(true)
                        }}
                    >
                        Add user
                    </button>
                </div>
            </div>
            <Modal
                id="UserAddModal"
                title="Add New User"
                onSave={() => {
                    updatingId ? handleUpdate() : handleSave()
                }}
                isShown={isModalShown}
                onCancel={() => setIsModalShown(false)}
                loading={loadingCrud}
            >
                <UserAddForm emailRef={emailRef} passwordRef={passwordRef} />
            </Modal>
        </React.Fragment>
    )
}

export default Users
