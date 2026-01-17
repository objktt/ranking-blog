import { NextRequest, NextResponse } from "next/server";
import { db, categories, subcategories } from "@/lib/db";
import { eq } from "drizzle-orm";

function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === process.env.N8N_API_KEY;
}

// GET: 카테고리 + 서브카테고리 목록
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cats = await db.select().from(categories);
    const subcats = await db.select().from(subcategories);

    const result = cats.map((cat) => ({
      ...cat,
      subcategories: subcats.filter((sub) => sub.categoryId === cat.id),
    }));

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Error fetching topics:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCause = error instanceof Error && error.cause ? String(error.cause) : undefined;
    return NextResponse.json(
      {
        error: "Failed to fetch topics",
        message: errorMessage,
        cause: errorCause,
        dbUrl: process.env.DATABASE_URL ? "set" : "not set"
      },
      { status: 500 }
    );
  }
}

// POST: 카테고리 또는 서브카테고리 생성
export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, name, slug, description, image, categorySlug } = body;

    if (!type || !name || !slug) {
      return NextResponse.json(
        { error: "type, name, and slug are required" },
        { status: 400 }
      );
    }

    if (type === "category") {
      const [newCat] = await db
        .insert(categories)
        .values({ name, slug, description, image })
        .returning();
      return NextResponse.json(newCat, { status: 201 });
    }

    if (type === "subcategory") {
      if (!categorySlug) {
        return NextResponse.json(
          { error: "categorySlug is required for subcategory" },
          { status: 400 }
        );
      }

      const [cat] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, categorySlug));

      if (!cat) {
        return NextResponse.json(
          { error: "Category not found" },
          { status: 404 }
        );
      }

      const [newSubcat] = await db
        .insert(subcategories)
        .values({ name, slug, description, categoryId: cat.id })
        .returning();
      return NextResponse.json(newSubcat, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { error: "Failed to create topic" },
      { status: 500 }
    );
  }
}
