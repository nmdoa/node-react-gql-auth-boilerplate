import React from 'react'
import Button from '../Button'

export const Modal = ({
    isShown,
    title,
    children,
    onCancel,
    onSave,
    loading,
}) => {
    const style = {
        display: isShown ? 'block' : 'none',
    }
    return (
        <div className="modal" style={style} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={onCancel}
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Close
                        </button>
                        {/* <button type="button" className="btn btn-primary" ></button> */}
                        <Button loading={loading} onClick={onSave}>
                            Save changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
