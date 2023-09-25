import { useEffect } from "react";
import BookList from "../BookList/BookList";
import Typography from "../Typography/Typography";
import styles from "./Main.module.css";
import Subscribe from "../Subscribe/Subscribe";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/book/books.reducer";
import { AppDispatch } from "../../store/index";
import { getSlice } from "../../store/book/books.selector";
import Pagination from "../Pagination/Pagination";
import { getBooksThunk } from "../../store/book/books.actions";

const Main: React.FC = () => {
  const { books, searchedBooks, searchedTotal, limit, offset, pageTitle } =
    useSelector(getSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (Number(searchedTotal) === 0) {
      dispatch(getBooksThunk());
    } else {
    }
  }, [dispatch, limit, offset, searchedTotal]);

  useEffect(() => {
    document.title = "BookStore";
  }, []);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    dispatch(getBooksThunk());
  };

  return (
    <div className={styles.mainWrapper}>
      <Typography
        variant="h1"
        color="primary"
        font="bebasNeue"
        children={pageTitle}
        className={styles.mainTitle}
      />
      <BookList books={books} />
      {Number(searchedTotal) > limit && (
        <Pagination
          pages={Math.ceil(Number(searchedTotal) / limit)}
          onClick={handlePageChange}
        />
      )}
      <Subscribe />
    </div>
  );
};

export default Main;
