"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import FavouriteButton from "@/component/FavouriteButton";

export default function FavouritesPage() {
  const router = useRouter();

  const favourites = useSelector(
    (state) => state.favourites.items
  );

  if (favourites.length === 0) {
    return <Typography p={4}>No favourites yet ❤️</Typography>;
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      justifyContent="center"
      p={2}
    >
      {favourites.map((country) => (
        <Card
          key={country.code}
          sx={{
            width: 280,
            padding: 2,
            textAlign: "center",
          }}
        >
          <img
            src={country.flag}
            alt={country.name}
            width={100}
          />

          <Typography variant="h6">
            {country.name}
          </Typography>

          <Typography variant="body2">
            Area: {country.area}
          </Typography>

          <FavouriteButton country={country} />

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() =>
              router.push(
                `/countries/${country.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`
              )
            }
          >
            Check detail
          </Button>
        </Card>
      ))}
    </Box>
  );
}
