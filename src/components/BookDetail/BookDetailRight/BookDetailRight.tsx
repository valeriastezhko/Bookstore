import React from "react";
import styles from "../BookDetail.module.css";
import angleUp from "../img/angleUp.svg";
import angleDown from "../img/angleDown.svg";
import { IBookCard } from "../../../models/bookCard.model";
import Typography from "../../Typography/Typography";
import RatingStars from "../../RatingStars/RatingStars";
import Button from "../../Button/Button";
import { useSelector } from "react-redux";
import { getSlice } from "../../../store/user/user.selectors";

interface BookDetailsRightProps {
  bookData: IBookCard;
  showMoreDetails: boolean;
  toggleMoreDetails: () => void;
  addToCart: () => void;
}

const BookDetailsRight: React.FC<BookDetailsRightProps> = ({
  bookData,
  showMoreDetails,
  toggleMoreDetails,
  addToCart,
}) => {
  const { isAuth } = useSelector(getSlice);
  const handleButtonClick = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className={styles.bookDetailsRigth}>
      <div className={styles.wripperPriceRate}>
        <Typography
          variant="h2"
          color="primary"
          font="bebasNeue"
          children={bookData.price}
        />
        <RatingStars isbn={bookData.isbn13} />
      </div>
      <div className={styles.wrapperСharacteristic}>
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          className={styles.characteristicColor}
          children={"Authors"}
        />
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          children={bookData.authors}
        />
      </div>
      <div className={styles.wrapperСharacteristic}>
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          className={styles.characteristicColor}
          children={"Year"}
        />
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          children={bookData.year}
        />
      </div>
      <div className={styles.wrapperСharacteristic}>
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          className={styles.characteristicColor}
          children={"Format"}
        />
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          children={
            bookData.pdf && Object.keys(bookData.pdf).length > 0
              ? "Paper book / eBook"
              : "Paper book"
          }
        />
      </div>
      {showMoreDetails && (
        <>
          <div className={styles.wrapperСharacteristic}>
            <Typography
              variant="b1"
              color="primary"
              font="helios"
              className={styles.characteristicColor}
              children={"Pages"}
            />
            <Typography
              variant="b1"
              color="primary"
              font="helios"
              children={bookData.pages}
            />
          </div>
          <div className={styles.wrapperСharacteristic}>
            <Typography
              variant="b1"
              color="primary"
              font="helios"
              className={styles.characteristicColor}
              children={"Publisher"}
            />
            <Typography
              variant="b1"
              color="primary"
              font="helios"
              children={bookData.publisher}
            />
          </div>
        </>
      )}
      <button
        type="button"
        className={styles.moreDetailsButton}
        onClick={toggleMoreDetails}
      >
        {showMoreDetails ? <img src={angleDown} /> : <img src={angleUp} />}
        <Typography
          variant="b1"
          color="primary"
          font="helios"
          children={"More details"}
        />
      </button>
      <Button
        design="dark"
        type="button"
        onClick={addToCart}
        disabled={!isAuth}
        className={styles.btnAddToCart}
        text={"ADD TO CART"}
      />
      {bookData.pdf && Object.keys(bookData.pdf).length > 0 && (
        <Button
          design="light"
          type="button"
          className={styles.btnPreviewBook}
          text={"Preview book"}
          onClick={() => handleButtonClick(Object.values(bookData.pdf)[0])}
        />
      )}
    </div>
  );
};

export default BookDetailsRight;
