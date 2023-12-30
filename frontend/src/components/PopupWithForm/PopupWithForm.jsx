export default function PopupWithForm(props) {
  return (
    <div>
      <div
        onMouseDown={props.onClose}
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <form
            className="popup__form"
            name="edit-form"
            onSubmit={props.handleSubmit}
            noValidate>
            <h2 className="popup__heading">{props.popupHeading}</h2>
            {props.children}
            <button
              disabled={!props.isValid ? true : false}
              type="submit"
              className={
                props.isValid
                  ? "popup__button"
                  : "popup__button popup__button_disabled"
              }>
              {props.isLoading ? props.buttonLoadingText : props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
