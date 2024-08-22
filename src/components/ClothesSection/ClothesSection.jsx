import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__header">
        <p className="clothes__title">Your Items</p>
        <button className="clothes__add-btn">+ Add New</button>
      </div>

      <div>
        <ul className="clothes__section-items">
          {defaultClothingItems.map((item) => {
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
