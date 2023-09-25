import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSlice } from "../../../store/user/user.selectors";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { User } from "../../../models/user.model";
import ArrowBack from "../../ArrowBack/ArrowBack";
import Typography from "../../Typography/Typography";
import styles from "./Account.module.css";
import { isEmailValid, isPasswordValid } from "../../../utils/validation";
import { Snackbar } from "@mui/material";
import { logOut, setCurrentEmail } from "../../../store/user/user.reducer";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  email: "",
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

const Account: React.FC = () => {
  const { emailSignIn } = useSelector(getSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((user: User) => user.email === emailSignIn);
    if (foundUser) {
      return foundUser;
    } else {
      return initialValues;
    }
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((user: User) => user.email === emailSignIn);

    if (foundUser) {
      setUserData({
        username: foundUser.username || "",
        email: foundUser.email || "",
        password: foundUser.password || "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [emailSignIn]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: User) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();

    const newErrors = {
      email: userData.email ? "" : "Required field",
      username: userData.username ? "" : "Required field",
      newPassword: "",
      confirmNewPassword: "",
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.username) {
      if (userData.newPassword !== userData.confirmNewPassword) {
        setErrors({
          ...newErrors,
          newPassword: "Passwords do not match",
          confirmNewPassword: "Passwords do not match",
        });
        return;
      }

      if (userData.email && !isEmailValid(userData.email)) {
        setErrors({
          ...newErrors,
          email: "Invalid email format",
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUserIndex = users.findIndex(
        (user: User) => user.email === emailSignIn
      );
      users[foundUserIndex].username = userData.username;
      users[foundUserIndex].email = userData.email;

      if (
        userData.newPassword.length > 0 &&
        !isPasswordValid(userData.newPassword)
      ) {
        setErrors({
          ...newErrors,
          newPassword: "Password should be at least 8 characters long",
        });
        return;
      }

      if (
        userData.newPassword.length > 0 &&
        userData.newPassword === userData.confirmNewPassword
      ) {
        users[foundUserIndex].password = userData.newPassword;
        users[foundUserIndex].confirmPassword = userData.confirmNewPassword;
      }

      localStorage.setItem("users", JSON.stringify(users));

      setUserData((prevData: User) => ({
        ...prevData,
        newPassword: "",
        confirmNewPassword: "",
      }));

      setErrors({
        email: "",
        username: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
    const previousCart = JSON.parse(
      localStorage.getItem(`${emailSignIn}-cart`) || "[]"
    );
    if (previousCart.length > 0) {
      const newCart = [...previousCart];
      localStorage.removeItem(`${emailSignIn}-cart`);
      localStorage.setItem(`${userData.email}-cart`, JSON.stringify(newCart));
    }

    setIsSnackbarOpen(true);
  };

  const hadleClickLogOut = () => {
    dispatch(logOut(false));
    dispatch(setCurrentEmail(""));
    navigate("/sign-in");
  };

  useEffect(() => {
    document.title = "Account";
  }, []);

  return (
    <div className={styles.accountWrapper}>
      <ArrowBack link={"/"} />
      <Typography
        variant="h1"
        font="bebasNeue"
        className={styles.accountTitle}
        children={"ACCOUNT"}
      />
      <form>
        <Typography
          variant="h3"
          font="bebasNeue"
          className={styles.accountTitle}
          children={"PROFILE"}
        />
        <div className={styles.profileWrapper}>
          <Input
            label="Name"
            name="username"
            value={userData.username}
            error={!!errors.username}
            description={errors.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={userData.email}
            error={!!errors.email}
            description={errors.email}
            onChange={handleChange}
          />
        </div>
        <Typography
          variant="h3"
          font="bebasNeue"
          className={styles.accountTitle}
          children={"PASSWORD"}
        />
        <>
          <Input
            label="Password"
            name="Password"
            type="password"
            disabled
            value={userData.password}
            onChange={handleChange}
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={userData.newPassword}
            error={!!errors.newPassword}
            description={errors.newPassword}
            onChange={handleChange}
          />
          <Input
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            value={userData.confirmNewPassword}
            error={!!errors.confirmNewPassword}
            description={errors.confirmNewPassword}
            onChange={handleChange}
          />
        </>
        <Button
          type="button"
          text="SAVE CHANGES"
          className={styles.btnSaveChanges}
          onClick={handleSave}
        />
        <Button
          text={"LOG OUT"}
          className={styles.btnSaveChanges}
          onClick={hadleClickLogOut}
        />
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Changes are saved"
      />{" "}
    </div>
  );
};

export default Account;
