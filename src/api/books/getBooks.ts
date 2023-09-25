import { IBook } from "../../models/book.model";
import { client } from "..";

type GetBooksParams = {
  limit: number;
  offset: number;
  search?: string;
  page: string;
};

type GetBooksSuccessResponse = {
  total: string;
  page?: string;
  books: IBook[];
};
export const getBooks = (
  params: GetBooksParams
): Promise<GetBooksSuccessResponse> => {
  const { limit, offset, search, page } = params;

  const endpoint = search ? `/search/${search}` : "/new";

  return client
    .get(endpoint, {
      params: { limit, offset, search, page },
    })
    .then((res) => {
      return res.data;
    });
};
