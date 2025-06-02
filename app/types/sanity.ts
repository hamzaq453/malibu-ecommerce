import { Image, PortableTextBlock } from 'sanity'

export interface SanityProduct {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: PortableTextBlock[];
  price: number;
  compareAtPrice?: number;
  images: Image[];
  mainCategory: {
    _ref: string;
    name: string;
  };
  subCategory?: {
    _ref: string;
    name: string;
  };
  isNewArrival: boolean;
  sizes: {
    size: string;
    stock: number;
  }[];
  color?: {
    name: string;
    hex: string;
  };
  material?: string;
  isAvailable: boolean;
} 