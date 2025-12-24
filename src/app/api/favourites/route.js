// src/app/api/favourites/route.js
import { supabaseServer, getAuthenticatedUser } from "@/lib/supabase/supabase-server";

export async function GET(req) {
  const { user, error } = await getAuthenticatedUser(req);
  if (!user) return new Response(JSON.stringify({ error }), { status: 401 });

  const { data, error: dbError } = await supabaseServer
    .from("favourites")
    .select("*")
    .eq("user_id", user.id);

  if (dbError) return new Response(JSON.stringify({ error: dbError.message }), { status: 500 });
  return new Response(JSON.stringify(data || []), { status: 200 });
}

export async function POST(req) {
  const { user } = await getAuthenticatedUser(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { code, name } = await req.json();
  const { error: dbError } = await supabaseServer
    .from("favourites")
    .upsert([{ code, name, user_id: user.id }]);

  if (dbError) return new Response(JSON.stringify({ error: dbError.message }), { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(req) {
  const { user } = await getAuthenticatedUser(req);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const { code } = await req.json();
  const { error: dbError } = await supabaseServer
    .from("favourites")
    .delete()
    .eq("user_id", user.id)
    .eq("code", code);

  if (dbError) return new Response(JSON.stringify({ error: dbError.message }), { status: 500 });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
