import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("selectedPage") || "Home",
};

const pageSelectSlice = createSlice({
  name: "pageSelect",
  initialState,
  reducers: {
    selectHome: (state) => {
      state.value = "Home";
      localStorage.setItem("selectedPage", state.value);
    },
    selectFaves: (state) => {
      state.value = "Faves";
      localStorage.setItem("selectedPage", state.value);
    },
  },
});

export const { selectHome, selectFaves } = pageSelectSlice.actions;
export default pageSelectSlice.reducer;
