import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import React from "react";

function Main({
  weatherData,
  handleCardClick,
  handleCardLike,
  clothingItems,
  isLiked,
}) {
  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);

  console.log(clothingItems);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]} &deg;{currentTempUnit} /
          You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isLiked={isLiked}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
