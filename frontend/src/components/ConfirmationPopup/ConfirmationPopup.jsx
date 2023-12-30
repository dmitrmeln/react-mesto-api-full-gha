export default function ConfirmationPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onConfirmation(props.card);
  }

  return (
    <div>
      <div
        onMouseDown={props.onClose}
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form
            className="popup__form"
            name="confirmation-form"
            onSubmit={handleSubmit}
            noValidate>
            <h2 className="popup__heading">Вы уверены?</h2>
            <button type="submit" className="popup__button">
              {props.isLoading ? "Удаление..." : "Да"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
