import React from 'react'

export const Button = ({ loading, children, ...rest }) => {
    return (
        <div>
            {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Loading...
                </button>
            ) : (
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" {...rest}>
                        {children}
                    </button>
                </div>
            )}
        </div>
    )
}
