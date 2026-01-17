import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { categories, subcategories } from "../lib/db/schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { ssl: "require" });
const db = drizzle(client);

async function seed() {
  console.log("🌱 Seeding database...");

  // Insert categories
  const [audio] = await db
    .insert(categories)
    .values({
      name: "Audio",
      slug: "audio",
      description: "Headphones, Speakers, DACs",
      image: "/audio.png",
    })
    .returning();

  const [lifestyle] = await db
    .insert(categories)
    .values({
      name: "Lifestyle",
      slug: "lifestyle",
      description: "Home, Travel, EDC",
      image: "/lifestyle.png",
    })
    .returning();

  const [health] = await db
    .insert(categories)
    .values({
      name: "Health",
      slug: "health",
      description: "Fitness, Wellness, Sleep",
      image: "/health.png",
    })
    .returning();

  console.log("✓ Categories created");

  // Insert subcategories
  await db.insert(subcategories).values([
    // Audio subcategories
    {
      categoryId: audio.id,
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Bluetooth over-ear and on-ear headphones",
    },
    {
      categoryId: audio.id,
      name: "Hi-Res Audio",
      slug: "hi-res-audio",
      description: "High-resolution audio equipment",
    },
    {
      categoryId: audio.id,
      name: "Budget IEMs",
      slug: "budget-iems",
      description: "Affordable in-ear monitors",
    },
    // Lifestyle subcategories
    {
      categoryId: lifestyle.id,
      name: "Smart Home",
      slug: "smart-home",
      description: "Smart home devices and automation",
    },
    {
      categoryId: lifestyle.id,
      name: "Travel Bags",
      slug: "travel-bags",
      description: "Backpacks and luggage",
    },
    {
      categoryId: lifestyle.id,
      name: "Desk Setup",
      slug: "desk-setup",
      description: "Desk accessories and organization",
    },
    // Health subcategories
    {
      categoryId: health.id,
      name: "Recovery Tools",
      slug: "recovery-tools",
      description: "Massage guns and recovery equipment",
    },
    {
      categoryId: health.id,
      name: "Sleep Tech",
      slug: "sleep-tech",
      description: "Sleep trackers and aids",
    },
    {
      categoryId: health.id,
      name: "Home Gym",
      slug: "home-gym",
      description: "Home workout equipment",
    },
  ]);

  console.log("✓ Subcategories created");
  console.log("✅ Seeding complete!");

  await client.end();
}

seed().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
