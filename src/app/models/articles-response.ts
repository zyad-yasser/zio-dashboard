import { BlogItem } from './blog-item';

export class ArticlesResponse {
  page: number;
  totalPages: number;
  articles: BlogItem[];
}
