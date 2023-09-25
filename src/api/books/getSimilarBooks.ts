import { IBook } from "../../models/book.model";
import { client } from "..";

type GetTitleBooksParams = { title: string };

export const getSimilarBooks = (
  params: GetTitleBooksParams
): Promise<IBook[]> => {
  const { title } = params;

  return client.get(`/search/${title}`).then((res) => res.data.books);
};
