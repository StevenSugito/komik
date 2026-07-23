import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const comic = await prisma.comic.findUnique({
      where: { slug: params.slug },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        chapters: {
          orderBy: { number: "asc" },
          select: {
            id: true,
            number: true,
            title: true,
            publishedAt: true,
            views: true,
          },
        },
        _count: {
          select: {
            bookmarks: true,
            comments: true,
          },
        },
      },
    });

    if (!comic) {
      return NextResponse.json(
        { error: "Comic not found" },
        { status: 404 }
      );
    }

    // Increment views
    await prisma.comic.update({
      where: { id: comic.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(comic);
  } catch (error) {
    console.error("Error fetching comic:", error);
    return NextResponse.json(
      { error: "Failed to fetch comic" },
      { status: 500 }
    );
  }
}
