import "./ItemCard.css";
import heart from "../../assets/heartdefault.png";
import heartActive from "../../assets/heartliked.png";
import { useState } from "react";

function ItemCard({ item, handleCardClick, handleCardLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    handleCardLike(item._id, isLiked).then((res) => {
      setIsLiked(!isLiked);
    });
  };

  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <button
        onClick={handleLike}
        className={`card__like-btn ${isLiked && "card__like-btn_liked"}`}
      ></button>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
