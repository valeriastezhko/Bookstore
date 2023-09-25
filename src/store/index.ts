import { Middleware, ThunkMiddleware, configureStore } from "@reduxjs/toolkit";
import bookReducer from "./book/books.reducer";
import cartReducer from "./cart/cart.reducer";
import layoutReducer from "./layout/layout.reducer";
import userReducer from "./user/user.reducer";

const logger: Middleware = (store) => (next) => (action) => {
  next(action);
};

export const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer,
    layout: layoutReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
