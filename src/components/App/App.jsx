import { useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
