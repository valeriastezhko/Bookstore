import { client } from "..";
import { IBookCard } from "../../models/bookCard.model";

type GetBookParams = { isbn13: string };

type GetBookSuccessResponse = IBookCard;

export const getBook = ({
  isbn13,
}: GetBookParams): Promise<GetBookSuccessResponse> => {
  return client.get(`/books/${isbn13}`).then((res) => res.data);
};
