'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
// import { allProductsQuery } from '@/app/lib/queries';
import { SanityProduct } from '@/app/types/sanity';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ProductsPage() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  // const [price, setPrice] = useState<number>(150);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string | null }>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Removed useEffect to control body overflow to prevent infinite re-render and black screen issue
  // useEffect(() => {
  //   if (isFilterOpen) {
  //     document.documentElement.style.overflow = 'hidden'; // Target html for full page scroll lock
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.documentElement.style.overflow = '';
  //     document.body.style.overflow = '';
  //   }

  //   return () => {
  //     document.documentElement.style.overflow = '';
  //     document.body.style.overflow = '';
  //   };
  // }, [isFilterOpen]);

  useEffect(() => {
    // Get favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const query = `*[_type == "product"]{
          _id,
          name,
          slug,
          price,
          compareAtPrice,
          images,
          sizes
        }`;
        const data = await client.fetch<SanityProduct[]>(query);
        if (!data) {
          throw new Error('No products found');
        }
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation(); // Prevent event bubbling

    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // const colors = [
  //   'bg-white', 'bg-black', 'bg-red-500', 'bg-blue-500',
  //   'bg-pink-400', 'bg-green-500', 'bg-yellow-400', 'bg-orange-400',
  //   'bg-purple-500', 'bg-gray-600', 'bg-lime-400', 'bg-amber-500',
  //   'bg-rose-500', 'bg-sky-400', 'bg-indigo-500', 'bg-teal-500'
  // ];

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="animate-pulse">
          <div className="bg-gray-200 h-[300px] rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="text-center py-10">
      <p className="text-red-500">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className={`relative flex flex-col md:flex-row min-h-screen bg-white text-gray-900`}>
      {/* Sidebar */}
      {/* <aside className={`fixed top-[64px] right-0 w-64 p-6 border-l border-gray-200 bottom-0 overflow-y-auto bg-white sidebar-scrollbar z-40 transition-transform duration-300 pb-20 ${
        isFilterOpen ? 'translate-x-0' : 'translate-x-full'
      } md:static md:translate-x-0 md:h-screen`}>
        <div className="flex justify-between items-center md:hidden mb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> */}
        {/* <h2 className="font-bold text-lg mb-4">DRESSES</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          {[
            "Mini Dresses",
            "Maxi Dresses",
            "Party Dresses",
            "Formal Dresses",
            "Day Dresses",
            "Strapless Dresses",
            "Long Sleeve Dresses",
            "Rompers",
            "Jumpsuits",
          ].map((item) => (
            <li
              key={item}
              className="hover:underline cursor-pointer hover:text-black transition-colors"
            >
              {item}
            </li>
          ))}
        </ul> */}

        {/* <h2 className="font-bold mt-9 mb-7 text-lg">COLOR</h2>
        <div className="grid grid-cols-4 gap-x-2 gap-y-3">
          {colors.map((bg, i) => (
            <span
              key={i}
              className={`${bg} w-8 h-8 rounded-full border border-gray-300 cursor-pointer`}
            />
          ))}
        </div> */}

        {/* <h2 className="font-bold mt-6 mb-2 text-lg">PRICE</h2>
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="200"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-gray-500"
          />
          <p className="text-sm mt-1 text-gray-600">Up to ${price}</p>
        </div> */}

        {/* <h2 className="font-bold mt-6 mb-2 text-lg">SIZE</h2>
        <div className="flex flex-wrap gap-2">
          {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <span
              key={size}
              className="border border-gray-300 px-3 py-1 text-sm rounded bg-white text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-black transition"
            >
              {size}
            </span>
          ))}
        </div> */}
      {/* </aside> */}

      {/* Product Grid */}
      <main className={`flex-1 py-4 px-2 md:p-8 overflow-y-auto`}>
        {/* Mobile Filter Button */}
        {/* <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center text-lg font-bold text-gray-900 focus:outline-none"
          >
            FILTERS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1 transition-transform duration-200"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div> */}

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage />
        ) : products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <Link href={`/products/${product.slug?.current || ''}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    {product.images && product.images[0] && (
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    {/* Wishlist Heart */}
                    <button 
                      onClick={(e) => toggleFavorite(product._id, e)}
                      className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-1.5 md:p-2 rounded-full bg-white/80 hover:bg-white shadow-sm"
                    >
                      {favorites.includes(product._id) ? (
                        <FaHeart className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                      ) : (
                        <FaRegHeart className="w-3 h-3 md:w-4 md:h-4 text-gray-400 hover:text-red-500" />
                      )}
                    </button>

                    {/* Quick Add Size Overlay */}
                    <div
                      className={`absolute bottom-[10%] left-0 right-0 bg-black/40 backdrop-blur-[2px] py-2 md:py-3 transition-all duration-300 ${
                        hoveredProduct === product._id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="flex flex-wrap justify-center gap-1 md:gap-2 px-1 md:px-2">
                        {product.sizes?.map((sizeObj) => (
                          <button
                            key={sizeObj.size}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSizeSelect(product._id, sizeObj.size);
                            }}
                            className={`px-2 md:px-3 py-1 md:py-1.5 text-xs font-medium border rounded-md transition-colors
                              ${
                                selectedSizes[product._id] === sizeObj.size
                                  ? 'border-white bg-white text-black'
                                  : 'border-gray-300 bg-black/30 text-white hover:bg-black/50'
                              }
                            `}
                          >
                            {sizeObj.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="mt-2 md:mt-4 text-center">
                  <h3 className="text-xs md:text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-xs md:text-sm font-medium text-gray-900">
                    ${product.price?.toFixed(2)} USD
                    {product.compareAtPrice && (
                      <span className="ml-1 md:ml-2 text-xs md:text-sm text-gray-500 line-through">
                        ${product.compareAtPrice.toFixed(2)} USD
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Overlay for mobile filter */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-filter backdrop-blur-md"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Scrollbar style */}
      <style jsx>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ccc;
          border-radius: 8px;
          border: 2px solid #f1f1f1;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #aaa;
        }
        .sidebar-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ccc #f1f1f1;
        }
      `}</style>
    </div>
  );
}