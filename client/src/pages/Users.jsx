import React, { useRef, useEffect, useState } from 'react'

import Pagination from '../components/Pagination/Pagination'

import { ADD_USER, LIST_USERS, DELETE_USER, UPDATE_USER } from '../graphql/user'
import Modal from '../components/Modal'
import UserAddForm from '../components/UserAddForm'
import List from '../components/List'
import {useCrud} from "../hooks/CRUD";
import {useList} from "../hooks/list";
import useUser from "../services/user/use";
import {useUserForm} from "../hooks/userForm";

const listSchema = [0, 5, 5, 2]

const Users = () => {
    const [isModalShown, setIsModalShown] = useState(false)
    const [addUser, updateUser, deleteUser, {loadingCrud}] = useCrud(ADD_USER, UPDATE_USER, DELETE_USER)
    const [
        loading,
        error,
        data,
        refetch,
        {skipCount, setSkipCount},
        {paginationLimit}
    ] = useList(LIST_USERS)

    const {email, password, handleSubmit, handleUpdate} = useUserForm(
        async (email, password) => {
            const { data, error } = await addUser({
                variables: { email, password },
            })
            if (error) {
                console.log(error)
                return false
            } else {
                setIsModalShown(false)
                refetch()
                return true
            }
        }, async (email, password, id) => {
            const { data, error } = await updateUser({
                variables: {
                    id,
                    email,
                    password,
                },
            })

            if (error) {
                console.log(error)
                return false
            } else {
                setIsModalShown(false)
                refetch()
                return true
            }
        })

    const handleOnDelete = async (id) => {
        if (window.confirm('Are you sure you want to Delete selected user?')) {
            await deleteUser({ variables: { id } })
            refetch()
        }
    }

    if (!data) return 'Loading...'
    if (error) return 'Something Bad Happened'

    const { users, _usersMeta } = data

    return (
        <React.Fragment>
            <List
                model={users}
                onDelete={handleOnDelete}
                onUpdate={(data) => {handleUpdate(data); setIsModalShown(true) }}
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
                onSave={handleSubmit}
                isShown={isModalShown}
                onCancel={() => setIsModalShown(false)}
                loading={loadingCrud}
            >
                <UserAddForm email={email} password={password} handleSubmit={handleSubmit} />
            </Modal>
        </React.Fragment>
    )
}

export default Users
