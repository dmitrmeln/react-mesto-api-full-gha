import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useEffect} from "react";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

export default function AddPlacePopup(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({name: "", link: ""});
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      handleSubmit={handleSubmit}
      popupHeading="Новое место"
      buttonText="Создать"
      buttonLoadingText="Создание..."
      isLoading={props.isLoading}
      isValid={isValid}>
      <input
        type="text"
        onChange={handleChange}
        className={
          !errors.name ? "popup__input" : "popup__input popup__input_type_error"
        }
        id="popup__card-name"
        name="name"
        value={values.name || ""}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error popup__card-name-error">{errors.name}</span>
      <input
        type="url"
        onChange={handleChange}
        className={
          !errors.link ? "popup__input" : "popup__input popup__input_type_error"
        }
        id="popup__card-link"
        name="link"
        value={values.link || ""}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup__card-link-error">{errors.link}</span>
    </PopupWithForm>
  );
}
