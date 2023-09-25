import React, { useEffect, useState } from "react";
import { ReactComponent as StarIcon } from "./img/icon-star.svg";
import styles from "./RatingStars.module.css";
import { getBook } from "../../api/books/getBook";
import { IBookCard } from "../../models/bookCard.model";

interface RatingStarsProps {
  isbn: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ isbn }) => {
  const [book, setBook] = useState<IBookCard | null>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    getBook({ isbn13: isbn }).then((data) => {
      setBook(data);
      setRating(data?.rating || 0);
    });
  }, [isbn]);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= rating;

    stars.push(
      <div key={i}>
        <StarIcon
          width="14"
          height="14"
          fill={isFilled ? "var(--text-primary)" : " var(--grey-bg-color)"}
          stroke={isFilled ? "var(--text-primary)" : "var(--grey-bg-color)"}
          strokeWidth="1"
        />
      </div>
    );
  }

  return (
    <div className={styles.starContainer}>{book ? stars : "Loading..."}</div>
  );
};

export default RatingStars;
