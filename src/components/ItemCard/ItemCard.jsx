import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="item__container">
      <h2 className="item__name">{item.name}</h2>
      <img className="item__image" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
