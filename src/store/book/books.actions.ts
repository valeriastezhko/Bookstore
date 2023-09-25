import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IBookCard } from "../../models/bookCard.model";
import { getSlice } from "./books.selector";
import { getBook } from "../../api/books/getBook";
import { getBooks } from "../../api/books/getBooks";

export const getBooksThunk = createAsyncThunk(
  "books/getBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit, offset, search, page } = getSlice(getState() as RootState);

    return getBooks({ limit, offset, search, page });
  }
);

export const getBookThunk = createAsyncThunk(
  "books/getBookThunk",
  (isbn13: IBookCard["isbn13"]) => getBook({ isbn13 })
);

export const getSimilarBooksThunk = createAsyncThunk(
  "books/getSimilarBooksThunk",
  async (title: string, thunkApi) => {
    const { getState } = thunkApi;
    const { limit, offset, page } = getSlice(getState() as RootState);

    return getBooks({ limit, offset, search: title, page });
  }
);

export const getSearchedBooksThunk = createAsyncThunk(
  "books/getSearchedBooksThunk",
  async (param, thunkApi) => {
    const { getState } = thunkApi;
    const { limit, offset, search, page } = getSlice(getState() as RootState);

    return getBooks({ limit, offset, search, page });
  }
);
