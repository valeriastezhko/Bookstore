import React from "react";
import favoritesIcon from "./img/icon-heart.svg";
import cartIcon from "./img/icon-cart.svg";
import userIcon from "./img/icon-user.svg";
import styles from "./Header.module.css";
import Typography from "../Typography/Typography";
import Search from "./Search/Search";
import BurgerMenu from "./Burger/BurgerMenu";
import { Link } from "react-router-dom";
import circle from "./img/circle.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getSlice } from "../../store/user/user.selectors";

const Header: React.FC = () => {
  const { isAuth, emailSignIn } = useSelector(getSlice);

  const isCartEmpty = () => {
    const storedCart = localStorage.getItem(`${emailSignIn}-cart`);
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    return cartItems.length === 0;
  };

  const isFavEmpty = () => {
    const storedFav = localStorage.getItem("favorites");
    const favItems = storedFav ? JSON.parse(storedFav) : [];
    return favItems.length === 0;
  };

  const handleReloadClick = () => {
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className={styles.header}>
      <button onClick={handleReloadClick}>
        <Typography
          variant="h2"
          color="primary"
          font={"bebasNeue"}
          children={"BOOKSTORE"}
          onClick={handleReloadClick}
        ></Typography>
      </button>
      <Search type={"text"} placeholder="Search" design="inHeader" value="" />
      <div className={styles.iconsWrapper}>
        <Link to="/favorite" className={styles.favoritesButton}>
          <img
            src={favoritesIcon}
            className={styles.favoritesButtonImg}
            alt="Favorites"
          />
          {!isFavEmpty() && (
            <img src={circle} className={styles.circleCart} alt="circle" />
          )}
        </Link>
        {isAuth && (
          <Link to="/cart" className={styles.cartButton}>
            <img src={cartIcon} alt="Cart" />
            {!isCartEmpty() && (
              <img src={circle} className={styles.circleCart} alt="circle" />
            )}
          </Link>
        )}
        <Link
          to={!isAuth ? "/sign-in" : "/account"}
          className={styles.userButton}
        >
          <img src={userIcon} alt="User" />
        </Link>
        <BurgerMenu />
      </div>
    </div>
  );
};

export default Header;
