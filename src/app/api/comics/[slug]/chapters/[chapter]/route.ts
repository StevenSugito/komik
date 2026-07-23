import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string; chapter: string } }
) {
  try {
    const chapterNumber = parseInt(params.chapter);

    const comic = await prisma.comic.findUnique({
      where: { slug: params.slug },
      select: { id: true, title: true, slug: true },
    });

    if (!comic) {
      return NextResponse.json(
        { error: "Comic not found" },
        { status: 404 }
      );
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        comicId_number: {
          comicId: comic.id,
          number: chapterNumber,
        },
      },
      include: {
        comic: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
          },
        },
      },
    });

    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found" },
        { status: 404 }
      );
    }

    // Get prev/next chapters
    const [prevChapter, nextChapter] = await Promise.all([
      prisma.chapter.findFirst({
        where: {
          comicId: comic.id,
          number: { lt: chapterNumber },
        },
        orderBy: { number: "desc" },
        select: { number: true },
      }),
      prisma.chapter.findFirst({
        where: {
          comicId: comic.id,
          number: { gt: chapterNumber },
        },
        orderBy: { number: "asc" },
        select: { number: true },
      }),
    ]);

    // Increment chapter views
    await prisma.chapter.update({
      where: { id: chapter.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      chapter,
      prevChapter: prevChapter?.number || null,
      nextChapter: nextChapter?.number || null,
    });
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapter" },
      { status: 500 }
    );
  }
}
