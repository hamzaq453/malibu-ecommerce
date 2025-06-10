import { Image, PortableTextBlock } from 'sanity'

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityProduct {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
  price?: number;
  compareAtPrice?: number;
  images?: SanityImage[];
  description?: any; // This will be handled by PortableText
  sizes?: Array<{ size: string }>;
  color?: string;
  material?: string;
  careInstructions?: string;
} 