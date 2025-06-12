'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { SanityProduct } from '@/app/types/sanity';
import { PortableText } from '@portabletext/react';
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = React.useState<SanityProduct | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const { addItem } = useCart();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;
    const image = e.currentTarget.querySelector('img');
    if (!image) return;
    
    const rect = image.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const query = `*[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          slug,
          price,
          compareAtPrice,
          images,
          description,
          sizes,
          color,
          material,
          careInstructions
        }`;

        const data = await client.fetch(query, { slug });
        if (!data) {
          throw new Error('Product not found');
        }
        setProduct(data);

        // Check if product is in favorites
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites);
          setIsWishlist(favorites.includes(data._id));
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (slug && slug !== 'undefined') {
      fetchProduct();
    } else {
      setError('Invalid product URL');
      setLoading(false);
    }
  }, [slug]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !product || !product.images?.[0]) return;
    
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price || 0,
      size: selectedSize,
      quantity: 1,
      image: product.images[0],
    });
  };

  const toggleWishlist = () => {
    if (!product) return;

    const storedFavorites = localStorage.getItem('favorites');
    let favorites: string[] = [];
    
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    if (isWishlist) {
      favorites = favorites.filter(id => id !== product._id);
    } else {
      favorites.push(product._id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsWishlist(!isWishlist);
    
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

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link href="/products" className="text-blue-500 hover:underline">
          Return to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl mb-4">Product not found</div>
        <Link href="/products" className="text-blue-500 hover:underline">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Main Product Section */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-16">
          {/* Left Side: Image Gallery */}
          <div className="flex-1 self-start flex flex-col md:flex-row md:gap-4 md:sticky md:top-4">
            {/* Thumbnails */}
            <div className="hidden md:flex w-24 flex-col gap-2 max-h-[500px] overflow-y-auto no-scrollbar">
              {product.images?.map((image, index) => (
                <div
                  key={index}
                  className={`relative flex-shrink-0 w-full h-[120px] cursor-pointer rounded-sm overflow-hidden ${
                    currentImageIndex === index ? 'border-2 border-gray-400' : 'border border-gray-200'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={urlFor(image).url()}
                    alt={`${product.name} - View ${index + 1}`}
                    fill
                    className="object-cover hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full md:flex-1">
              <div className="relative">
                <div 
                  className="relative h-[400px] sm:h-[400px] md:h-[500px]"
                  onMouseEnter={() => setShowZoom(true)}
                  onMouseLeave={() => setShowZoom(false)}
                  onMouseMove={handleMouseMove}
                >
                  {product.images && product.images[currentImageIndex] && (
                    <div className="block md:hidden w-full h-full relative">
                      <Image
                        src={urlFor(product.images[currentImageIndex]).url()}
                        alt={product.name}
                        width={400}
                        height={400}
                        className={`object-cover w-full h-full rounded transition-transform duration-200 ${showZoom ? 'scale-150' : 'scale-100'}`}
                      />
                    </div>
                  )}
                  {product.images && product.images[currentImageIndex] && (
                    <div className="hidden md:block w-full h-full relative">
                      <Image
                        src={urlFor(product.images[currentImageIndex]).url()}
                        alt={product.name}
                        fill
                        className={`object-cover rounded transition-transform duration-200 ${showZoom ? 'scale-150' : 'scale-100'}`}
                      />
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : product.images!.length - 1))}
                    className="p-2 rounded-full bg-white/80 hover:bg-white"
                  >
                    <FaChevronLeft />
                  </button>
                  {product.images?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        currentImageIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev < product.images!.length - 1 ? prev + 1 : 0))}
                    className="p-2 rounded-full bg-white/80 hover:bg-white"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="w-full md:w-96 space-y-4 md:space-y-6">
            {/* Product Title and Wishlist */}
            <div className="flex justify-between items-center">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{product.name}</h1>
              <button
                onClick={toggleWishlist}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                {isWishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>

            {/* Price and Afterpay */}
            <div>
              <p className="text-lg md:text-3xl text-gray-700 font-semibold">
                ${product.price?.toFixed(2)} USD
              </p>
            </div>

            {/* Shipping Banner */}
            <div className="w-full bg-pink-300 text-pink-900 text-center text-sm font-semibold py-2 rounded">
               2 DAY SHIPPING
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">
                  Size: {selectedSize || 'Select a size'}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes?.map((sizeObj) => (
                  <button
                    key={sizeObj.size}
                    onClick={() => handleSizeSelect(sizeObj.size)}
                    className={`border px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${
                        selectedSize === sizeObj.size
                          ? 'border-black bg-white text-black'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }
                    `}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedSize}
            >
              {selectedSize ? '+ ADD TO BAG' : 'SELECT A SIZE'}
            </button>

            {/* Accordion Sections */}
            <div className="border-t text-black border-gray-200 mt-6">
              <details className="py-3 group">
                <summary className="text-sm font-medium cursor-pointer flex items-center justify-between">
                  DESCRIPTION
                  <svg className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </summary>
                <div className="text-sm text-gray-600 mt-2">
                  {product.description && (
                    <PortableText
                      value={product.description}
                      components={{
                        block: ({ children }) => <p className="mb-4">{children}</p>,
                      }}
                    />
                  )}
                  {product.material && (
                    <ul className="list-disc list-inside mt-2">
                      <li>Material: {product.material}</li>
                    </ul>
                  )}
                </div>
              </details>

              <details className="border-t border-gray-200 py-3 group">
                <summary className="text-sm font-medium cursor-pointer flex items-center justify-between">
                  DELIVERY
                  <svg className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </summary>
                <div className="text-sm text-gray-600 mt-2">
                  <p>Express delivery and AfterPay available.</p>
                  <p className="mt-1">Our USA warehouse is here! 2 day shipping USA</p>
                  <p className="mt-1">$99 away from free standard shipping</p>
                </div>
              </details>

              <details className="border-t border-gray-200 py-3 group">
                <summary className="text-sm font-medium cursor-pointer flex items-center justify-between">
                  RETURNS
                  <svg className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </summary>
                <div className="text-sm text-gray-600 mt-2">
                  <p>
                    If you are unhappy with your purchase, full priced items or items using discount codes can be returned
                    for a Store Credit.
                  </p>
                  <p className="mt-2">
                    Please note: We do not accept change of mind returns on sale items, fake tan, socks, lingerie or
                    earrings unless defective or faulty.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;