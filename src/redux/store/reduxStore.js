import { configureStore } from "@reduxjs/toolkit";
import pageSelectReducer from "../reducers/pageSelectSlice";
import themeReducer from "../reducers/themeSlice";
import favoritesReducer from "../reducers/favoritesSlice";

const store = configureStore({
  reducer: {
    pageSelect: pageSelectReducer,
    theme: themeReducer,
    favorites: favoritesReducer,
  },
});

export default store;
