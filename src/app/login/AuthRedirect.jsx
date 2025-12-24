"use client";

import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function AuthRedirect() {
  const { user } = useAuth();
  const router = useRouter(); 

  useEffect(() => {
    if (user) {
      router.push("/protected"); 
    }
  }, [user, router]);

  return null;
}

export default AuthRedirect;
