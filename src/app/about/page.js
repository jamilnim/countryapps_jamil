"use client";

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import CloudIcon from "@mui/icons-material/Cloud";
import CodeIcon from "@mui/icons-material/Code";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Page Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        About Country Weather App
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Country Weather App is a modern web application built with Next.js,
        React, and Material UI (MUI) that allows users to explore countries and
        view real-time weather information through a clean and responsive
        interface.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Features Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Key Features
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Card 1 */}
        <Grid item xs={16} md={4} sx={{ display: "flex" }}>
          <Card elevation={3} sx={{ width: "100%", height: "100%" }}>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <PublicIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" mt={2}>
                Country Exploration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse and search countries with essential information such as
                region and<br/>capital city.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Card elevation={3} sx={{ width: "100%", height: "100%" }}>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CloudIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" mt={2}>
                Live Weather Data
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Displays real-time weather details including temperature,
                humidity, wind speed, <br/>and conditions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Card elevation={3} sx={{ width: "100%", height: "100%" }}>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CodeIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" mt={2}>
                Modern Tech Stack
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Built using Next.js, React, and Material UI with reusable,
                scalable components.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Technology Section */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Technology Stack
      </Typography>

      <Box component="ul" sx={{ pl: 3, color: "text.secondary" }}>
        <li>Next.js – Server-side rendering and optimized performance</li>
        <li>React – Component-based UI development</li>
        <li>Material UI (MUI) – Modern and accessible UI components</li>
        <li>Weather API – Real-time weather data integration</li>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Footer */}
      <Typography variant="body2" color="text.secondary">
        This project demonstrates API integration, responsive UI design, and
        scalable architecture using modern frontend technologies.
      </Typography>
    </Container>
  );
}
