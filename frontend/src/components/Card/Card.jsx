import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      {isOwn && <button className="card__trash" onClick={handleDeleteClick} />}
      <img
        onClick={handleClick}
        src={card.link}
        className="card__image"
        alt={card.name}
        id={card._id}
      />
      <div className="card__bottom">
        <h2 className="card__heading">{card.name}</h2>
        <div className="card__like-contaier">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
