import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBookCard } from "../../models/bookCard.model";
import {
  getBookThunk,
  getBooksThunk,
  getSearchedBooksThunk,
  getSimilarBooksThunk,
} from "./books.actions";
import { IBook } from "../../models/book.model";

interface BookState {
  isBooksLoading: boolean;
  books: IBook[];

  isBookLoading: boolean;
  book: IBookCard | null;
  bookCache: Record<IBookCard["isbn13"], IBookCard>;

  similarBooks: IBook[];
  isSimilarBooksLoading: boolean;

  searchedBooks: IBook[];
  isSearchedBooksLoading: boolean;
  showSearchResult: boolean;
  searchedTotal: string;

  pageTitle: string;

  page: string;
  total: string;
  simTotal: string;

  search: string;
  limit: number;
  offset: number;
}

const initialState: BookState = {
  isBooksLoading: false,
  books: [],

  isBookLoading: false,
  book: null,
  bookCache: {} as Record<IBookCard["isbn13"], IBookCard>,

  similarBooks: [],
  isSimilarBooksLoading: false,

  searchedBooks: [],
  isSearchedBooksLoading: false,
  showSearchResult: true,
  searchedTotal: "",

  pageTitle: "NEW RELEASES BOOKS",

  page: "1",
  limit: 20,
  total: "",
  simTotal: "",
  search: "",
  offset: 0,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.limit = initialState.limit;
      state.offset = initialState.offset;
      state.searchedBooks = initialState.searchedBooks;
    },
    setBook: (state, action: PayloadAction<IBookCard>) => {
      state.book = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSearchState: (state, action) => {
      state.showSearchResult = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooksThunk.pending, (state) => {
        state.isBooksLoading = true;
      })
      .addCase(getBooksThunk.fulfilled, (state, action) => {
        state.isBooksLoading = false;
        state.total = action.payload.total;

        const newBooks = action.payload.books.map((book) => ({
          ...book,
        }));

        state.books = newBooks;
      })
      .addCase(getBookThunk.pending, (state) => {
        state.isBookLoading = true;
      })
      .addCase(getBookThunk.fulfilled, (state, action) => {
        state.isBookLoading = false;
        state.book = action.payload;
        state.bookCache[action.payload.isbn13] = action.payload;
      })
      .addCase(getSimilarBooksThunk.pending, (state) => {
        state.isSimilarBooksLoading = true;
      })
      .addCase(getSimilarBooksThunk.fulfilled, (state, action) => {
        state.isSimilarBooksLoading = false;
        state.simTotal = action.payload.total;

        const similarBooks = action.payload.books.map((book) => ({
          ...book,
        }));

        state.similarBooks = similarBooks;
      })
      .addCase(getSearchedBooksThunk.pending, (state) => {
        state.isSearchedBooksLoading = true;
      })
      .addCase(getSearchedBooksThunk.fulfilled, (state, action) => {
        state.isSearchedBooksLoading = false;
        state.searchedTotal = action.payload.total;

        const searchedBooks = action.payload.books.map((book) => ({
          ...book,
        }));

        state.searchedBooks = searchedBooks;
      });
  },
});

export const {
  setSearch,
  setSearchState,
  setBook,
  setBooks,
  setPageTitle,
  setCurrentPage,
} = bookSlice.actions;
export default bookSlice.reducer;
