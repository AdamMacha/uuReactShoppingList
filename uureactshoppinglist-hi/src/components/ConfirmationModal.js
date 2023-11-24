import React from 'react';
import "./css/ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal1">
      <div className="modal1-content">
        <p>{message}</p>
        <div className="modal1-buttons">
          <button className="button-cancel" onClick={onCancel}>
            Zrušit
          </button>
          <button className="button-confirm" onClick={onConfirm}>
            Potvrdit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
