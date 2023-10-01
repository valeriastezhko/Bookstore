import React, { useCallback, useRef, useState } from "react";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import styles from "./SignUp.module.css";
import { User } from "../../../models/user.model";
import { isEmailValid, isPasswordValid } from "../../../utils/validation";
import { Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SignUpUserInfoErrors {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}

const initialValues = {
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const SignUp: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<SignUpUserInfoErrors>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const errors = validateSignUpForm(values, users);

    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    saveUserToLocalStorage(values);
    setValues(initialValues);
    setErrors({});
    setIsSnackbarOpen(true);
  };

  const validateSignUpForm = (
    values: typeof initialValues,
    existingUsers: User[]
  ): SignUpUserInfoErrors => {
    const errors: SignUpUserInfoErrors = {};

    if (!values.username) {
      errors.username = "Required field";
    }

    if (!values.email) {
      errors.email = "Required field";
    } else if (!isEmailValid(values.email)) {
      errors.email = "Invalid email format";
    } else {
      const isUserExist = existingUsers.some(
        (user: User) => user.email === values.email
      );
      if (isUserExist) {
        errors.email = "This email has already been used";
      }
    }

    if (!values.password) {
      errors.password = "Required field";
    } else if (!isPasswordValid(values.password)) {
      errors.password = "Password should be at least 8 characters long";
    } else if (values.password !== values.confirmPassword) {
      errors.password = "Password and Confirm Password should be equal";
    }

    return errors;
  };

  const saveUserToLocalStorage = (user: User) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <form className={styles.form}>
      <Input
        ref={inputRef}
        label="Name"
        id="username"
        name="username"
        placeholder="Your name"
        value={values.username}
        error={!!errors.username}
        description={errors.username || ""}
        type="text"
        onChange={handleChange}
      />
      <Input
        label="Email"
        id="email"
        name="email"
        placeholder="Your email"
        value={values.email}
        error={!!errors.email}
        description={errors.email || ""}
        type="text"
        onChange={handleChange}
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
        onClick={handleSubmit}
        text={"Sign Up"}
        className={styles.btnSubmitSignUp}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Successful sign up! Sign in your account."
      />
    </form>
  );
};

export default SignUp;
