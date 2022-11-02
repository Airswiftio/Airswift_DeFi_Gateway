import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
};

export const slideMenuSlice = createSlice({
  name: "slideMenu",
  initialState,
  reducers: {
    toggle: (state, { payload }) => {
      state.isMenuOpen = !payload;
    },
  },
});

export const { toggle } = slideMenuSlice.actions;

export default slideMenuSlice.reducer;
