import React from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]} &deg;{currentTempUnit}
      </p>
      <img src={sunny} alt="Weather Image" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
