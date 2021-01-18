import React, { useState } from 'react'

const ConfirmationModal = (props) => {
    // Render nothing if the "show" prop is false
    if (!props.show) {
        return null;
    }
    return (
        <div className="form-modal">
            <div className="notification-modal bg-gray-100">
                <div className="modal-content"> 
                    <h2 className="text-3xl">Are you sure?</h2>
                </div>
                <button
                    onClick={() => {
                        props.confirmdelete(props.deleteId)
                      }}
                    className="notification-btn bg-red-500 text-white"
                >
                    Yes
                </button>
                <button
                    onClick={() => {
                        props.close(false)
                      }}
                    className="notification-btn bg-blue-500 text-white"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ConfirmationModal