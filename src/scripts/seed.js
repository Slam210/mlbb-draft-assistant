import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import fs from "fs";

console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const heroes = JSON.parse(
  fs.readFileSync("./public/data/heroes_draft_data.json", "utf-8"),
);

async function seed() {
  const { error } = await supabase.from("heroes").upsert(heroes);

  if (error) {
    console.error(error);
  } else {
    console.log("Seed complete");
  }
}

seed();
