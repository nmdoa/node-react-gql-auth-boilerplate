import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import useUser from "../../services/user/use";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    const { state: {user} } = useUser()
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
