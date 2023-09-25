import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import BookPage from "../pages/Book";
import CartPage from "../pages/Cart";
import FavoritePage from "../pages/Favorite";
import AuthorizationPage from "../pages/Authorization";
import MainPage from "../pages/Main";
import ResetPasswordPage from "../pages/ResetPassword";
import NewPasswordPage from "../pages/NewPassword";
import { getSlice } from "../store/user/user.selectors";
import { useSelector } from "react-redux";
import AccountPage from "../pages/Account";

const Router: React.FC = () => {
  const isAuth = useSelector(getSlice);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/book/:isbn13" element={<BookPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/sign-in" element={<AuthorizationPage />} />

        {isAuth && (
          <>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/account" element={<AccountPage />} />
          </>
        )}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
