'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SanityProduct } from '@/app/types/sanity';
import { FaHeart } from 'react-icons/fa';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const query = `*[_type == "product" && _id in $favorites]{
          _id,
          name,
          slug,
          price,
          compareAtPrice,
          images,
          sizes
        }`;
        const data = await client.fetch<SanityProduct[]>(query, { favorites });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching favorite products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  const removeFromFavorites = (productId: string) => {
    const newFavorites = favorites.filter(id => id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Favorites</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {products.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-500 text-base sm:text-lg mb-4">No favorite products yet</p>
            <Link 
              href="/products" 
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <Link href={`/products/${product.slug?.current || ''}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
                    {product.images && product.images[0] && (
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                </Link>

                <button
                  onClick={() => removeFromFavorites(product._id)}
                  className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/80 hover:bg-white shadow-sm"
                >
                  <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                </button>

                <div className="mt-2 sm:mt-4">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      ${product.price?.toFixed(2)} USD
                    </p>
                    {product.compareAtPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ${product.compareAtPrice.toFixed(2)} USD
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 