import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const sort = searchParams.get("sort") || "latest"; // latest, popular, updated
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const featured = searchParams.get("featured") === "true";
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: "desc" };
    if (sort === "popular") orderBy = { views: "desc" };
    if (sort === "updated") orderBy = { updatedAt: "desc" };

    const where: any = {};

    if (featured) {
      where.featured = true;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (genre) {
      where.genres = {
        some: {
          genre: {
            slug: genre,
          },
        },
      };
    }

    const [comics, total] = await Promise.all([
      prisma.comic.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
          chapters: {
            orderBy: { number: "desc" },
            take: 1,
            select: {
              id: true,
              number: true,
              title: true,
              publishedAt: true,
            },
          },
          _count: {
            select: {
              bookmarks: true,
              comments: true,
            },
          },
        },
      }),
      prisma.comic.count({ where }),
    ]);

    return NextResponse.json({
      comics,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching comics:", error);
    return NextResponse.json(
      { error: "Failed to fetch comics" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, coverImage, bannerImage, status, author, artist, genreIds } = body;

    const comic = await prisma.comic.create({
      data: {
        title,
        slug,
        description,
        coverImage,
        bannerImage,
        status,
        author,
        artist,
        genres: {
          create: genreIds?.map((genreId: string) => ({
            genre: { connect: { id: genreId } },
          })),
        },
      },
      include: {
        genres: {
          include: { genre: true },
        },
      },
    });

    return NextResponse.json(comic, { status: 201 });
  } catch (error) {
    console.error("Error creating comic:", error);
    return NextResponse.json(
      { error: "Failed to create comic" },
      { status: 500 }
    );
  }
}
