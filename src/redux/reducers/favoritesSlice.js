import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoritesKeys: JSON.parse(localStorage.getItem("favoritesKeys")) || [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const { key, city } = action.payload;
      if (!state.favoritesKeys.some((fav) => fav.key === key)) {
        state.favoritesKeys.push({ key, city });
        localStorage.setItem(
          "favoritesKeys",
          JSON.stringify(state.favoritesKeys)
        );
      }
    },
    removeFavorite: (state, action) => {
      const keyToRemove = action.payload;
      state.favoritesKeys = state.favoritesKeys.filter(
        (fav) => fav.key !== keyToRemove
      );
      localStorage.setItem(
        "favoritesKeys",
        JSON.stringify(state.favoritesKeys)
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
