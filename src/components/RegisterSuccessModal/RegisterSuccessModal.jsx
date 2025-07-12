import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterSuccessModal({ isOpen, onClose, onOpenLogin }) {
  return (
    <ModalWithForm
      name="registersuccessmodal"
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => {
        e.preventDefault();
        onOpenLogin();
      }}
    >
      <>
        <button type="submit" className="modal__success-button">
          Sign In
        </button>
      </>
    </ModalWithForm>
  );
}

export default RegisterSuccessModal;
