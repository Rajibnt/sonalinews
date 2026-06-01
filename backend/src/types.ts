export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  imageUrl?: string;
};
