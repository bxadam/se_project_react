import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({
  item,
  handleCardClick,
  onToggleLike,
  isLoggedIn,
  likedItems,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const handleLike = () => {
    onToggleLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      {isLoggedIn && (
        <button
          onClick={handleLike}
          className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
        ></button>
      )}
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
