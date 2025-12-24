"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import React from "react";
import AuthRedirect from "../login/AuthRedirect";

const Protected = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "Center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!user) {
    return <AuthRedirect />;
  }
  console.log(user);
  return (
    <Box sx={{ width: 1200, mx: "auto", p: 3 }}>
       <Typography variant="h1">Protected</Typography>
       <Typography variant="body1">{user.user_metadata.full_name}</Typography>
       <Typography variant="body1">{user.id}</Typography>
      <Typography variant="body1">{user.email}</Typography>

      <Image
     src={user.user_metadata.avatar_url}
     width={100}
     height={100}
     alt="Profile_Image"
     style={{
       borderRadius: "50%",
     }}
   />

    </Box>
  )
};


export default Protected;
