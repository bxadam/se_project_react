import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, handleCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwner ? "modal__delete-btn" : "modal__delete-btn_hidden"
  }`;
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close modal__close_type_image"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            onClick={handleCardDelete}
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
