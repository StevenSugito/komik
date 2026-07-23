import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const genres = await prisma.genre.findMany({
      include: {
        _count: {
          select: {
            comics: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ genres });
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
