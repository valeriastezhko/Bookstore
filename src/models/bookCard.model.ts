import { IBook } from "./book.model";

export interface IBookCard extends IBook {
  error: number;
  authors: string;
  publisher: string;
  isbn10: string;
  pages: number;
  year: number;
  rating: number;
  desc: string;
  pdf: Record<string, string>;
}
