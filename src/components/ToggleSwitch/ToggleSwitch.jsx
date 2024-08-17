import { useContext, useState } from "react";

import "./ToggleSwitch.css";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

export default function ToggleSwitch() {
  // const [currentTempUnit, setCurrentTempUnit] = useState("F");

  // function handleChange() {
  //   if (currentTempUnit === "C") setCurrentTempUnit("F");
  //   if (currentTempUnit === "F") setCurrentTempUnit("C");
  // }
  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="switch__container">
      <input
        name="switch"
        type="checkbox"
        className="switch__btn"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider-F switch__slider"
            : "switch__slider-C switch__slider"
        }
      />
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}
