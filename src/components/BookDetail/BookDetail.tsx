import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { IBookCard } from "../../models/bookCard.model";
import styles from "./BookDetail.module.css";
import ArrowBack from "../ArrowBack/ArrowBack";
import Typography from "../Typography/Typography";
import { getRandomColor } from "../../utils/randomColor";
import Tabs, { Tab } from "../Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { getSlice as getSliceBook } from "../../store/book/books.selector";
import Socials from "../Socials/Socials";
import SubscribeNews from "../Subscribe/Subscribe";
import SimilarBooks from "../SimilarBooks/SimilarBook";
import { CartBook } from "../../models/cart.model";
import wightHeart from "./img/wightHeart.svg";
import redHeart from "./img/redHeart.svg";
import BookDetailsRight from "./BookDetailRight/BookDetailRight";
import { Snackbar } from "@mui/material";
import { AppDispatch } from "../../store";
import { setBook } from "../../store/book/books.reducer";
import { getBookThunk } from "../../store/book/books.actions";
import loadingIcon from "../BookList/img/loading-gif.gif";
import { getSlice as getSliceUser } from "../../store/user/user.selectors";

const tabs: Tab[] = [
  { label: "Description", value: "description" },
  { label: "Authors", value: "authors" },
  { label: "Reviews", value: "reviews" },
];

const BookDetail: React.FC = () => {
  const { isbn13 } = useParams<{ isbn13?: string }>();
  const { emailSignIn } = useSelector(getSliceUser);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cart, setCart] = useState<CartBook[]>([]);
  const [isFav, setIsFav] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { book, bookCache, isBookLoading: loading } = useSelector(getSliceBook);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isbn13) return;

    if (bookCache[isbn13]) {
      dispatch(setBook(bookCache[isbn13]));
    } else {
      dispatch(getBookThunk(isbn13));
    }
  }, [dispatch, bookCache, isbn13]);

  useEffect(() => {
    const savedCart = localStorage.getItem(`${emailSignIn}-cart`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [emailSignIn]);

  useEffect(() => {
    document.title = `${book?.title}`;
  }, []);

  const saveCartToLocalStorage = (cartData: CartBook[]) => {
    localStorage.setItem(`${emailSignIn}-cart`, JSON.stringify(cartData));
  };

  const memoizedRandomColor = useMemo(() => getRandomColor(), []);

  const handleToggleFav = () => {
    const bookToSave = { ...book };
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isBookInFavorites = favorites.some(
      (item: IBookCard) => item.isbn13 === bookToSave.isbn13
    );

    if (isBookInFavorites) {
      const updatedFavorites = favorites.filter(
        (item: IBookCard) => item.isbn13 !== bookToSave.isbn13
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFav(false);
    } else {
      favorites.push(bookToSave);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFav(true);
    }
  };

  const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);

  const toggleMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  const addToCart = () => {
    if (book) {
      const existingCartItem = cart.find(
        (item) => item.bookData.isbn13 === book.isbn13
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
        const updatedCart = [...cart];
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
      } else {
        const newCartItem: CartBook = {
          bookData: book,
          quantity: 1,
        };
        const updatedCart = [...cart, newCartItem];
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
      }
      setCartCount(cartCount + 1);
      setIsSnackbarOpen(true);
    }
  };

  return (
    <div>
      {!book ? (
        <img src={loadingIcon} className={styles.loading} alt="LOADING" />
      ) : (
        <div className={styles.bookDetailWrapper}>
          <ArrowBack link="/" />
          <Typography
            variant="h1"
            color="primary"
            font="bebasNeue"
            className={styles.bookDetTitle}
            children={book.title}
          />
          <div className={styles.cardsWrapper}>
            <div
              className={styles.imageBackgroundColor}
              style={{ backgroundColor: memoizedRandomColor }}
            >
              <img src={book.image} alt={book.title} />

              <button className={styles.btnAddToFav} onClick={handleToggleFav}>
                {isFav ? (
                  <img src={redHeart} alt="addedToFav" />
                ) : (
                  <img src={wightHeart} alt="addToFav" />
                )}
              </button>
            </div>
            <BookDetailsRight
              bookData={book}
              showMoreDetails={showMoreDetails}
              toggleMoreDetails={toggleMoreDetails}
              addToCart={addToCart}
            />
          </div>
          <Tabs
            className={styles.tabs}
            activeTab={activeTab}
            tabs={tabs}
            onTabClick={handleChangeTab}
          />
          <div className={styles.posts}>
            {!loading && activeTab === "description" && (
              <Typography
                variant="b1"
                color="primary"
                font="helios"
                className={styles.tabsDescription}
                children={book.desc}
              />
            )}

            {!loading && activeTab === "authors" && (
              <Typography
                variant="b1"
                color="primary"
                font="helios"
                className={styles.tabsDescription}
                children={book.authors}
              />
            )}
            {!loading && activeTab === "reviews" && (
              <Typography
                variant="b1"
                color="primary"
                font="helios"
                className={styles.tabsDescription}
                children={`Rating: ${String(book.rating)}`}
              />
            )}
          </div>
          <Socials />
          <SubscribeNews />
          <SimilarBooks title={book.title} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isSnackbarOpen}
            autoHideDuration={3000}
            onClose={() => setIsSnackbarOpen(false)}
            message="Book added to cart"
          />
        </div>
      )}
    </div>
  );
};

export default BookDetail;
