import { Tag } from './tag';
import { Client } from './client';

export class Project {
  _id?;
  background = '';
  name = '';
  place = '';
  tags: string[] = [];
  ceatedAt: Date = new Date();
  designDate: Date = new Date();
  dimensions = '';
  description = '';
  body = '';
  slug = '';
  client: Client = new Client();
  visibility = false;
  coverImages: string[] = [];
  brandingImages: string[] = [];
  isFirst?: boolean;
  isLast?: boolean;
}
