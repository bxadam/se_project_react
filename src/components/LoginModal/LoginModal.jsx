import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  handleSignUpRoute,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    console.log("login yay");
    onLogin({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ModalWithForm
      buttonText="Log In"
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleLogin}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          required
          value={email}
          autoComplete="off"
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          required
          value={password}
          autoComplete="off"
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </label>
      <button onClick={handleSignUpRoute} className="modal__login-btn">
        Or Sign Up
      </button>
    </ModalWithForm>
  );
}
