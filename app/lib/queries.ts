import { groq } from 'next-sanity'

export const allProductsQuery = groq`
  *[_type == "product" && isAvailable == true] {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    images,
    "mainCategory": mainCategory->{
      _id,
      name,
      "slug": slug.current
    },
    "subCategory": subCategory->{
      _id,
      name,
      "slug": slug.current
    },
    isNewArrival,
    sizes,
    color,
    isAvailable
  }
`

export const productsByMainCategoryQuery = groq`
  *[_type == "product" && mainCategory._ref == $categoryId && isAvailable == true] {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    images,
    "mainCategory": mainCategory->{
      _id,
      name,
      "slug": slug.current
    },
    "subCategory": subCategory->{
      _id,
      name,
      "slug": slug.current
    },
    isNewArrival,
    sizes,
    color,
    isAvailable
  }
` 