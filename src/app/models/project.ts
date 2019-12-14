import { Tag } from './tag';

export class Project {
  id?: string;
  background: string;
  name: string;
  place: string;
  tags: Tag[];
  date: Date;
  dimensions: string;
  caption: string;
  body: string;
  images: string[];
  isFirst?: boolean;
  isLast?: boolean;
}
