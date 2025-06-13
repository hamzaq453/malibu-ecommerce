'use client';
import React, { useState, useEffect } from 'react';
import {
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const categories = [
  { name: 'Home', img: '/Image2.png' },
  { name: 'New Arrivals', img: '/Image1.png' },
  { name: 'Clothing', img: '/Image2.png', subcategories: [
    'Hoodies and Sweaters',
    'Tshirts and Tees',
    'Sweaters and Hoodies',
    'Bottoms',
    'Lounge Sets',
    'Occasions',
  ] },
  { name: 'Loungewear', img: '/Image2.png' },
  { name: 'Occasions', img: '/Image1.png' },
  { name: 'Sets', img: '/Image2.png' },
  { name: 'Bottoms', img: '/Image1.png' },
  { name: 'Accessories', img: '/Image2.png' },
  { name: 'Other Brands', img: '/Image1.png' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clothingExpanded, setClothingExpanded] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { items, openCart } = useCart();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Function to update favorites from localStorage
  const updateFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      setFavorites([]);
    }
  };

  // Initial load of favorites
  useEffect(() => {
    updateFavorites();
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      updateFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener('favoritesUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleStorageChange);
    };
  }, []);

  const handleClothingToggle = () => {
    setClothingExpanded(!clothingExpanded);
  };

  return (
    <nav className="w-full relative z-50">
      {/* Announcement Bar */}
      <div className="bg-pink-200 text-xs text-black text-center font-semibold py-2">
        SIGN UP FOR 20% OFF YOUR NEXT ORDER
      </div>

      {/* Main Navbar */}
      <div className="bg-black text-white flex items-center justify-between px-4 md:px-6 py-3">
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <FaBars
            className="w-5 h-5 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        </div>

        {/* Logo */}
        <div className="flex-grow text-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={140}
            height={40}
            className="mx-auto h-10 w-auto object-contain"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <FaSearch className="w-5 h-5 cursor-pointer" />
          <Link href="/favorites" className="relative">
            <FaHeart className="w-5 h-5 cursor-pointer" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
          <div className="relative cursor-pointer" onClick={openCart}>
            <FaShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Category Menu */}
      <div className="hidden md:flex bg-black text-white px-6 py-2 border-t border-gray-800">
        <div className="flex justify-evenly w-full text-sm font-mono uppercase">
          {categories.map((cat) => (
            <div key={cat.name} className="relative group">
              <a
                href={cat.name === 'Home' ? '/' : cat.name === 'Other Brands' ? '/other-brands' : '#'}
                className="hover:text-pink-400 transition-colors whitespace-nowrap inline-block"
              >
                {cat.name}
              </a>
              {cat.subcategories && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-48 bg-white text-black shadow-lg rounded-md">
                    {cat.subcategories.map((subcat) => (
                      <a
                        key={subcat}
                        href={cat.name === 'Clothing' && subcat === 'Hoodies and Sweaters' ? '/products' : '#'}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {subcat}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar Content */}
        <div className="relative bg-white w-[75%] h-full overflow-y-auto">
          {/* Close Button */}
          <div className="flex justify-end p-4 border-b border-gray-100">
            <button onClick={() => setMenuOpen(false)}>
              <FaTimes className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Category Links */}
          <div className="py-2">
            {categories.map((cat) => (
              <div key={cat.name}>
                <a
                  href={cat.name === 'Home' ? '/' : cat.name === 'Other Brands' ? '/other-brands' : '#'}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  onClick={cat.name === 'Clothing' ? handleClothingToggle : undefined}
                >
                  <span className="text-black text-sm font-mono tracking-wide uppercase">
                    {cat.name}
                  </span>
                  <div className="relative w-16 h-12 rounded-sm overflow-hidden">
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                </a>
                {cat.name === 'Clothing' && clothingExpanded && cat.subcategories && (
                  <div className="pl-6">
                    {cat.subcategories.map((subcat) => (
                      <a
                        key={subcat}
                        href={cat.name === 'Clothing' && subcat === 'Hoodies and Sweaters' ? '/products' : '#'}
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        {subcat}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;