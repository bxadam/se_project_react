import React from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredOptions[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]} &deg;{currentTempUnit}
      </p>
      <img
        src={weatherOptionUrl}
        alt="Weather Image"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
