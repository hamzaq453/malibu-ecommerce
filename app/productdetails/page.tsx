'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDetailsPage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index in original productImages
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Original sample image paths (replace with your actual image paths)
  const originalProductImages = useMemo(() => [
    '/product1.avif',
    '/product2.avif',
    '/product3.avif',
    '/product4.avif',
    '/product5.avif',
    '/product6.avif',
  ], []);

  // Create duplicated images for infinite scroll (add last few at start, first few at end)
  // Adding 2 at the start and 2 at the end for a seamless loop with 2 images visible
  const duplicatedProductImages = useMemo(() => {
      const numDuplicates = 2;
      const startDuplicates = originalProductImages.slice(-numDuplicates);
      const endDuplicates = originalProductImages.slice(0, numDuplicates);
      return [...startDuplicates, ...originalProductImages, ...endDuplicates];
  }, [originalProductImages]);

  const sizes = ['3XS/XXS', 'XXS/XS', 'XS/S', 'S/M', 'M/L', 'L/XL', 'XL/XXL'];
  const colorVariants = [
    { name: 'Moon', image: '/moon.jpg' },
    { name: 'Glacier Grey', image: '/glacier.jpg' },
    { name: 'Azure', image: '/azure.jpg' },
    { name: 'Amazon Green', image: '/amazon.jpg' },
    { name: 'Shadow', image: '/shadow.jpg' },
    { name: 'Mineral Grey', image: '/mineral.jpg' },
    { name: 'Pebble Nude', image: '/pebble.jpg' },
    { name: 'Onyx Black', image: '/onyx.jpg' },
    { name: 'Cinnamon Brown', image: '/cinnamon.jpg' },
    { name: 'Moss Green', image: '/moss.jpg' },
    { name: 'Ocean Blue', image: '/ocean.jpg' },
    { name: 'Posy Pink', image: '/posy.jpg' },
    { name: 'Alloy Grey', image: '/alloy.jpg' },
    { name: 'Fawn', image: '/fawn.jpg' },
    { name: 'Volcanic', image: '/volcanic.jpg' },
    { name: 'Frosted', image: '/frosted.jpg' },
    { name: 'Stellar', image: '/stellar.jpg' },
    { name: 'Pine', image: '/pine.jpg' },
    { name: 'Cloud', image: '/cloud.jpg' },
    { name: 'Bubblegum', image: '/bubblegum.jpg' },
    { name: 'Monochrome', image: '/monochrome.jpg' },
    { name: 'Ice Pop', image: '/icepop.jpg' },
    { name: 'Peach Fizz', image: '/peachfizz.jpg' },
    { name: 'Red Velvet', image: '/redvelvet.jpg' },
    { name: 'Cupcake', image: '/cupcake.jpg' },
  ];

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const mainImagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
     // Scroll the main image container to the corresponding duplicated image
    if (mainImagesContainerRef.current) {
        const numDuplicates = 2;
        const targetIndexInDuplicated = index + numDuplicates; // Adjust for start duplicates
        const targetElement = mainImagesContainerRef.current.querySelector(
            `.main-image-item:nth-child(${targetIndexInDuplicated + 1})`
        ) as HTMLElement;

        if (targetElement && mainImagesContainerRef.current) {
             mainImagesContainerRef.current.scrollTo({ left: targetElement.offsetLeft, behavior: 'smooth' });
        }
    }
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? originalProductImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === originalProductImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    // Center the zoomed area under the cursor
    setZoomPosition({ 
      x: x - (50 / 2), // Subtract half of the zoom area width
      y: y - (50 / 2)  // Subtract half of the zoom area height
    });
  };

  // Handle infinite scroll for thumbnails
  useEffect(() => {
    const thumbnailContainer = thumbnailContainerRef.current;
    if (!thumbnailContainer) return;

    const handleThumbnailScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = thumbnailContainer;
      const threshold = 50; // pixels from bottom to trigger reset

      // Reset to top when near bottom
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        thumbnailContainer.scrollTo({ top: 0, behavior: 'instant' });
      }
      // Reset to bottom when near top
      if (scrollTop < threshold) {
        thumbnailContainer.scrollTo({ top: scrollHeight - clientHeight, behavior: 'instant' });
      }
    };

    thumbnailContainer.addEventListener('scroll', handleThumbnailScroll);
    return () => thumbnailContainer.removeEventListener('scroll', handleThumbnailScroll);
  }, []);

  // Handle infinite scroll for main images
  useEffect(() => {
    const mainContainer = mainImagesContainerRef.current;
    if (!mainContainer) return;

    const handleMainScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = mainContainer;
      const threshold = 50; // pixels from edge to trigger reset

      // Reset to start when near end
      if (scrollWidth - scrollLeft - clientWidth < threshold) {
        mainContainer.scrollTo({ left: clientWidth, behavior: 'instant' });
      }
      // Reset to end when near start
      if (scrollLeft < threshold) {
        mainContainer.scrollTo({ left: scrollWidth - clientWidth * 2, behavior: 'instant' });
      }
    };

    mainContainer.addEventListener('scroll', handleMainScroll);
    return () => mainContainer.removeEventListener('scroll', handleMainScroll);
  }, []);

  // Synchronize thumbnail and main image scrolling and handle infinite loop for main images
  useEffect(() => {
    // Scroll thumbnail into view
    if (thumbnailContainerRef.current) {
      const activeThumbnailElement = thumbnailContainerRef.current.querySelector(
        `.thumbnail-item:nth-child(${
          currentImageIndex + 1
        })`
      ) as HTMLElement;
      if (activeThumbnailElement) {
        activeThumbnailElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Scroll main image into view and handle infinite loop
    if (mainImagesContainerRef.current) {
      const numDuplicates = 2;
      const targetIndexInDuplicated = currentImageIndex + numDuplicates; // Adjust for start duplicates

      const targetElement = mainImagesContainerRef.current.querySelector(
          `.main-image-item:nth-child(${targetIndexInDuplicated + 1})`
      ) as HTMLElement;

      if (targetElement && mainImagesContainerRef.current) {
           const container = mainImagesContainerRef.current;
           const targetScrollLeft = targetElement.offsetLeft;

           // Check if we are near the duplicated sections and need to jump
           // Use requestAnimationFrame to ensure layout is stable before checking scroll position
           requestAnimationFrame(() => {
               const buffer = 50; // A small buffer to trigger the jump slightly before the edge
               const isNearStartDuplicate = container.scrollLeft < buffer && currentImageIndex === originalProductImages.length -1;
               const isNearEndDuplicate = container.scrollLeft + container.clientWidth > container.scrollWidth - buffer && currentImageIndex === 0;

               if (isNearStartDuplicate) {
                   // Jump to the end of the original section (start of end duplicates)
                   const endOriginalSectionStart = container.scrollWidth - (numDuplicates * targetElement.getBoundingClientRect().width + numDuplicates * 16); // Assuming gap-4 is 16px
                   container.scrollTo({ left: endOriginalSectionStart, behavior: 'instant' });
               } else if (isNearEndDuplicate) {
                    // Jump to the start of the original section (end of start duplicates)
                   const startOriginalSectionStart = numDuplicates * targetElement.getBoundingClientRect().width + numDuplicates * 16; // Assuming gap-4 is 16px
                   container.scrollTo({ left: startOriginalSectionStart, behavior: 'instant' });
               } else {
                   // Smooth scroll to the target image in the original section
                    container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
               }
           });
      }
    }
  }, [currentImageIndex, originalProductImages.length, duplicatedProductImages.length]);


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Left Side: Image Gallery (Sticky on MD+) */}
          {/* Hide on mobile, show as flex column on md+ */}
          <div className="flex-1 self-start flex flex-col md:flex-row md:gap-4 md:sticky md:top-4">
            {/* Vertical Thumbnails with Infinite Scroll */}
            <div
              ref={thumbnailContainerRef} 
              className="hidden md:flex w-24 flex-col gap-2 overflow-y-auto max-h-[500px] no-scrollbar bg-white"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              {[...originalProductImages, ...originalProductImages].map((thumbnail, index) => (
              <div 
                key={index} 
                  className={`thumbnail-item relative flex-shrink-0 w-full h-[120px] cursor-pointer rounded-sm overflow-hidden bg-white ${
                    currentImageIndex === index % originalProductImages.length ? 'border-2 border-gray-400' : 'border border-gray-200'
                }`}
                  onClick={() => handleThumbnailClick(index % originalProductImages.length)}
                  style={{ scrollSnapAlign: 'start' }}
              >
                <Image
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>

            {/* Main Images Container with Infinite Scroll */}
            <div className="w-full md:flex-1 bg-white">
            <div className="relative">
                <div 
                  ref={mainImagesContainerRef} 
                  className="flex gap-4 overflow-x-auto no-scrollbar bg-white" 
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                {duplicatedProductImages.map((image, index) => (
                  <div
                    key={index}
                    className="main-image-item relative flex-shrink-0 w-[calc(50%-8px)] h-[500px] overflow-hidden"
                      onMouseEnter={() => {
                        setHoveredImage(image);
                        setShowZoom(true);
                      }}
                      onMouseLeave={() => {
                        setHoveredImage(null);
                        setShowZoom(false);
                      }}
                      onMouseMove={handleMouseMove}
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <Image
                      src={image}
                      alt={`Main Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                        className="transition-transform duration-300"
                      />
                      {showZoom && hoveredImage === image && (
                        <div 
                          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden bg-white"
                          style={{
                            background: `url(${image})`,
                            backgroundSize: '150%',
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            transform: 'scale(1.5)',
                          }}
                        />
                      )}
                  </div>
                ))}
              </div>
              
              {/* Image Navigation Dots and Arrows */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 py-2">
                <button 
                  onClick={handlePrevClick}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
                {originalProductImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                        currentImageIndex === index ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
                <button 
                  onClick={handleNextClick}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

          {/* Right Side: Product Details (Scrollable) */}
          <div className="w-full md:w-96 space-y-6">
          {/* Product Title and Wishlist */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Offstage Hoodie Moon</h1>
            <button 
              onClick={() => setIsWishlist(!isWishlist)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Add to wishlist"
            >
              {isWishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>

          {/* Price and Afterpay */}
          <div>
            <p className="text-lg md:text-xl text-gray-700 font-medium">$69.99 USD</p>
            <p className="text-xs text-gray-500 mt-1">
              Or 4 installments of $17.50 USD with <span className="underline font-medium">Afterpay</span>
              <a href="#" className="ml-1 text-gray-500 underline text-xs">Learn More</a>
            </p>
          </div>

          {/* Loyalty Points Badge */}
          <div className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            +69 LOYALTY POINTS
          </div>

          {/* Shipping Banner */}
          <div className="w-full bg-pink-300 text-pink-900 text-center text-sm font-semibold py-2 rounded">
            OUR USA WAREHOUSE IS HERE! 2 DAY SHIPPING US
          </div>

          {/* Grey Shipping Text and Flower */}
          <div className="flex items-center gap-2">
              <Image src="/flower.svg" alt="Flower decoration" width={20} height={20} />
              <p className="text-xs text-gray-500 text-center flex-1">
                $99.00 AWAY FROM FREE STANDARD SHIPPING
                <br />
                <span className="text-gray-400">*Available for selected stores</span>
              </p>
          </div>

          {/* MORE COLOURS Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">MORE COLOURS</h3>
            <div className="grid grid-cols-4 gap-2">
              {colorVariants.map((color, index) => (
                <div
                  key={color.name}
                  className="relative w-full h-16 rounded-md overflow-hidden border border-gray-200 cursor-pointer"
                  style={{ backgroundColor: `hsl(${(index * 137) % 360}, 70%, 60%)` }}
                  title={color.name}
                >
                  {/* Solid color block */}
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-700">
                Size: {selectedSize || 'Select a size'}
              </p>
              <a href="#" className="text-sm text-gray-500 underline">Size Guide</a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                    className={`border border-gray-300 px-2 py-2 text-sm font-medium rounded hover:border-black transition-colors
                    ${selectedSize === size
                        ? 'border-black bg-white text-black'
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
              className="w-full bg-gray-800 text-white py-3 text-sm font-medium rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSize}
          >
            + ADD TO BAG
          </button>

          {/* Accordion Sections */}
            <div className="border-t border-gray-200 mt-6 bg-white">
              <details className="py-3 group bg-white [&[open]>div]:animate-slideDown [&[open]>summary>svg]:rotate-180">
                <summary className="text-sm font-medium cursor-pointer flex items-center justify-between text-gray-700 bg-white">
                DESCRIPTION
                  <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
                <div className="text-sm text-gray-600 mt-2 space-y-2 bg-white overflow-hidden">
                 <p>
                   If your aesthetic is comfy but cool you will love the Offstage Hoodie in Moon. This hoodie
                   is an oversized fit and features elasticated ribbed cuffs & hem, hood, soft fleeced fabric
                   for extra comfort and a puff print logo centre front. Complete the tracksuit set with the
                   matching Offstage sweatpants for the perfect off-duty look.
                 </p>
                 <ul className="list-disc list-inside text-sm text-gray-600">
                   <li>Material: 50% Cotton 50% Polyester</li>
                   <li>Color: Moon (Taupe)</li>
                   <li>Oversized fit</li>
                   <li>Soft fleeced fabric</li>
                 </ul>
                 <p>Model Height 166cm</p>
                 <p>Ash is wearing a S/M</p>
              </div>
            </details>
              <details className="border-t border-gray-200 py-3 group bg-white [&[open]>div]:animate-slideDown [&[open]>summary>svg]:rotate-180">
                <summary className="text-sm font-medium cursor-pointer flex items-center justify-between text-gray-700 bg-white">
                DELIVERY
                  <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
                <div className="text-sm text-gray-600 mt-2 bg-white overflow-hidden">
                 <p>Express delivery and AfterPay available.</p>
                 <p className="mt-1">Our USA warehouse is here! 2 day shipping USA</p>
                 <p className="mt-1">$99 away from free standard shipping</p>
                 <p className="underline mt-1">Track my order</p>
              </div>
            </details>
              <details className="border-t border-gray-200 py-3 group bg-white [&[open]>div]:animate-slideDown [&[open]>summary>svg]:rotate-180">
                <summary className="text-sm font-medium cursor-pointer flex items-center justify-between text-gray-700 bg-white">
                RETURNS
                  <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
                <div className="text-sm text-gray-600 mt-2 bg-white overflow-hidden">
                 <p>
                   If you are unhappy with your purchase, full priced items or items using discount codes can be returned for a Store Credit.
                 </p>
                 <p className="mt-2">
                   Please note: We do not accept change of mind returns on sale items, fake tan, socks, lingerie or earrings unless defective or faulty.
                 </p>
                 <p className="underline mt-2">Click here for more information or to submit a return.</p>
              </div>
            </details>
            </div>
          </div>
        </div>

        {/* COMPLETE THE LOOK Section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-black text-center mb-8">COMPLETE THE LOOK</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 no-scrollbar">
            {/* Product Blocks (5 times) */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-full pr-4 md:w-auto md:pr-0 snap-center flex flex-col items-center text-center group">
                {/* Image Container with Aspect Ratio */}
                <div className="relative w-full rounded-md overflow-hidden bg-gray-200" style={{ paddingBottom: '177.78%' }}>
                  {/* Absolutely positioned div for Image */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      src={`/product${index + 1}.avif`} // Use product images 1-5
                      alt={`Complete the look product ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800">Product Name</p> {/* Replace with actual product name */}
                <p className="text-sm text-gray-600">$XX.XX USD</p> {/* Replace with actual price */}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-black text-center mb-8">We think you&apos;ll love 🤍</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 no-scrollbar">
            {/* Product Blocks (5 times) */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-full pr-4 md:w-auto md:pr-0 snap-center flex flex-col items-center text-center group">
                {/* Image Container with Aspect Ratio */}
                <div className="relative w-full rounded-md overflow-hidden bg-gray-200" style={{ paddingBottom: '177.78%' }}>
                  {/* Absolutely positioned div for Image */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      src={`/product${index + 1}.avif`} // Use product images 1-5
                      alt={`Complete the look product ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800">Product Name</p> {/* Replace with actual product name */}
                <p className="text-sm text-gray-600">$XX.XX USD</p> {/* Replace with actual price */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProductDetailsPage;