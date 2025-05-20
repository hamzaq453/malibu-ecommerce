'use client';
import React, { useState } from 'react';
import {
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import Image from 'next/image';

const categories = [
  { name: 'New In', img: '/Hero3.png' },
  { name: 'Back In Stock', img: '/Hero4.png' },
  { name: 'Clothing', img: '/Hero3.png' },
  { name: 'Occasions', img: '/Hero4.png' },
  { name: 'Tops', img: '/Hero3.png' },
  { name: 'Dresses', img: '/Hero4.png' },
  { name: 'Loungewear', img: '/Hero3.png' },
  { name: 'Sets', img: '/Hero4.png' },
  { name: 'Bottoms', img: '/Hero3.png' },
  { name: 'Swimwear', img: '/Hero4.png' },
];

// Shared block style
const blockClass =
  'p-4 border rounded-md shadow-sm mb-6 flex items-center justify-between';

const CustomerCareBlock = () => (
  <div className={`${blockClass} bg-white`}>
    <a
      href="#"
      className="block text-sm font-semibold text-black hover:text-pink-400"
    >
      Customer Care
    </a>
  </div>
);

const LoyaltyClubBlock = () => (
  <div
    className={`${blockClass} bg-pink-500 cursor-pointer hover:bg-pink-600 transition text-white`}
  >
    <div className="flex items-center gap-2">
      <FaHeart />
      <a href="#" className="text-sm font-semibold">
        Loyalty Club
      </a>
    </div>
  </div>
);

const AuthBlock = () => (
  <div className={`${blockClass} bg-black text-white`}>
    <div className="flex items-center gap-2">
      <FaUser />
      <span className="text-sm font-semibold">Login</span>
    </div>
    <div className="w-px h-5 bg-white" />
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold">Register</span>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <FaHeart className="w-5 h-5 cursor-pointer" />
          <span className="text-xs hidden md:inline">0</span>
          <FaShoppingBag size={20} className="cursor-pointer" />
        </div>
      </div>

      {/* Desktop Category Menu */}
      <div className="hidden md:flex bg-black text-white px-6 py-2 border-t border-gray-800">
        <div className="flex justify-evenly w-full text-sm font-bold uppercase">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="hover:text-pink-400 transition-colors whitespace-nowrap"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
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
        <div className="relative bg-white w-4/5 h-full p-6 overflow-y-auto shadow-lg">
          {/* Close Icon */}
          <FaTimes
            className="absolute top-4 right-4 w-5 h-5 cursor-pointer text-black"
            onClick={() => setMenuOpen(false)}
          />

          {/* Category Blocks */}
          <div className="flex flex-col gap-4 mt-8">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className={`${blockClass} border-gray-200 hover:bg-pink-100 transition`}
                style={{ minHeight: '3.5rem' }}
              >
                <span className="text-sm font-semibold uppercase text-black">
                  {cat.name}
                </span>
                <div
                  className="relative rounded-md overflow-hidden"
                  style={{ width: '4rem', height: '2.25rem' }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            ))}
          </div>

          {/* Extra Blocks */}
          <div className="mt-8">
            <CustomerCareBlock />
            <LoyaltyClubBlock />
            <AuthBlock />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
