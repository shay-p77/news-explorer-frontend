import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onOpenLogin }) {
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

function validateEmailAvailable(email) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return !users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

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

    if (!validateEmailAvailable(form.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "This email is already registered",
      }));
      return;
    }

    onRegister(form);
  }

  useEffect(() => {
    if (isOpen) {
      setForm({ email: "", password: "", username: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
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
            minLength="6"
            placeholder="Enter Password"
          />
          <span className="modal__error-message">{errors.password}</span>
        </label>

        <label>
          Username
          <input
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Enter Username"
          />
          <span className="modal__error-message">{errors.username}</span>
        </label>

        <button
          type="submit"
          className="modal__submit-button"
          disabled={!isValid}
        >
          Sign Up
        </button>

        <p className="modal__switch-text">
          or{" "}
          <button
            type="button"
            className="modal__switch-button"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
          >
            Sign In
          </button>
        </p>
      </>
    </ModalWithForm>
  );
}

export default RegisterModal;
