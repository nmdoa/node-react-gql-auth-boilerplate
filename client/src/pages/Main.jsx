import React, { Fragment, useContext } from 'react'
import { ClientContext } from 'graphql-hooks'
import Modal from '../components/Modal'

const Main = () => {
    const client = useContext(ClientContext)
    return (
        <Fragment>
            <div>main</div>
            <Modal isShown={false} />
        </Fragment>
    )
}

export default Main
