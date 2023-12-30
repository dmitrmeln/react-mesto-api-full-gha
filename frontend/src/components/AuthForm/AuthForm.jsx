import {useState} from "react";

export default function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props
      .onSubmit({
        email,
        password,
      })
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className={"authorize"}>
      <form
        className="authorize__form"
        name="login-form"
        onSubmit={handleSubmit}>
        <h2 className="authorize__heading">{props.formHeading}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="authorize__input"
          id="authorize__email"
          name="email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="authorize__error authorize__email-error"></span>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          className="authorize__input"
          id="authorize__password"
          name="password"
          minLength="5"
          maxLength="16"
          required
        />
        <span className="authorize__error authorize__password-error"></span>
        <button type="submit" className="authorize__button">
          {props.submitButtonName}
        </button>
        {props.children}
      </form>
    </div>
  );
}
