import React, { useEffect } from "react";
import styles from "./Search.module.css";
import { getSlice } from "../../../store/book/books.selector";
import { useDispatch, useSelector } from "react-redux";
import Typography from "../../Typography/Typography";
import { Link, useNavigate } from "react-router-dom";
import {
  setBooks,
  setPageTitle,
  setSearch,
  setSearchState,
} from "../../../store/book/books.reducer";
import { getRandomColor } from "../../../utils/randomColor";
import { setBurgerState } from "../../../store/layout/layout.reducer";

const SearchResult: React.FC = () => {
  const { search, searchedBooks, showSearchResult } = useSelector(getSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (searchedBooks.length > 0) {
      dispatch(setBooks(searchedBooks));
      dispatch(setPageTitle(`"${search}" SEARCH RESULTS`));
      dispatch(setSearchState(false));
      dispatch(setBurgerState(false));
    }
  };

  useEffect(() => {
    dispatch(setSearchState(true));
  }, [search]);

  useEffect(() => {
    dispatch(setSearch(""));
  }, [dispatch, navigate]);

  const highlightSearchText = (text: string) => {
    const regex = new RegExp(search, "gi");
    return text.replace(
      regex,
      (match) => `<strong style="font-weight: bold;">${match}</strong>`
    );
  };

  return (
    <div>
      {search && searchedBooks.length > 0 && showSearchResult ? (
        <ul className={styles.searchResult}>
          {searchedBooks.slice(0, 4).map((book) => (
            <li key={book.isbn13} className={styles.bookList}>
              <Link to={`/book/${book.isbn13}`}>
                <div
                  className={styles.imageBackground}
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  <img src={book.image} alt={book.title} />
                </div>
              </Link>
              <Link to={`/book/${book.isbn13}`}>
                <h2
                  className={styles.searchListTitle}
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchText(book.title),
                  }}
                />
              </Link>
            </li>
          ))}
          <Link
            to={"/"}
            className={styles.showMoreButton}
            onClick={handleClick}
          >
            <Typography
              variant="b2"
              font="helios"
              className={styles.allResults}
              children={"All results"}
            />{" "}
          </Link>
        </ul>
      ) : search && searchedBooks.length === 0 ? (
        <div className={styles.searchResult}>
          <Typography
            variant="b2"
            font="helios"
            children={"No results found"}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SearchResult;
