import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {useEffect} from "react";
import {useFormAndValidation} from "../../hooks/useFormAndValidation";

export default function EditAvatarPopup(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({link: ""});
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: values.link,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      handleSubmit={handleSubmit}
      popupHeading="Обновить аватар"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isLoading={props.isLoading}
      isValid={isValid}>
      <input
        type="url"
        value={values.link || ''}
        onChange={handleChange}
        className={
          !errors.link ? "popup__input" : "popup__input popup__input_type_error"
        }
        id="popup__avatar-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error">{errors.link}</span>
    </PopupWithForm>
  );
}
