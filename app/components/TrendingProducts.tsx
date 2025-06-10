import React from 'react';
import Image from 'next/image';

const TrendingProducts: React.FC = () => {
  const products = [
    { name: 'Pink Malibu Hoodie', image: '/Image6.jpg' },
    { name: 'Sky Malibu Hoodie', image: '/Image7.jpg' },
    { name: 'White branded Tshirt', image: '/Image8.jpg' },
    { name: 'White branded Tshirt', image: '/Image4.jpg' },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <h2 className="text-3xl text-black font-bold text-center mb-6">TRENDING</h2>
      <div className="flex justify-center gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="relative w-64 h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <button className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-700 transition-colors duration-300">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts; 