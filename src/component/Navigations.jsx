"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/app/context/AuthContext"; // ✅ Import your Auth hook
import { supabase } from "@/lib/supabase/supabase"; // ✅ To handle sign out
import ThemeToogle from "./ThemeToogle";

const Navigations = ({ children }) => {
  const router = useRouter();
  const { user, signOut } = useAuth(); // ✅ Get user from context

  const handleNavigation = (path) => {
    router.push(path);
  };

  // const signOut = async () => {
  //   await supabase.auth.signOut();
  //   router.push("/login");
  // };

  return (
    <div>
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* ✅ Left side: brand & main links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => handleNavigation("/")}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Countries App
              </Typography>
            </Button>

            <Button
              color="inherit"
              startIcon={<PublicIcon />}
              onClick={() => handleNavigation("/countries")}
            >
              Countries
            </Button>
            <ThemeToogle />

            <Button color="inherit" onClick={() => handleNavigation("/about")}>
              About
            </Button>

            {user && (
              <Button
                color="inherit"
                startIcon={<SecurityIcon />} // ✅ fixed capitalization
                onClick={() => handleNavigation("/protected")}
              >
                Protected
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={() => router.push("/profile")}>
                Profile
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={() => router.push("/favourites")}>
                Favourites
              </Button>
            )}
          </Box>

          {/* ✅ Right side: auth actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    opacity: 0.9,
                  }}
                >
                  Welcome, {user.email}
                </Typography>
                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={signOut}
                  variant="outlined"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={() => handleNavigation("/login")}
                variant="outlined"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ✅ Render page content below navbar */}
      {children}

      <AppBar position="static" color="primary" sx={{ mt: 3 }}>
        <Toolbar></Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigations;
