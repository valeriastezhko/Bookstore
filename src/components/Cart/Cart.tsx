import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { CartBook } from "../../models/cart.model";
import ArrowBack from "../ArrowBack/ArrowBack";
import Typography from "../Typography/Typography";
import { getRandomColor } from "../../utils/randomColor";
import Button from "../Button/Button";
import clsx from "clsx";
import {
  removeAllFromCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../../store/cart/cart.reducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { getSlice } from "../../store/user/user.selectors";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { emailSignIn } = useSelector(getSlice);
  const [cartItems, setCartItems] = useState<CartBook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckOut, setCheckOut] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<CartBook | null>(null);
  const VAT = 0.15;
  const [backgroundColors, setBackgroundColors] = useState<
    Record<string, string>
  >({});

  const updateCartInLocalStorage = (updatedCart: CartBook[]) => {
    localStorage.setItem(`${emailSignIn}-cart`, JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const loadedCart = JSON.parse(
      localStorage.getItem(`${emailSignIn}-cart`) || "[]"
    );
    setCartItems(loadedCart);
  }, [emailSignIn]);

  useEffect(() => {
    const generatedColors: Record<string, string> = {};
    cartItems.forEach((item) => {
      generatedColors[item.bookData.isbn13] = getRandomColor();
    });
    setBackgroundColors(generatedColors);
  }, [cartItems]);

  useEffect(() => {
    document.title = "Cart";
  }, []);

  const handleUpdateQuantity = (isbn13: string, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ isbn13, quantity: newQuantity }));

    const updatedCart = cartItems.map((item) => {
      if (item.bookData.isbn13 === isbn13) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const handleRemoveFromCart = (book: CartBook) => {
    setBookToDelete(book);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (bookToDelete) {
      dispatch(removeFromCart(bookToDelete.bookData.isbn13));
      const updatedCart = cartItems.filter(
        (item) => item.bookData.isbn13 !== bookToDelete.bookData.isbn13
      );
      setCartItems(updatedCart);
      setIsModalOpen(false);

      updateCartInLocalStorage(updatedCart);
    }
  };

  const calculateTotalItemPrice = (price: string, quantity: number) => {
    const numericPrice = Number(price.slice(1));
    return numericPrice * quantity;
  };

  const calculateTotalPrice = cartItems.reduce((total, item) => {
    return total + calculateTotalItemPrice(item.bookData.price, item.quantity);
  }, 0);

  const calculateVat = () => calculateTotalPrice * VAT;

  const handleCheckOut = () => {
    setCheckOut(true);
  };

  const handleClearAll = () => {
    dispatch(removeAllFromCart());
    localStorage.removeItem(`${emailSignIn}-cart`);
    setCartItems([]);
  };

  return (
    <div className={styles.cartWrapper}>
      <ArrowBack link="/" />
      <Typography
        variant="h1"
        color="primary"
        font="bebasNeue"
        className={styles.cartTitle}
        children={cartItems.length > 0 ? "YOUR CART" : "CART IS EMPTY"}
      />
      <ul className={styles.cartBooksList}>
        {cartItems.map((item) => (
          <li key={item.bookData.isbn13} className={styles.bookItem}>
            <Link
              to={`/book/${item.bookData.isbn13}`}
              className={styles.linkColorWrapper}
            >
              <div
                className={styles.imageBackground}
                style={{
                  backgroundColor: backgroundColors[item.bookData.isbn13],
                }}
              >
                <img src={item.bookData.image} alt={item.bookData.title} />
              </div>
            </Link>
            <div className={styles.cartItemDescription}>
              <div className={styles.cartItemTextWrapper}>
                <div>
                  <Link to={`/book/${item.bookData.isbn13}`}>
                    <Typography
                      variant="h3"
                      className={styles.cartItemTitle}
                      font={"bebasNeue"}
                      children={item.bookData.title}
                    />
                  </Link>
                  <Typography
                    variant="b2"
                    font={"helios"}
                    color="secondary"
                    children={`${item.bookData.publisher}, ${item.bookData.year}`}
                  />
                </div>{" "}
                <button
                  className={styles.btnCloseTablet}
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <Typography
                    variant="b2"
                    className={styles.closeX}
                    font="helios"
                    children={"X"}
                  />
                </button>
              </div>
              <div className={styles.priceAmountWrapper}>
                <div className={styles.amountWrapper}>
                  <button
                    className={clsx(styles.plusMinusButton, styles.btnQuant)}
                    onClick={() => {
                      if (item.quantity > 1) {
                        handleUpdateQuantity(
                          item.bookData.isbn13,
                          item.quantity - 1
                        );
                      }
                    }}
                    disabled={item.quantity === 1}
                  >
                    <Typography
                      variant="s1"
                      color="primary"
                      font={"helios"}
                      children={"-"}
                    />
                  </button>
                  <Typography
                    variant="s1"
                    color="secondary"
                    font={"helios"}
                    className={clsx(styles.quantity, styles.btnQuant)}
                    children={item.quantity}
                  />
                  <button
                    className={clsx(styles.plusMinusButton, styles.btnQuant)}
                    onClick={() =>
                      handleUpdateQuantity(
                        item.bookData.isbn13,
                        item.quantity + 1
                      )
                    }
                  >
                    <Typography
                      variant="s1"
                      color="primary"
                      font={"helios"}
                      children={"+"}
                    />
                  </button>
                </div>
                <Typography
                  variant="h2"
                  className={styles.cartItemPriceTablet}
                  font={"bebasNeue"}
                  children={`${calculateTotalItemPrice(
                    item.bookData.price,
                    item.quantity
                  ).toFixed(2)} $`}
                />
              </div>
            </div>
            <Typography
              variant="h2"
              className={styles.cartItemPriceDesktop}
              font={"bebasNeue"}
              children={`${calculateTotalItemPrice(
                item.bookData.price,
                item.quantity
              ).toFixed(2)} $`}
            />
            <button
              className={styles.btnCloseDesktop}
              onClick={() => handleRemoveFromCart(item)}
            >
              <Typography variant="b2" font="helios" children={"X"} />{" "}
            </button>
          </li>
        ))}
      </ul>

      <Button
        text="CLEAR ALL"
        design="dark"
        className={styles.btnClearAll}
        onClick={handleClearAll}
      />

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmRemove}
          text="Are you sure you want to remove this book from your cart?"
        />
      )}

      {isCheckOut && (
        <ConfirmationModal
          isOpen={isCheckOut}
          onClose={() => setCheckOut(false)}
          onConfirm={handleClearAll}
          text="You have made order! Thank you!"
        />
      )}

      <div className={styles.cartResult}>
        <div className={styles.textWrapper}>
          <Typography
            variant="b2"
            color="secondary"
            font={"helios"}
            children={"Sum total"}
          />
          <Typography
            variant="b2"
            color="primary"
            font={"helios"}
            children={`${calculateTotalPrice.toFixed(2)} $`}
          />
        </div>
        <div className={styles.textWrapper}>
          <Typography
            variant="b2"
            color="secondary"
            font={"helios"}
            children={"VAT"}
          />
          <Typography
            variant="b2"
            color="primary"
            font={"helios"}
            children={`${calculateVat().toFixed(2)} $`}
          />
        </div>
        <div className={styles.textWrapper}>
          <Typography
            variant="h2"
            color="primary"
            font={"bebasNeue"}
            children={"TOTAL"}
          />
          <Typography
            variant="h2"
            color="primary"
            font={"bebasNeue"}
            children={`${(calculateTotalPrice + calculateVat()).toFixed(2)} $`}
          />
        </div>
        <Button text="CHECK OUT" design="dark" onClick={handleCheckOut} />
      </div>
    </div>
  );
};

export default Cart;
