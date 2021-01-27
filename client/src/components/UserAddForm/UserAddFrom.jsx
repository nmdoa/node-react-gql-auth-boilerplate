import React from 'react'

export const UserAddForm = ({ emailRef, passwordRef }) => {
    return (
        <form className="needs-validation">
            <div className="mb-3 row">
                <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                >
                    Email
                </label>
                <div className="col-sm-10">
                    <input
                        autoComplete="username"
                        type="text"
                        className="form-control"
                        id="staticEmail"
                        required
                        ref={emailRef}
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
                        className="form-control"
                        id="inputPassword"
                        required
                        ref={passwordRef}
                    />
                    <div className="invalid-feedback">
                        invalid email or password
                    </div>
                </div>
            </div>
        </form>
    )
}
