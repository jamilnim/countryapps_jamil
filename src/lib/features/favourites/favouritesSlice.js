import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const country = action.payload;

      const exists = state.items.find(
        (item) => item.code === country.code
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.code !== country.code
        );
      } else {
        state.items.push(country);
      }
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
