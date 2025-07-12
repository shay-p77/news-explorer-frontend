import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onOpenRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value, validationMessage } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    const formEl = e.target.closest("form");
    if (formEl) setIsValid(formEl.checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onLogin(form);
  }

  useEffect(() => {
    if (isOpen) {
      setForm({ email: "", password: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter Email"
          />
          <span className="modal__error-message">{errors.email}</span>
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter Password"
          />
          <span className="modal__error-message">{errors.password}</span>
        </label>

        <button
          type="submit"
          className="modal__submit-button"
          disabled={!isValid}
        >
          Sign In
        </button>

        <p className="modal__switch-text">
          or{" "}
          <button
            type="button"
            className="modal__switch-button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
          >
            Sign Up
          </button>
        </p>
      </>
    </ModalWithForm>
  );
}

export default LoginModal;
