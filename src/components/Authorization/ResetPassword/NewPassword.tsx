import React, { useCallback, useEffect, useState } from "react";
import styles from "../ResetPassword/ResetPassword.module.css";
import Typography from "../../Typography/Typography";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../../store/user/user.selectors";
import { setPasswordChanged } from "../../../store/user/user.reducer";
import { isPasswordValid } from "../../../utils/validation";

const NewPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { emailForPasswordReset } = useSelector(getSlice);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "New password";
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleResetClick = () => {
    if (!values.password) {
      setErrors({ password: "Required field", confirmPassword: "" });
      return;
    }

    if (!isPasswordValid(values.password)) {
      setErrors({
        password: "Password should be at least 8 characters long",
        confirmPassword: "",
      });
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors({
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUserIndex = users.findIndex(
      (user: any) => user.email === emailForPasswordReset
    );

    if (foundUserIndex === -1) {
      navigate("/reset-password");
      return;
    }

    users[foundUserIndex].password = values.password;
    users[foundUserIndex].confirmPassword = values.confirmPassword;

    localStorage.setItem("users", JSON.stringify(users));

    navigate("/sign-in");
    dispatch(setPasswordChanged(true));
  };

  return (
    <div className={styles.resetWrapper}>
      <form className={styles.form}>
        <Typography
          variant="h3"
          font="bebasNeue"
          children="NEW PASSWORD"
          className={styles.resetTitle}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          placeholder="Your password"
          value={values.password}
          error={!!errors.password}
          description={errors.password || ""}
          type="password"
          onChange={handleChange}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          description={errors.confirmPassword || ""}
          type="password"
          onChange={handleChange}
        />

        <Button
          type="button"
          onClick={handleResetClick}
          text="Reset"
          className={styles.btnSubmitReset}
        />
      </form>
    </div>
  );
};

export default NewPassword;
