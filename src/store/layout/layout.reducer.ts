import { createSlice } from "@reduxjs/toolkit";

interface layoutState {
  burgerIsOpen: boolean;
}

const initialState: layoutState = {
  burgerIsOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setBurgerState: (state, action) => {
      state.burgerIsOpen = action.payload;
    },
  },
});

export const { setBurgerState } = layoutSlice.actions;
export default layoutSlice.reducer;
