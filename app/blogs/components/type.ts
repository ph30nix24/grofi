export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  image: string;
  readTime: string;
  author: string;
  authorRole?: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}