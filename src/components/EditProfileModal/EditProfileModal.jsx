import { useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

export default function EditProfileModal({ isOpen, onClose, onProfileSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleProfileSubmit(e) {
    e.preventDefault();
    onProfileSubmit({ name, avatar });
  }

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleProfileSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          required
          value={name}
          autoComplete="off"
          type="text"
          className="modal__input"
          id="name"
          placeholder={currentUser.name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar{" "}
        <input
          required
          value={avatar}
          autoComplete="off"
          type="url"
          className="modal__input"
          id="avatar"
          placeholder={currentUser.avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}
