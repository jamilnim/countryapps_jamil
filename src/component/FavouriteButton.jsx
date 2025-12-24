"use client";

import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toggleFavourite } from "@/lib/features/favourites/favouritesSlice";

export default function FavouriteButton({ country }) {
  const dispatch = useDispatch();

  const favourites = useSelector(
    (state) => state.favourites.items
  );

  // 🔒 FORCE unique stable code
  const code = String(country.code);

  const isFavourite = favourites.some(
    (f) => f.code === code
  );

  return (
    <IconButton
      onClick={() =>
        dispatch(
          toggleFavourite({
            ...country,
            code, // always string, never undefined
          })
        )
      }
      sx={{ color: isFavourite ? "red" : "gray" }}
    >
      <FavoriteIcon />
    </IconButton>
  );
}
