import React from "react";

const CurrentTempUnitContext = React.createContext({
  currentTempUnit: "F",
  handleToggleSwitchChange: () => {},
});

export { CurrentTempUnitContext };
