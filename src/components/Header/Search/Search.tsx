import React, { useCallback, useEffect, useState } from "react";
import styles from "./Search.module.css";
import searchIcon from "../img/icon-search.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import debounce from "lodash.debounce";
import { setSearch } from "../../../store/book/books.reducer";
import { useDidUpdate } from "../../../hooks/useDidUpdate";
import { getSlice } from "../../../store/book/books.selector";
import { getSearchedBooksThunk } from "../../../store/book/books.actions";
import SearchResult from "./SearchResults";

interface SearchProps {
  type: string;
  className?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  design?: "inHeader" | "inBurger" | "subscribe";
}

const Search: React.FC<SearchProps> = ({
  type = "text",
  placeholder = "Search",
  design = "inHeader",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { limit, offset, search } = useSelector(getSlice);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    dispatch(getSearchedBooksThunk());
    setShowResults(true);
  }, [dispatch, search, limit, offset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedSetSearch = useCallback(
    debounce((newSearch: string) => {
      dispatch(setSearch(newSearch));
    }, 800),
    [dispatch]
  );

  useDidUpdate(() => {
    debouncedSetSearch(searchValue);
  }, [debouncedSetSearch, searchValue]);

  return (
    <div className={`${styles.searchWrapper} ${styles[design]}`}>
      <input
        type={type}
        className={styles.search}
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button className={styles.searchButton}>
        <img src={searchIcon} alt="Search" />
      </button>
      {showResults && <SearchResult />}
    </div>
  );
};

export default Search;
