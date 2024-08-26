import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

export default function AddItemModal({ onClose, onAddItem, isOpen }) {
  const [name, setName] = useState("");

  function handleNameChange(e) {
    console.log(name);
    setName(e.target.value);
  }

  const [link, setLink] = useState("");

  function handleLinkChange(e) {
    console.log(link);
    setLink(e.target.value);
  }

  const [weatherType, setWeatherType] = useState("");

  function handleWeatherTypeChange(e) {
    console.log(e.target.value);
    setWeatherType(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, link, weatherType });
  }

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          autoComplete="off"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
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
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="hot"
            onChange={handleWeatherTypeChange}
            value="hot"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="warm"
            onChange={handleWeatherTypeChange}
            value="warm"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            id="cold"
            onChange={handleWeatherTypeChange}
            value="cold"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
