import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, createItems, deleteItems } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";

import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import { signUp, signIn, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("C");
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    console.log("closed");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardDelete = () => {
    deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((error) => console.error(error));
  };

  const onAddItem = ({ name, imageUrl, weather }) => {
    const newClothingItem = {
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    };
    createItems(newClothingItem)
      .then((card) => {
        setClothingItems([card, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const onRegister = ({ name, email, password, avatar }) => {
    const userProfile = { name, email, password, avatar };
    signUp(userProfile).then((res) => {
      console.log(res);
      signIn({ email, password });
      setIsLoggedIn(true);
      closeActiveModal();
      navigate("/profile");
    });
  };

  const onLogin = ({ email, password }) => {
    if (!{ email, password }) {
      return;
    }
    signIn({ email, password }).then((res) => {
      console.log(res);
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      checkToken()
        .then((user) => {
          setCurrentUser(user.data);
          closeActiveModal();
        })
        .catch((err) => console.error(err));
      navigate("/profile");
    });
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(() => {
        console.log("Error fetching items");
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    checkToken().then((res) => {
      setCurrentUser(res.data);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleSignClick={handleSignClick}
              handleLoginClick={handleLoginClick}
            />

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
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
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
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            handleCardDelete={handleCardDelete}
          />
        </CurrentTempUnitContext.Provider>
        <RegisterModal
          isOpen={activeModal === "signup"}
          onClose={closeActiveModal}
          onRegister={onRegister}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={onLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
