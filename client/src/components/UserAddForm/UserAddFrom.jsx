import React from 'react'

export const UserAddForm = ({ email, password, handleSubmit }) => {
    return (
        <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="mb-3 row">
                <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                >
                    Email
                </label>
                <div className="col-sm-10">
                    <input
                        autoComplete="email"
                        name="email"
                        type="text"
                        className="form-control"
                        id="staticEmail"
                        required
                        {...email.bind}
                        // value={inputs.email}
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
                        name="password"
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        required
                        {...password.bind}
                    />
                    <div className="invalid-feedback">
                        invalid email or password
                    </div>
                </div>
            </div>
        </form>
    )
}
