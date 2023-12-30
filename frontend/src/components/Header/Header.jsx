import {Link} from "react-router-dom";
import headerLogo from "../../images/logo.svg";
import headerBtn from "../../images/header-interactive-btn.svg";
import closeBtn from "../../images/close-icon.svg";
import {useLocation} from "react-router-dom";

function Header({userEmail, signOut, onInteractiveBtnClick, isOpen}) {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  const onSignOut = () => {
    signOut();
  };

  return (
    <>
      {isOpen && currentPath === "/" && (
        <div className="header__opening-container">
          <h2 className="header__user">{userEmail}</h2>
          <button
            onClick={onSignOut}
            className="header__link header__button"
            to="/sign-in">
            Выйти
          </button>
        </div>
      )}
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="логотип" />
          {currentPath === "/sign-in" && (
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          )}
          {currentPath === "/sign-up" && (
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          )}
          {currentPath === "/" && (
            <>
              <div className="header__user-container">
                <h2 className="header__user">{userEmail}</h2>
                <button
                  onClick={onSignOut}
                  className="header__link header__button"
                  to="/sign-in">
                  Выйти
                </button>
              </div>
              <img
                onClick={onInteractiveBtnClick}
                className="header__interactive-button"
                src={!isOpen ? headerBtn : closeBtn}
                alt="кнопка"
              />
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
