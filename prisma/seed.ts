import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create genres
  const genres = [
    { name: "Action", slug: "action", color: "#E74C3C" },
    { name: "Adventure", slug: "adventure", color: "#F39C12" },
    { name: "Comedy", slug: "comedy", color: "#F1C40F" },
    { name: "Drama", slug: "drama", color: "#9B59B6" },
    { name: "Fantasy", slug: "fantasy", color: "#3498DB" },
    { name: "Horror", slug: "horror", color: "#2C3E50" },
    { name: "Mystery", slug: "mystery", color: "#1ABC9C" },
    { name: "Romance", slug: "romance", color: "#E91E63" },
    { name: "Sci-Fi", slug: "sci-fi", color: "#00BCD4" },
    { name: "Slice of Life", slug: "slice-of-life", color: "#8BC34A" },
    { name: "Sports", slug: "sports", color: "#FF9800" },
    { name: "Supernatural", slug: "supernatural", color: "#673AB7" },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: {},
      create: genre,
    });
  }

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mangaverse.com" },
    update: {},
    create: {
      email: "admin@mangaverse.com",
      username: "admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create sample comics
  const sampleComics = [
    {
      title: "Shadow Blade Chronicles",
      slug: "shadow-blade-chronicles",
      description: "In a world where shadows hold power, a young warrior discovers the ancient art of shadow blade fighting. As dark forces rise, he must master his abilities to protect everything he loves.",
      coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=1200&h=400&fit=crop",
      status: "ONGOING" as const,
      author: "Kaito Tanaka",
      artist: "Yuki Sato",
      featured: true,
      views: 15420,
      genreSlugs: ["action", "fantasy", "adventure"],
    },
    {
      title: "Starlight Academy",
      slug: "starlight-academy",
      description: "At the prestigious Starlight Academy, students compete to become the next generation of magical guardians. Follow Hana as she navigates friendship, rivalry, and her own hidden potential.",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=800&fit=crop",
      bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&h=400&fit=crop",
      status: "ONGOING" as const,
      author: "Mei Lin",
      artist: "Sakura Kim",
      featured: true,
      views: 12350,
      genreSlugs: ["fantasy", "romance", "slice-of-life"],
    },
    {
      title: "Cyber Heart",
      slug: "cyber-heart",
      description: "In 2087, human consciousness can be uploaded to digital networks. When a detective's partner is murdered, she must dive into the digital underworld to find the truth.",
      coverImage: "https://images.unsplash.com/photo-1614726365723-49cfae9278b7?w=600&h=800&fit=crop",
      status: "ONGOING" as const,
      author: "Ren Hiroshi",
      artist: "Mika Takeda",
      featured: true,
      views: 9870,
      genreSlugs: ["sci-fi", "mystery", "action"],
    },
    {
      title: "Garden of Whispers",
      slug: "garden-of-whispers",
      description: "A mysterious garden appears in the city, and those who enter find their deepest desires... and darkest fears. A psychological thriller that blurs the line between reality and dreams.",
      coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=800&fit=crop",
      status: "COMPLETED" as const,
      author: "Aiko Mori",
      artist: "Takeshi Yamamoto",
      featured: false,
      views: 8760,
      genreSlugs: ["horror", "mystery", "supernatural"],
    },
    {
      title: "Love in the Rain",
      slug: "love-in-the-rain",
      description: "Two strangers meet during a thunderstorm and share an umbrella. What starts as a chance encounter blossoms into a beautiful romance filled with laughter, tears, and unforgettable moments.",
      coverImage: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&h=800&fit=crop",
      status: "ONGOING" as const,
      author: "Yuna Park",
      artist: "Minji Choi",
      featured: false,
      views: 7650,
      genreSlugs: ["romance", "drama", "slice-of-life"],
    },
    {
      title: "Dragon's Heir",
      slug: "dragons-heir",
      description: "When the last dragon falls, its power transfers to an unsuspecting teenager. Now hunted by those who want the dragon's power, he must learn to control his new abilities.",
      coverImage: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=800&fit=crop",
      status: "HIATUS" as const,
      author: "Kenji Matsuda",
      artist: "Rin Ogawa",
      featured: false,
      views: 11200,
      genreSlugs: ["fantasy", "action", "adventure"],
    },
    {
      title: "Court of Dreams",
      slug: "court-of-dreams",
      description: "In a realm where dreams are currency, a young dreamweaver must navigate political intrigue and ancient magic to save her kingdom from a nightmare that threatens to consume everything.",
      coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=800&fit=crop",
      status: "ONGOING" as const,
      author: "Luna Chen",
      artist: "Hana Wu",
      featured: true,
      views: 6540,
      genreSlugs: ["fantasy", "supernatural", "drama"],
    },
    {
      title: "Speed Demons",
      slug: "speed-demons",
      description: "Underground racing meets supernatural powers in this high-octane series. When a washed-up racer discovers his car is possessed, he gets a second chance at glory.",
      coverImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=800&fit=crop",
      status: "ONGOING" as const,
      author: "Takumi Sato",
      artist: "Koji Nakamura",
      featured: false,
      views: 5430,
      genreSlugs: ["sports", "action", "supernatural"],
    },
  ];

  for (const comicData of sampleComics) {
    const { genreSlugs, ...comicInfo } = comicData;

    const comic = await prisma.comic.upsert({
      where: { slug: comicInfo.slug },
      update: {},
      create: comicInfo,
    });

    // Add genres
    for (const slug of genreSlugs) {
      const genre = await prisma.genre.findUnique({ where: { slug } });
      if (genre) {
        await prisma.genreOnComic.upsert({
          where: {
            comicId_genreId: {
              comicId: comic.id,
              genreId: genre.id,
            },
          },
          update: {},
          create: {
            comicId: comic.id,
            genreId: genre.id,
          },
        });
      }
    }

    // Add sample chapters
    for (let i = 1; i <= 5; i++) {
      await prisma.chapter.upsert({
        where: {
          comicId_number: {
            comicId: comic.id,
            number: i,
          },
        },
        update: {},
        create: {
          number: i,
          title: `Chapter ${i}: ${getChapterTitle(comicInfo.slug, i)}`,
          pages: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1200&fit=crop",
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop",
            "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=1200&fit=crop",
          ],
          comicId: comic.id,
        },
      });
    }
  }

  console.log("✅ Seed completed successfully!");
  console.log(`- ${genres.length} genres created`);
  console.log(`- Admin user: admin@mangaverse.com / admin123`);
  console.log(`- ${sampleComics.length} sample comics with chapters created`);
}

function getChapterTitle(slug: string, chapter: number): string {
  const titles: Record<string, string[]> = {
    "shadow-blade-chronicles": ["The Awakening", "First Blood", "Shadow Training", "The Dark Guild", "Revelation"],
    "starlight-academy": ["First Day", "The Test", "Hidden Power", "Rivalry", "Midnight Training"],
    "cyber-heart": ["Digital Murder", "The Upload", "Neon Streets", "Ghost in the Machine", "Firewall"],
    "garden-of-whispers": ["The Gate Opens", "Whispering Flowers", "Deep Roots", "Thorny Path", "Final Bloom"],
    "love-in-the-rain": ["The Umbrella", "Coffee Date", "Confession", "Distance", "Together Again"],
    "dragons-heir": ["The Fall", "New Power", "Hunted", "Dragon's Lair", "Transformation"],
    "court-of-dreams": ["The Dream Market", "Nightmare Rising", "Weaver's Trial", "Court Intrigue", "Awakening"],
    "speed-demons": ["The Comeback", "Possessed", "First Race", "Rival Crew", "Final Lap"],
  };
  return titles[slug]?.[chapter - 1] || `Episode ${chapter}`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
