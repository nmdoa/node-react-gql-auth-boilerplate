import React from 'react'

export const CRUDButtons = ({ object, onDelete, onUpdate }) => {
    return (
        <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Basic example"
        >
            <button type="button" className="btn btn-outline-info">
                view
            </button>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onUpdate({ id: object._id, email:object.email, password:object.password})}
            >
                edit
            </button>
            <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDelete(object._id)}
            >
                delete
            </button>
        </div>
    )
}
