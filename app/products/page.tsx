'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { allProductsQuery } from '@/app/lib/queries';
import { SanityProduct } from '@/app/types/sanity';

export default function ProductsPage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(150);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await client.fetch<SanityProduct[]>(allProductsQuery);
        if (!data) {
          throw new Error('No products found');
        }
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const colors = [
    'bg-white', 'bg-black', 'bg-red-500', 'bg-blue-500',
    'bg-pink-400', 'bg-green-500', 'bg-yellow-400', 'bg-orange-400',
    'bg-purple-500', 'bg-gray-600', 'bg-lime-400', 'bg-amber-500',
    'bg-rose-500', 'bg-sky-400', 'bg-indigo-500', 'bg-teal-500'
  ];

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
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside className="w-72 p-6 border-r border-gray-200 sticky top-0 h-screen overflow-y-auto bg-white sidebar-scrollbar">
        <h2 className="font-bold text-lg mb-4">DRESSES</h2>
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
        </ul>

        <h2 className="font-bold mt-9 mb-7 text-lg">COLOR</h2>
        <div className="grid grid-cols-4 gap-x-2 gap-y-3">
          {colors.map((bg, i) => (
            <span
              key={i}
              className={`${bg} w-8 h-8 rounded-full border border-gray-300 cursor-pointer`}
            />
          ))}
        </div>

        <h2 className="font-bold mt-6 mb-2 text-lg">PRICE</h2>
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
        </div>

        <h2 className="font-bold mt-6 mb-2 text-lg">SIZE</h2>
        <div className="flex flex-wrap gap-2">
          {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <span
              key={size}
              className="border border-gray-300 px-3 py-1 text-sm rounded bg-white text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-black transition"
            >
              {size}
            </span>
          ))}
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-8">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage />
        ) : products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative group border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-xl"
                onMouseEnter={() => setHovered(product._id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative w-full h-[300px]">
                  {product.images && product.images[0] && (
                    <Image
                      src={urlFor(product.images[0]).url()}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  <div
                    className={`absolute bottom-0 left-0 w-full flex flex-wrap justify-center gap-2 p-2 transition-all duration-300 ${
                      hovered === product._id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                  >
                    {product.sizes?.map((sizeObj) => (
                      <span
                        key={sizeObj.size}
                        className="bg-white text-black text-xs px-2 py-1 border border-gray-400 rounded"
                      >
                        {sizeObj.size}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 text-center">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    ${product.price.toFixed(2)} USD
                    {product.compareAtPrice && (
                      <span className="ml-2 line-through text-gray-500">
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
