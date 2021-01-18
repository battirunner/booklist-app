import React, { useState } from 'react'

const ErrorModal = (props) => {
    // Render nothing if the "show" prop is false
    if (!props.show) {
        return null;
    }
    return (
        <div className="form-modal">
            <div className="notification-modal bg-gray-100">
                <div className="modal-content"> 
                    <h2 className="text-3xl">{props.message[0]}</h2>
                </div>
                <p>{props.message[1]}</p>
                <button
                    onClick={() => {
                        props.close()
                      }}
                    className="notification-btn bg-blue-500 text-white"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default ErrorModal