import {
    createServerClient,
    parseCookieHeader,
    serializeCookieHeader,
  } from "@supabase/ssr";
  import { createClient } from "@supabase/supabase-js";
  import type { Database } from "supabase/database.types";
  
  
  export function createSupabaseAdminClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing Supabase URL or Service Role Key");
    }
  
    return createClient(supabaseUrl, supabaseServiceRoleKey);}
  
      //FIXME: xk aqui se le pasa el service role?
  // El service role deberia ser unicamente para cuando se necesite hacer operaciones de admin.
  // No es necesario devolver ninguna cookie ya que no se debe user para authentificar a un usuario
  export default function supabaseServerClient(request: Request) {
    const supabaseUrl = "http://127.0.0.1:54321";
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
      if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing Supabase URL or Service Role Key");
    }
      const headers = new Headers();
    const supabase = createServerClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append("Set-Cookie", serializeCookieHeader(name, value, options))
          );
        },
      },
    });
    return { supabase, headers };
  }