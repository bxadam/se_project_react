import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleCardDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
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
          <button onClick={handleCardDelete} className="modal__delete-btn">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
