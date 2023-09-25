import React, { useState } from "react";
import BookList from "../BookList/BookList";
import styles from "./Pagination.module.css";
import { IBook } from "../../models/book.model";
import prev from "./img/icon-prev.png";
import next from "./img/icon-next.png";

const Carousel: React.FC<{
  books: IBook[];
}> = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--visible-books"
    )
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount < books.length ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div>
      <div className={styles.carouselArrows}>
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={styles.paginationArrow}
        >
          <img src={prev} />{" "}
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex + visibleCount >= books.length}
          className={styles.paginationArrow}
        >
          <img src={next} />
        </button>
      </div>

      <BookList books={visibleBooks} />
    </div>
  );
};

export default Carousel;
