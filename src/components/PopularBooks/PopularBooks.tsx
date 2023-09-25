import React, { useEffect } from "react";
import Typography from "../Typography/Typography";
import styles from "./PopularBooks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../store/book/books.selector";
import { AppDispatch } from "../../store";
import { getBooksThunk } from "../../store/book/books.actions";
import Carousel from "../Pagination/Carousel";

const PopularBooks: React.FC = () => {
  const { books, limit, offset } = useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getBooksThunk());
    }
  }, [dispatch, limit, offset]);

  return (
    <div className={styles.popularBooks}>
      <Typography
        variant="h2"
        className={styles.popularBooksTitle}
        children={"POPULAR BOOKS"}
        font={"bebasNeue"}
      />
      <Carousel books={books} />
    </div>
  );
};

export default PopularBooks;
