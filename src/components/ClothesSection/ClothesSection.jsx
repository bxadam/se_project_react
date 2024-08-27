import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
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
            clothingItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
