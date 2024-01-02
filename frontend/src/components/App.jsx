import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import {api} from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup/ConfirmationPopup";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import * as mestoAuth from "../utils/mestoAuth";
import {Routes, Route, Navigate, useNavigate, Link} from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRout/ProtectedRout";
import AuthForm from "./AuthForm/AuthForm";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupState] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipState] = useState(false);
  const [authorizeState, setAuthorizeState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({name: "", about: ""});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [isUserInfoOpen, setIsUserInfoState] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  function auth(jwt) {
    if (jwt) {
      return mestoAuth
        .tokenCheck(jwt)
        .then(() => {
          navigate("/");
          setloggedIn(true)
        })
        .catch((error) => {
          console.log(error);
          setloggedIn(false);
        });
    }
  }

  function handleLogin({email, password}) {
    return mestoAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setloggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setInfoTooltipState(true);
        setAuthorizeState(false);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setloggedIn(false);
    navigate("/sign-in");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    auth(jwt);
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      api
      .getUserInfo()
      .then((result) => {
        setCurrentUser(result);
        setUserEmail(result.email);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      api
      .getCardList()
      .then((result) => {
        setCards(result.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        changeAllPopupsState();
      }
    }

    if (
      [
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        isConfirmationPopupOpen,
        isImagePopupOpen,
        isInfoTooltipOpen,
      ].some((state) => {
        return state === true;
      })
    ) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isConfirmationPopupOpen,
    isImagePopupOpen,
    isInfoTooltipOpen,
  ]);

  function changeAllPopupsState() {
    setEditAvatarPopupState(false);
    setAddPlacePopupState(false);
    setEditProfilePopupState(false);
    setImagePopupState(false);
    setConfirmationPopupState(false);
    setInfoTooltipState(false);
  }

  function closeAllPopups(evt) {
    if (evt.target.classList.contains("popup__close-button")) {
      changeAllPopupsState();
    }

    if (evt.target.classList.contains("popup_opened")) {
      changeAllPopupsState();
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      id: card._id,
      src: card.link,
      title: card.name,
    });
    setImagePopupState(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        changeAllPopupsState();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setConfirmationPopupState(true);
    setSelectedCard({
      id: card._id,
      src: card.link,
      title: card.name,
    });
  }

  function handleConfirmationSubmit(selectedCard) {
    setIsLoading(true);
    api
      .deleteCard(selectedCard.id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard.id));
        setConfirmationPopupState(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({email, password}) {
    return mestoAuth
      .register(email, password)
      .then((res) => {
        setAuthorizeState(true);
        setInfoTooltipState(true);
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log(error);
        setAuthorizeState(false);
        setInfoTooltipState(true);
      });
  }

  function handleInteractiveBtnClick() {
    setIsUserInfoState(!isUserInfoOpen)
  }
    
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onInteractiveBtnClick={handleInteractiveBtnClick}
          userEmail={userEmail}
          signOut={signOut}
          isOpen={isUserInfoOpen}
        />
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                userEmail={userEmail}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <AuthForm
                formHeading="Регистрация"
                submitButtonName="Зарегистрироваться"
                onSubmit={handleRegister}>
                <Link className="authorize__login-link" to="/sign-in">
                  Уже зарегистрированы? Войти
                </Link>
              </AuthForm>
            }
          />
          <Route
            path="/sign-in"
            element={
              <AuthForm
                submitButtonName="Войти"
                formHeading="Вход"
                onSubmit={handleLogin}
              />
            }
          />
        </Routes>
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
        onConfirmation={handleConfirmationSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={authorizeState}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
