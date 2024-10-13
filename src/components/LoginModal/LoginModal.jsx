import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import "./LoginModal.css";

export default function LoginModal({ onClose, isOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  //make a submit handler
  //make a handle email change function
  //pass props through context

  return (
    <ModalWithForm
      buttonText="Login"
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      // onSubmit={handleSubmit}
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
      <button className="modal__login-btn">Or Log In</button>
    </ModalWithForm>
  );
}
