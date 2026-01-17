import { NextRequest, NextResponse } from "next/server";
import { db, products, subcategories } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === process.env.N8N_API_KEY;
}

// GET: 제품 목록 조회
export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const subcategorySlug = searchParams.get("subcategory");
  const limit = parseInt(searchParams.get("limit") || "50");

  let result;

  if (subcategorySlug) {
    const [subcat] = await db
      .select()
      .from(subcategories)
      .where(eq(subcategories.slug, subcategorySlug));

    if (!subcat) {
      return NextResponse.json([]);
    }

    result = await db
      .select()
      .from(products)
      .where(eq(products.subcategoryId, subcat.id))
      .orderBy(desc(products.overallScore))
      .limit(limit);
  } else {
    result = await db
      .select()
      .from(products)
      .orderBy(desc(products.overallScore))
      .limit(limit);
  }

  return NextResponse.json(result);
}

// POST: 제품 생성/업데이트 (n8n에서 스크래핑 데이터로 호출)
export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const {
      name,
      slug,
      brand,
      image,
      affiliateUrl,
      price,
      subcategorySlug,
      overallScore,
      sentimentScore,
      valueScore,
      qualityScore,
      reviewCount,
      pros,
      cons,
      isExcluded,
      excludeReason,
    } = body;

    if (!name || !slug || !subcategorySlug) {
      return NextResponse.json(
        { error: "name, slug, and subcategorySlug are required" },
        { status: 400 }
      );
    }

    const [subcat] = await db
      .select()
      .from(subcategories)
      .where(eq(subcategories.slug, subcategorySlug));

    if (!subcat) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    // Upsert: 있으면 업데이트, 없으면 생성
    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug));

    if (existing) {
      const [updated] = await db
        .update(products)
        .set({
          name,
          brand,
          image,
          affiliateUrl,
          price,
          overallScore,
          sentimentScore,
          valueScore,
          qualityScore,
          reviewCount,
          pros,
          cons,
          isExcluded,
          excludeReason,
          updatedAt: new Date(),
        })
        .where(eq(products.slug, slug))
        .returning();
      return NextResponse.json(updated);
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        slug,
        brand,
        image,
        affiliateUrl,
        price,
        subcategoryId: subcat.id,
        overallScore,
        sentimentScore,
        valueScore,
        qualityScore,
        reviewCount,
        pros,
        cons,
        isExcluded,
        excludeReason,
      })
      .returning();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
