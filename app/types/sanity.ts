export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Type for Portable Text Block
export interface PortableTextBlock {
  _type: 'block';
  children: Array<{
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
  style?: string;
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
  description?: PortableTextBlock[]; // Using our own type definition
  sizes?: Array<{ size: string }>;
  color?: string;
  material?: string;
  careInstructions?: string;
} 