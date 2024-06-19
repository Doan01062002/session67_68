import React from "react";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Confirm Delete</h4>
        <p>Are you sure you want to delete this record?</p>
        <button onClick={onConfirm}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
