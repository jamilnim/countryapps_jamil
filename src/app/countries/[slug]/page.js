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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CountryPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ useSelector must be INSIDE the component
  const { selectedCountry, loading, error, countries } = useSelector(
    (state) => state.countries
  );

  // weather data fatching
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    if (countries.length == 0) {
      dispatch(fetchCountries());
    }
  }, []);

  const fetchWeatherData = async (capital) => {
    if (!capital) return;
    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERAPI;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          capital
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Weateher data not available");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setWeatherError(err.message);
      console.error("Weather fe tch error:", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCountry?.capital?.[0]) {
      fetchWeatherData(selectedCountry.capital[0]);
    }
  }, [selectedCountry]);

  console.log(weatherData);

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
      {weatherLoading && <Typography>Loading weather data...</Typography>}
      {weatherError && (
        <Typography color="error">Error: {weatherError}</Typography>
      )}
      {weatherData && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Weather in {weatherData.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {weatherData.weather?.[0]?.icon && (
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  width={80}
                  height={80}
                />
              )}

              <Box>
                <Typography>
                  <strong>Condition:</strong>{" "}
                  {weatherData.weather?.[0]?.description}
                </Typography>
                <Typography>
                  <strong>Temperature:</strong> {weatherData.main?.temp}°C
                </Typography>
                <Typography>
                  <strong>Feels Like:</strong> {weatherData.main?.feels_like}°C
                </Typography>
                <Typography>
                  <strong>Humidity:</strong> {weatherData.main?.humidity}%
                </Typography>
                <Typography>
                  <strong>Wind Speed:</strong> {weatherData.wind?.speed} m/s
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

// ✅ Correct default export
export default CountryPage;
