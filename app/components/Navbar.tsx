'use client'
import React, { useState } from 'react';
import { FaUser, FaHeart, FaShoppingBag, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const categories = [
  'New In',
  'Back In Stock',
  'Clothing',
  'Occasions',
  'Tops',
  'Dresses',
  'Loungewear',
  'Sets',
  'Bottoms',
  'Swimwear',
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full">
      {/* Top Announcement Bar */}
      <div className="bg-pink-200 text-xs text-black flex justify-center items-center px-4 py-2 font-semibold">
        <span>SIGN UP FOR 20% OFF YOUR NEXT ORDER</span>
      </div>

      {/* Main Navbar */}
      <div className="bg-black text-white">
        {/* Mobile/Desktop Header */}
        <div className="flex items-center justify-between px-4 h-[60px]">
          {/* Left - Menu Button and Logo */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
            <Image 
              src="/Logo.png" 
              alt="Pink Malibu Logo" 
              width={120} 
              height={40} 
              className="h-8 md:h-10 w-auto"
              priority
            />
          </div>

          {/* Right - Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <FaSearch className="w-5 h-5 cursor-pointer" />
            <FaUser className="w-5 h-5 cursor-pointer" />
            <div className="relative">
              <FaHeart className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
            <div className="relative">
              <FaShoppingBag className="w-5 h-5 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Category Menu */}
        <div className="hidden md:block border-t border-gray-800">
          <div className="flex items-center justify-between px-6 py-2">
            {categories.map((cat) => (
              <a 
                key={cat} 
                href="#" 
                className="font-bold uppercase text-sm hover:text-pink-400 transition-colors"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay Background */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[75%] bg-black z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        {/* Menu Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white text-lg font-medium">Menu</h2>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-pink-400 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="h-full overflow-y-auto">
          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-none border border-gray-800"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="px-4">
            {categories.map((cat) => (
              <a
                key={cat}
                href="#"
                className="block py-3 text-white font-medium text-sm uppercase tracking-wider hover:text-pink-400 transition-colors border-b border-gray-800"
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Mobile Account Links */}
          <div className="mt-6 px-4">
            <a href="#" className="block py-3 text-white hover:text-pink-400 transition-colors flex items-center gap-3">
              <FaUser className="w-5 h-5" />
              <span>My Account</span>
            </a>
            <a href="#" className="block py-3 text-white hover:text-pink-400 transition-colors flex items-center gap-3">
              <FaHeart className="w-5 h-5" />
              <span>Wishlist</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 