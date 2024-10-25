import "./ItemCard.css";

function ItemCard({
  item,
  handleCardClick,
  onToggleLike,
  isLoggedIn,
  likedItems,
}) {
  const isLiked = Boolean(likedItems[item._id]);
  const handleLike = () => {
    onToggleLike(item._id);
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
