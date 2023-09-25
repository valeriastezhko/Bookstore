import React, { useEffect } from "react";
import Typography from "../Typography/Typography";
import styles from "./SimilarBook.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../store/book/books.selector";
import { AppDispatch } from "../../store";
import { getSimilarBooksThunk } from "../../store/book/books.actions";
import Carousel from "../Pagination/Carousel";
import loading from "../BookList/img/loading-gif.gif";

const SimilarBooks: React.FC<{ title: string }> = ({ title }) => {
  const { similarBooks, limit, offset, isSimilarBooksLoading } =
    useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (title) {
      title.split(",").map((title) => dispatch(getSimilarBooksThunk(title)));
    }
  }, [dispatch, title, limit, offset]);

  return (
    <div>
      <Typography
        variant="h2"
        className={styles.similarBooksTitle}
        children={"SIMILAR BOOKS"}
        font={"bebasNeue"}
      />
      {isSimilarBooksLoading ? (
        <img src={loading} className={styles.loading} alt="LOADING" />
      ) : (
        <Carousel books={similarBooks} />
      )}
    </div>
  );
};

export default SimilarBooks;
