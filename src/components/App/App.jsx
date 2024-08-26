import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { coordinates, APIkey, clothingStorage } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("C");
  const [clothingItems, setClothingItems] = useState(clothingStorage);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardDelete = () => {
    setClothingItems(
      clothingItems.filter((item) => item._id !== selectedCard._id)
    );
    closeActiveModal();
  };

  const onAddItem = ({ name, link, weatherType }) => {
    const newClothingItem = { name: name, link: link, weather: weatherType };
    setClothingItems((prevClothingItems) => [
      ...prevClothingItems,
      newClothingItem,
    ]);
    closeActiveModal();
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="profile/"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          buttonText="Add garment"
          title="New garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleCardDelete={handleCardDelete}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
