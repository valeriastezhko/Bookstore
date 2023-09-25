import React, { useEffect } from "react";
import { IBook } from "../../models/book.model";
import Typography from "../Typography/Typography";
import styles from "./BookList.module.css";
import { getRandomColor } from "../../utils/randomColor";
import { Link, useLocation } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import loading from "./img/loading-gif.gif";
import { useSelector } from "react-redux";
import { getSlice } from "../../store/book/books.selector";

interface BookListProps {
  books: IBook[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const location = useLocation();
  const { isBooksLoading } = useSelector(getSlice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      {isBooksLoading ? (
        <img src={loading} className={styles.loading} alt="LOADING" />
      ) : (
        <ul className={styles.bookList}>
          {books.map((book) => {
            return (
              <li key={book.isbn13} className={styles.bookCard}>
                <Link to={`/book/${book.isbn13}`}>
                  <div
                    className={styles.imageBackground}
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    <img src={book.image} alt={book.title} />
                  </div>
                </Link>
                <div className={styles.bookDescription}>
                  <Link to={`/book/${book.isbn13}`}>
                    <Typography
                      variant="h3"
                      color="primary"
                      font="bebasNeue"
                      children={book.title}
                      className={styles.bookCardTitle}
                    />
                  </Link>
                  <Typography
                    variant="b2"
                    color="secondary"
                    font="helios"
                    className={styles.bookCardSubtitle}
                  >
                    {book.subtitle.length > 0
                      ? `${book.subtitle.slice(0, 50)} ...`
                      : ""}
                  </Typography>

                  <div className={styles.bookPriceRate}>
                    <Typography
                      variant="h3"
                      color="primary"
                      font="bebasNeue"
                      children={book.price}
                    />
                    <RatingStars isbn={book.isbn13} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
