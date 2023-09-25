import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import Typography from "../../Typography/Typography";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { setEmailForPasswordReset } from "../../../store/user/user.reducer";
import { User } from "../../../models/user.model";

const ResetPassword: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  useEffect(() => {
    document.title = "Reset password";
  }, []);

  const handleResetClick = () => {
    if (!values.email) {
      setErrors({ email: "Required field" });
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((user: User) => user.email === values.email);

    if (!foundUser) {
      setErrors({ email: "Can't find user" });
      return;
    }

    dispatch(setEmailForPasswordReset(values.email));
    navigate(`/new-password/`);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  return (
    <div className={styles.resetWrapper}>
      <form className={styles.form}>
        <Typography
          variant="h3"
          font={"bebasNeue"}
          children={"RESET PASSWORD"}
          className={styles.resetTitle}
        />
        <Input
          ref={inputRef}
          label="Email"
          id="email"
          name="email"
          placeholder="Your email"
          value={values.email}
          error={!!errors.email}
          description={errors.email}
          type="text"
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={handleResetClick}
          text={"Reset"}
          className={styles.btnSubmitReset}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
