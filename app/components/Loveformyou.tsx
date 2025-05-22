'use client'

import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface Product {
  name: string;
  image: string;
  price: string;
  discount?: string;
}

export default function Home() {
  const products: Product[] = [
    { name: 'With Love In The Moment Oversized Hoodie Grey Marle', image: '/images/product1.png', price: '$69.99 USD', discount: '15% OFF' },
    { name: 'In The Back Of My Mind Mini Dress Chocolate Polka Dot', image: '/images/product2.png', price: '$64.99 USD' },
    { name: 'Offstage Hoodie Moon', image: '/images/product3.png', price: '$69.99 USD' },
    { name: 'Sirena Rib Tank White', image: '/images/product4.png', price: '$49.99 USD' },
    { name: '11th Street She\'s So Lucky Oversized Hoodie Leopard Splice', image: '/images/product5.png', price: '$69.99 USD' },
    { name: 'Tonia Soul Of The Heart Mini Dress Chocolate Polka Dot', image: '/images/product6.png', price: '$64.99 USD' },
    { name: 'Cherange Roodie Noon', image: '/images/product7.png', price: '$69.99 USD' },
    { name: 'Sirena Rib Tank White', image: '/images/product8.png', price: '$49.99 USD' },
    { name: '11th Street She\'s So Lucky Oversized Hoodie Leopard Splice', image: '/images/product9.png', price: '$69.99 USD' },
    { name: 'Tonia Soul Of The Heart Mini Dress Chocolate Polka Dot', image: '/images/product10.png', price: '$64.99 USD' },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll by fixed amount on button clicks
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Infinite loop effect on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Duplicate width to calculate boundary
    const productWidth = container.firstElementChild?.clientWidth || 0;
    const totalProducts = products.length;
    const totalScrollWidth = productWidth * totalProducts;

    const onScroll = () => {
      if (!container) return;

      // If scrolled to right end (past original + duplicate), reset to original start
      if (container.scrollLeft >= totalScrollWidth) {
        container.scrollLeft -= totalScrollWidth;
      }

      // If scrolled to left end (before original), reset to duplicate end
      else if (container.scrollLeft <= 0) {
        container.scrollLeft += totalScrollWidth;
      }
    };

    container.addEventListener('scroll', onScroll);

    // Initialize scroll position to the original products start (middle)
    container.scrollLeft = totalScrollWidth;

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [products]);

  return (
    <div className="container mx-auto py-8 bg-white min-h-screen">
      {/* LOVE THESE FOR YOU Section */}
      <div className="relative">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          LOVE THESE FOR YOU <span className="text-red-500">♥</span>
        </h2>
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 z-10"
        >
          ←
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={(e) => {
            const container = scrollContainerRef.current;
            if (!container) return;
            const startX = e.pageX - container.offsetLeft;
            const scrollLeftStart = container.scrollLeft;
            const onMouseMove = (e: MouseEvent) => {
              e.preventDefault();
              const x = e.pageX - container.offsetLeft;
              const walk = (x - startX) * 1.5;
              container.scrollLeft = scrollLeftStart - walk;
            };
            const onMouseUp = () => {
              container.removeEventListener('mousemove', onMouseMove);
              container.removeEventListener('mouseup', onMouseUp);
            };
            container.addEventListener('mousemove', onMouseMove);
            container.addEventListener('mouseup', onMouseUp);
          }}
        >
          {/* Render products twice to enable looping */}
          {[...products, ...products].map((product, index) => (
            <div key={index} className="flex-none w-64">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                layout="responsive"
                className="rounded-none shadow-md"
              />
              <div className="text-center mt-2">
                <p className="text-sm text-gray-800">{product.name}</p>
                <p className="text-lg font-semibold text-gray-800">{product.price}</p>
                {product.discount && (
                  <p className="text-red-500 text-sm">{product.discount}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 z-10"
        >
          →
        </button>
      </div>
    </div>
  );
}
