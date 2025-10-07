"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Input,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Countries = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ✅ Use the correct property name from your slice
  const countries = useSelector((state) => state.countries.countries) || [];

  // move to sigle coutry handler

  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  console.log(countries);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap={"10px"}
    >
      {countries.length > 0 ? (
        countries.map((country, idx) => (
          <Card
            key={country.name.common}
            sx={{
              padding: "1px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <img src={country.flags.svg} width={100} />
            <br />
            {country.name.common} <br />
            {country.area}
            <br />
            {idx + 1}/{countries.length}
            <br />
            <Button
              variant="outlined"
              color="success"
              size="medium"
              onClick={() => handleCountryClick(country.name.common)}
            >
              Check detail
            </Button>
          </Card>
        ))
      ) : (
        <p>Loading countries...</p>
      )}
    </Box>
  );
};

export default Countries;
