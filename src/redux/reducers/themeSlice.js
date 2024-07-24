import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("dark-mode")) || false,
  unitType: localStorage.getItem("unit-type") || "Metric",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("dark-mode", JSON.stringify(state.isDarkMode));
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
      localStorage.setItem("unit-type", state.unitType);
    },
  },
});

export const { toggleTheme, setUnitType } = themeSlice.actions;
export default themeSlice.reducer;
