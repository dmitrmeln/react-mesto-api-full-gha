import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
          <div onClick={onEditAvatar} className="profile__avatar-icon"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button"></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"></button>
      </section>
      <section className="cards">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
