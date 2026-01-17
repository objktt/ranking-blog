import { NextRequest, NextResponse } from "next/server";
import { db, posts } from "@/lib/db";
import { eq } from "drizzle-orm";

function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === process.env.N8N_API_KEY;
}

// GET: 단일 포스트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PATCH: 포스트 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json();

  const [updated] = await db
    .update(posts)
    .set({
      ...body,
      updatedAt: new Date(),
      ...(body.published && !body.publishedAt ? { publishedAt: new Date() } : {}),
    })
    .where(eq(posts.slug, slug))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

// DELETE: 포스트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const [deleted] = await db
    .delete(posts)
    .where(eq(posts.slug, slug))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
