import React, { useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import {Redirect} from 'react-router-dom'

// import { loginUser, useAuthState, useAuthDispatch } from '../context'

import './Auth.css'
import { setTokens, setUserInfo } from '../services/TokenManager'
import { LOGIN_USER } from '../graphql/user'

import useUser from "../services/user/use";
import Button from '../components/Button'

const Auth = (props) => {
    const referer = (props.location && props.location.state && props.location.state.from) || '/';
    const { state:{user}, actions:{setUser} } = useUser()
    const [loginUser, { loading }] = useManualQuery(LOGIN_USER)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [formError, setFormError] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()
        setFormError(false)
        const { data, error } = await loginUser({
            variables: { email, password },
        })
        if (error) {
            setFormError(true)
        } else {
            const { token, refreshToken, email } = data.login
            setUser({
                email: email,
            })
            setUserInfo({
                email: email,
            })
            setTokens(token, refreshToken)

        }
    }

    let formClassNames = 'form-control'
    formError && (formClassNames += ' is-invalid')

    if(user) return (<Redirect to={referer} />);

    return (
        <div className="container-sm login">
            <form
                className="border border-primary m-3 p-3 needs-validation"
                onSubmit={handleLogin}
            >
                <div className="mb-3 row">
                    <label
                        htmlFor="staticEmail"
                        className="col-sm-2 col-form-label"
                    >
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className={formClassNames}
                            id="staticEmail"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="inputPassword"
                        className="col-sm-2 col-form-label"
                    >
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            autoComplete="current-password"
                            type="password"
                            className={formClassNames}
                            id="inputPassword"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="invalid-feedback">
                            invalid email or password
                        </div>
                    </div>
                </div>
                <Button loading={loading}>Login</Button>
            </form>
        </div>
    )
}

export default Auth
