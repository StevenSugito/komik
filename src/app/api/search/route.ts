import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return NextResponse.json({ comics: [] });
    }

    const comics = await prisma.comic.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            author: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
      include: {
        genres: {
          include: { genre: true },
        },
        _count: {
          select: {
            bookmarks: true,
          },
        },
      },
    });

    return NextResponse.json({ comics });
  } catch (error) {
    console.error("Error searching comics:", error);
    return NextResponse.json(
      { error: "Failed to search comics" },
      { status: 500 }
    );
  }
}
