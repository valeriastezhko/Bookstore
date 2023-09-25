import React, { useRef, useState } from "react";
import Typography from "../Typography/Typography";
import styles from "./Subscribe.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { isEmailValid } from "../../utils/validation";

const SubscribeNews = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) {
      setErrors({ email: "Required field" });
      return;
    }

    if (!isEmailValid(email)) {
      setErrors({ email: "Invalid email format" });
      return;
    }
    setEmail("");
    setMessage("Your email has been saved.");
  };

  return (
    <div className={styles.subscribeWrapper}>
      <Typography
        variant="h2"
        color="primary"
        font="bebasNeue"
        children={"SUBSCRIBE TO NEWSLETTER"}
        className={styles.subscribeTitle}
      />
      <Typography
        variant="s1"
        color="secondary"
        font="dinPro"
        children={
          "Be the first to know about new IT books, upcoming releases, exclusive offers and more."
        }
        className={styles.subscribeSubtitle}
      />
      <div className={styles.subscribeInputWrapper}>
        <Input
          ref={inputRef}
          id="email"
          name="email"
          placeholder="Your email"
          value={email}
          error={!!errors.email}
          description={errors.email}
          type="text"
          onChange={handleEmailChange}
          className={styles.subscribeInput}
        />
        <Button
          text="SUBSCRIBE"
          type="submit"
          className={styles.subscribeBtn}
          onClick={handleSubscribe}
        />
      </div>
      {message && (
        <Typography
          variant="b2"
          color="secondary"
          font="dinPro"
          children={message}
        />
      )}
    </div>
  );
};
export default SubscribeNews;
