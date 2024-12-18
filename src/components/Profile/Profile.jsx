import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  onSignOut,
  handleEditProfileClick,
  isLiked,
  onToggleLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onSignOut={onSignOut}
          onEditProfileData={handleEditProfileClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          isLiked={isLiked}
          onToggleLike={onToggleLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}
