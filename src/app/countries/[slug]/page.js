"use client";

import {
  clearSelectCountry,
  setSelectCountry,
  fetchCountries,
} from "@/lib/features/countries/countriesSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CountryPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ useSelector must be INSIDE the component
  const { selectedCountry, loading, error, countries } = useSelector(
    (state) => state.countries
  );

  // ✅ When user navigates to a country
  useEffect(() => {
    if (slug && countries.length > 0) {
      const countryName = decodeURIComponent(slug.replace(/-/g, " "));

      const foundCountry = countries.find(
        (country) =>
          country.name.common.toLowerCase() === countryName.toLowerCase() ||
          country.name.official.toLowerCase() === countryName.toLowerCase()
      );

      if (foundCountry) {
        dispatch(setSelectCountry(foundCountry));
      } else {
        dispatch(clearSelectCountry());
      }
    }

    // Cleanup
    return () => {
      dispatch(clearSelectCountry());
    };
  }, [slug, countries, dispatch]);

  //  Back navigation handler
  const handleBack = () => {
    router.push("/countries");
  };

  //  Loading and error handling
  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box color="red">Error: {error}</Box>;
  if (!selectedCountry)
    return (
      <Box>
        <Typography>Country not found</Typography>
        <Button onClick={handleBack}>Back</Button>
      </Box>
    );

  //  Main render
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Button variant="outlined" onClick={handleBack}>
        Back to Countries
      </Button>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {selectedCountry.name.common}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Image
            src={selectedCountry.flags.svg}
            alt={`Flag of ${selectedCountry.name.common}`}
            width={200}
            height={120}
          />

          <Typography>
            Capital: {selectedCountry.capital?.join(", ")}
          </Typography>
          <Typography>Population: {selectedCountry.population}</Typography>
          <Typography>Region: {selectedCountry.region}</Typography>
          <Typography>Subregion : {selectedCountry.subregion}</Typography>
          <Typography>Timezones : {selectedCountry.timezones}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

// ✅ Correct default export
export default CountryPage;
