import { createSlice, isAction } from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
  emailForPasswordReset: string;
  emailSignIn: string;
  isPasswordChanged: boolean;
}

const initialState: UserState = {
  isAuth: false,
  emailForPasswordReset: "",
  emailSignIn: "",
  isPasswordChanged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = action.payload;
    },
    setCurrentEmail: (state, action) => {
      state.emailSignIn = action.payload;
    },
    logOut: (state, action) => {
      state.isAuth = action.payload;
    },
    setEmailForPasswordReset: (state, action) => {
      state.emailForPasswordReset = action.payload;
    },
    setPasswordChanged: (state, action) => {
      state.isPasswordChanged = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logOut,
  setEmailForPasswordReset,
  setPasswordChanged,
  setCurrentEmail,
} = userSlice.actions;

export default userSlice.reducer;
