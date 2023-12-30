import successImage from "../../images/auth-success.svg"
import failImage from "../../images/auth-fail.svg"

export default function InfoTooltip(props) {
  return (
    <div>
      <div
        onMouseDown={props.onClose}
        className={`popup popup_type_info ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <img className="popup__success-image"
            src={
              props.isSuccess
                ? successImage
                : failImage
            }
            alt={
              props.isSuccess
                ? "success-image"
                : "fail-image"
            }
          />
          <h2 className="popup__info-heading">
            {props.isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </div>
  );
}
