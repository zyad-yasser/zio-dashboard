import { Client } from './client';
import { Type } from './type';

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
  type: Type = new Type();
  visibility = false;
  coverImages: string[] = [];
  brandingImages: string[] = [];
  isFirst?: boolean;
  isLast?: boolean;
}
