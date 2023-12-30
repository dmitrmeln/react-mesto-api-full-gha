export default function ImagePopup({card, isOpen, onClose}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__image-container">
          <button type="button" className="popup__close-button"></button>
          <figure className="popup__image-figure">
            <img src={card.src} className="popup__image" alt={card.title} />
            <figcaption className="popup__image-caption">{card.title}</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}
