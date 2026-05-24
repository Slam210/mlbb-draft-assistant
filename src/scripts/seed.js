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
  const { errorPush } = await supabase
    .from("heroes")
    .upsert(heroes, { onConflict: "id", ignoreDuplicates: true });

  if (errorPush) {
    console.error(errorPush);
  } else {
    console.log("Seed complete");
  }

  const { data: dbHeroes, errorUpdate } = await supabase
    .from("heroes")
    .select("*");

  if (errorUpdate) {
    console.error(errorUpdate);
    return;
  }

  fs.writeFileSync(
    "./public/data/heroes_draft_data.json",
    JSON.stringify(dbHeroes, null, 2),
    "utf-8",
  );
}

seed();
