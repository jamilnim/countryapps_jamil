// src/lib/supabase/supabase-server.js
import { createClient } from "@supabase/supabase-js";

// Server-side client with SERVICE_ROLE key
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper to verify JWT from request
export const getAuthenticatedUser = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return { user: null, error: "No token" };

    const token = authHeader.split(" ")[1];
    const { data, error } = await supabaseServer.auth.getUser(token);

    if (error || !data.user) return { user: null, error: error?.message || "Invalid token" };
    return { user: data.user, error: null };
  } catch (err) {
    return { user: null, error: err.message };
  }
};
