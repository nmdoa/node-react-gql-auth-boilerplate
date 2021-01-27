import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { UserContext } from '../../services/AuthContext'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    const { user } = UserContext()
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
