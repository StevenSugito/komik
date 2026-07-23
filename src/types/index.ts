export interface Comic {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  bannerImage?: string | null;
  status: "ONGOING" | "COMPLETED" | "HIATUS";
  author: string;
  artist?: string | null;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  genres: { genre: Genre }[];
  chapters: Chapter[];
  ratings: Rating[];
  _count?: {
    bookmarks: number;
    comments: number;
  };
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color: string;
}

export interface Chapter {
  id: string;
  number: number;
  title?: string | null;
  pages: string[];
  publishedAt: string;
  views: number;
  comicId: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string | null;
  role: "READER" | "AUTHOR" | "ADMIN";
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  replies?: Comment[];
}

export interface Rating {
  id: string;
  score: number;
  userId: string;
}

export interface Bookmark {
  id: string;
  comicId: string;
  comic: Comic;
  createdAt: string;
}
