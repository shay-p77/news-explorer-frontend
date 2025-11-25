import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal__overlay" onClick={handleOverlayClick}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>

        <h2 className="modal__title">{title}</h2>

        <form
          className="modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(e);
          }}
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
