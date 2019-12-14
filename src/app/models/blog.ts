import { Comment } from './comment';
import { Tag } from './tag';

export class Blog {
  title: string;
  date: Date;
  images: string[];
  body: string;
  comments: Comment[];
  tags: Tag[];
  categoryId: string;
  city: string;
  timeZone: string;
}
