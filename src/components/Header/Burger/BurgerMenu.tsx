import React from "react";
import styles from "./BurgerMenu.module.css";
import iconBurger from "../img/icon-burger.svg";
import iconClose from "../img/icon-close.svg";
import Button from "../../Button/Button";
import Search from "../Search/Search";
import { getSlice as getSliceLayout } from "../../../store/layout/layout.selector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { setBurgerState } from "../../../store/layout/layout.reducer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Typography from "../../Typography/Typography";
import { getSlice as getSliceUser } from "../../../store/user/user.selectors";
import { logOut, setCurrentEmail } from "../../../store/user/user.reducer";

const BurgerMenu: React.FC = () => {
  const { burgerIsOpen } = useSelector(getSliceLayout);
  const { isAuth } = useSelector(getSliceUser);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleMenu = () => {
    dispatch(setBurgerState(!burgerIsOpen));
  };

  const hadleClickSignIn = () => {
    navigate("/sign-in");
    dispatch(setBurgerState(!burgerIsOpen));
  };

  const hadleClickLogOut = () => {
    dispatch(logOut(false));
    dispatch(setCurrentEmail(""));
    navigate("/sign-in");
  };

  return (
    <div className={styles.burgerMenu}>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        <img src={iconBurger} alt="Burger" />
      </button>
      {burgerIsOpen && (
        <div className={styles.menuLayout}>
          <div className={styles.menuContent}>
            <div className={styles.menuHeader}>
              <button className={styles.closeButton} onClick={toggleMenu}>
                <img src={iconClose} alt="ToClose" />
              </button>
            </div>
            <div className={styles.menuMain}>
              <Search
                type={"text"}
                placeholder="Search"
                design="inBurger"
                value=""
              />
              {isAuth ? (
                <div className={styles.linksWrapper}>
                  <Link to="/cart" onClick={toggleMenu}>
                    <Typography
                      variant="h3"
                      font="bebasNeue"
                      children={"CART"}
                      className={styles.titleCart}
                    />
                  </Link>
                  <Link to="/favorite" onClick={toggleMenu}>
                    <Typography
                      variant="h3"
                      font="bebasNeue"
                      children={"FAVORITE"}
                      className={styles.titleCart}
                    />
                  </Link>
                  <Link to="/account" onClick={toggleMenu}>
                    <Typography
                      variant="h3"
                      font="bebasNeue"
                      children={"ACCOUNT"}
                      className={styles.titleCart}
                    />
                  </Link>
                  <Button
                    text={"LOG OUT"}
                    className={styles.btnSignIn}
                    onClick={hadleClickLogOut}
                  />
                </div>
              ) : (
                <Button
                  text={"SIGN IN"}
                  className={styles.btnSignIn}
                  onClick={hadleClickSignIn}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
