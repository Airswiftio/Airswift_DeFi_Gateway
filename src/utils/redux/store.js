import { configureStore } from "@reduxjs/toolkit";
import stakingMenuReducer from "@@/utils/redux/store/stakingTypeSlice";
import slideMenuReducer from "@@/utils/redux/store/slideMenuSlice";

export const store = configureStore({
  reducer: {
    stakingMenu: stakingMenuReducer,
    slideMenu: slideMenuReducer,

  },
});
