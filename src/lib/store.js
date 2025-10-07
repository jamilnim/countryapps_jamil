import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./features/countries/countriesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      countries: countryReducer,
    },
  });
};
