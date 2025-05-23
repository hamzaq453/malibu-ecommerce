'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  trending: boolean;
  sizes: string[];
  category: string;
  color: string | string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Marine Mist Sequin Knit Maxi Dress Champagne',
    price: '$119.99 USD',
    image: '/Hero3.png',
    trending: true,
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    category: 'Maxi Dresses',
    color: 'champagne'
  },
  {
    id: 2,
    name: "Think I'm In Love Mini Dress Black/White Polka Dot",
    price: '$74.99 USD',
    image: '/Hero4.png',
    trending: true,
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    category: 'Mini Dresses',
    color: 'black'
  },
];

export default function ProductsPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(150);

  const colors = [
    'bg-white', 'bg-black', 'bg-red-500', 'bg-blue-500',
    'bg-pink-400', 'bg-green-500', 'bg-yellow-400', 'bg-orange-400',
    'bg-purple-500', 'bg-gray-600', 'bg-lime-400', 'bg-amber-500',
    'bg-rose-500', 'bg-sky-400', 'bg-indigo-500', 'bg-teal-500'
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-xl"
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full h-[300px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div
                  className={`absolute bottom-0 left-0 w-full flex flex-wrap justify-center gap-2 p-2 transition-all duration-300 ${
                    hovered === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                >
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="bg-white text-black text-xs px-2 py-1 border border-gray-400 rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                </div>

              <div className="p-3 text-center">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
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
