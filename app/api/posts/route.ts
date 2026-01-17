import { NextRequest, NextResponse } from "next/server";
import { db, posts, categories, subcategories } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

// API Key 검증
function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === process.env.N8N_API_KEY;
}

// GET: 포스트 목록 조회
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const published = searchParams.get("published");

  let result;

  if (published === "true") {
    result = await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit);
  } else {
    result = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(limit);
  }

  return NextResponse.json(result);
}

// POST: 새 포스트 생성 (n8n에서 호출)
export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      image,
      categorySlug,
      subcategorySlug,
      published = false,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "title and slug are required" },
        { status: 400 }
      );
    }

    // 카테고리/서브카테고리 ID 조회
    let categoryId = null;
    let subcategoryId = null;

    if (categorySlug) {
      const [cat] = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, categorySlug));
      categoryId = cat?.id || null;
    }

    if (subcategorySlug) {
      const [subcat] = await db
        .select()
        .from(subcategories)
        .where(eq(subcategories.slug, subcategorySlug));
      subcategoryId = subcat?.id || null;
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        slug,
        excerpt,
        content,
        image,
        categoryId,
        subcategoryId,
        published,
        publishedAt: published ? new Date() : null,
      })
      .returning();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating post:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCause = error instanceof Error && error.cause ? String(error.cause) : undefined;
    return NextResponse.json(
      { error: "Failed to create post", message: errorMessage, cause: errorCause },
      { status: 500 }
    );
  }
}
