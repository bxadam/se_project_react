import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

export default function AddItemModal({ onClose, onAddItem, isOpen }) {
  const [name, setName] = useState("");

  function handleNameChange() {
    console.log(name);
    setName(name);
  }

  const [link, setLink] = useState("");

  function handleLinkChange() {
    console.log(link);
    setLink(link);
  }

  const [weatherType, setWeatherType] = useState("");

  function handleWeatherTypeChange() {
    console.log(weatherType);
    setWeatherType(weatherType);
  }

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onAddItem}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          autoComplete="off"
          type="text"
          className="modal__input"
          id="name"
          placeholder="name"
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleLinkChange}
        />
      </label>
      <fieldset
        className="modal__radio-buttons"
        onChange={handleWeatherTypeChange}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="hot"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="warm"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
