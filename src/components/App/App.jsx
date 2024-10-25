import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Footer from "../Footer/Footer";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  createItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import { signUp, signIn, getUserProfile, editProfile } from "../../utils/auth";

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
  const [likedItems, setLikedItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignUpRoute = () => {
    setActiveModal("signup");
  };

  const handleLoginRoute = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    console.log("closed");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  console.log(likedItems);

  const handleCardLike = (_id) => {
    const token = localStorage.getItem("jwt");
    const isLiked = Boolean(likedItems[_id]);
    return !isLiked
      ? addCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
          setLikedItems((prev) => ({
            ...prev,
            [_id]: true,
          }));
        })
      : removeCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
          setLikedItems((prev) => ({
            ...prev,
            [_id]: false,
          }));
        });
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
    setIsLoading(true);
    const newClothingItem = {
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    };
    createItems(newClothingItem)
      .then((card) => {
        setIsLoading(false);
        setClothingItems([card, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const onRegister = ({ name, email, password, avatar }) => {
    setIsLoading(true);
    const userProfile = { name, email, password, avatar };
    signUp(userProfile)
      .then(() => {
        setCurrentUser(userProfile);
        signIn({ email, password });
        setIsLoggedIn(true);
        setIsLoading(false);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => console.error(error));
  };

  const onLogin = ({ email, password }) => {
    setIsLoading(true);
    if (!{ email, password }) {
      return;
    }
    return signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        setIsLoading(false);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => console.error(error));
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  const onProfileSubmit = ({ name, avatar }) => {
    setIsLoading(true);
    editProfile({ name, avatar })
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        closeActiveModal();
      })
      .catch((error) => console.error(error));
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
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile().then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

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
                    onToggleLike={handleCardLike}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
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
                      onSignOut={onSignOut}
                      handleEditProfileClick={handleEditProfileClick}
                      onToggleLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
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
            isLoading={isLoading}
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
          handleLoginRoute={handleLoginRoute}
          isLoading={isLoading}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={onLogin}
          handleSignUpRoute={handleSignUpRoute}
          isLoading={isLoading}
        />

        <EditProfileModal
          isOpen={activeModal === "edit"}
          onClose={closeActiveModal}
          onProfileSubmit={onProfileSubmit}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
