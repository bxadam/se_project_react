import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  isLiked,
  onToggleLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes__section">
      <div className="clothes__header">
        <p className="clothes__title">Your Items</p>
        <button onClick={handleAddClick} className="clothes__add-btn">
          + Add New
        </button>
      </div>

      <div>
        <ul className="clothes__section-items">
          {clothingItems &&
            clothingItems
              .filter((item) => item.owner === currentUser._id)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    handleCardClick={handleCardClick}
                    isLiked={isLiked}
                    onToggleLike={onToggleLike}
                    isLoggedIn={isLoggedIn}
                  />
                );
              })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
