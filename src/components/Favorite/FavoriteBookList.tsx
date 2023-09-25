import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBack from "../ArrowBack/ArrowBack";
import Typography from "../Typography/Typography";
import styles from "./FavoriteBookList.module.css";
import { getRandomColor } from "../../utils/randomColor";
import { IBookCard } from "../../models/bookCard.model";
import redHeart from "../BookDetail/img/redHeart.svg";
import RatingStars from "../RatingStars/RatingStars";
import PopularBooks from "../PopularBooks/PopularBooks";
import { Snackbar } from "@mui/material";

const FavoriteBooksList = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [favorites, setFavorites] = useState<IBookCard[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    document.title = "Favorites";
  }, []);

  const handleRemoveFromFavorites = (isbn13: string) => {
    const updatedFavorites = favorites.filter((item) => item.isbn13 !== isbn13);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setFavorites(updatedFavorites);
    setIsSnackbarOpen(true);
  };

  return (
    <div className={styles.favoriteWrapper}>
      <ArrowBack link="/" />
      <Typography
        variant="h1"
        color="primary"
        font="bebasNeue"
        className={styles.favoriteTitle}
        children={favorites.length > 0 ? "FAVORITE" : "FAVORITE IS EMPTY"}
      />
      <ul className={styles.favoriteBooksList}>
        {favorites.map((book) => {
          return (
            <li key={book.isbn13} className={styles.bookItem}>
              <Link
                to={`/book/${book.isbn13}`}
                className={styles.linkColorWrapper}
              >
                <div
                  className={styles.imageBackground}
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  <img src={book.image} alt={book.title} />
                </div>
              </Link>
              <div className={styles.textWrapper}>
                <div>
                  <Link to={`/book/${book.isbn13}`}>
                    <Typography
                      variant="h3"
                      className={styles.favoriteBookTitle}
                      font={"bebasNeue"}
                      children={book.title}
                    />
                  </Link>
                  <Typography
                    variant="b2"
                    font={"helios"}
                    color="secondary"
                    children={`${book.publisher}, ${book.year}`}
                  />
                </div>
                <Typography
                  variant="h3"
                  className={styles.favoriteBookPriceDesktop}
                  font={"bebasNeue"}
                  children={book.price}
                />
              </div>
              <div className={styles.rateRemoveWrapper}>
                <button
                  className={styles.btnRemoveFav}
                  onClick={() => handleRemoveFromFavorites(book.isbn13)}
                >
                  <img src={redHeart} alt="removeFromFav" />
                </button>
                <div className={styles.ratePriceWrapper}>
                  <RatingStars isbn={book.isbn13} />
                  <Typography
                    variant="h3"
                    className={styles.favoriteBookPriceTablet}
                    font={"bebasNeue"}
                    children={book.price}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Book is removed from favorites"
      />
      {favorites.length > 0 && <PopularBooks />}
    </div>
  );
};

export default FavoriteBooksList;
