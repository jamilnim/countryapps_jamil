"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { Box, Card, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import FavouriteButton from "@/component/FavouriteButton";

const Countries = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const countries = useSelector((state) => state.countries.countries) || [];

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleCountryClick = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${slug}`);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      {countries.length === 0 && <Typography>Loading countries...</Typography>}

      {countries.map((country) => {
       
        const key = country.cca3 || country.cca2 || country.name.common;

        return (
          <React.Fragment key={key}>
            <Card
              sx={{
                width: 280,
                padding: 2,
                textAlign: "center",
              }}
            >
              <img
                src={country.flags?.svg || ""}
                alt={country.name?.common || "Country"}
                width={100}
              />

              <Typography variant="h6">
                {country.name?.common || "Unknown"}
              </Typography>

              <Typography variant="body2">
                Area: {country.area || "N/A"}
              </Typography>

              <FavouriteButton
                country={{
                  code:
                    country.cca3 ?? `${country.name.common}-${country.area}`,
                  name: country.name.common,
                  area: country.area,
                  flag: country.flags.svg,
                }}
              />

              <Button
                variant="outlined"
                color="success"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => handleCountryClick(country.name?.common || "")}
              >
                Check detail
              </Button>
            </Card>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Countries;
