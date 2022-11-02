import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inactive: false,
};

export const stakingTypeSlice = createSlice({
  name: "stakingMenu",
  initialState,
  reducers: {
    inactive: (state) => {
      state.inactive = true;
    },
    active: (state) => {
      state.inactive = false;
    },
  },
});

export const { inactive, active } = stakingTypeSlice.actions;

export default stakingTypeSlice.reducer;
