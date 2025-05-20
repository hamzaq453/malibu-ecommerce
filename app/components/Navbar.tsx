'use client';
import React, { useState } from 'react';
import {
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import Image from 'next/image';

const categories = [
  { name: 'NEW IN', img: '/Hero3.png' },
  { name: 'BACK IN STOCK', img: '/Hero4.png' },
  { name: 'CLOTHING', img: '/Hero3.png' },
  { name: 'OCCASIONS', img: '/Hero4.png' },
  { name: 'TOPS', img: '/Hero3.png' },
  { name: 'DRESSES', img: '/Hero4.png' },
  { name: 'LOUNGEWEAR', img: '/Hero3.png' },
  { name: 'SETS', img: '/Hero4.png' },
  { name: 'BOTTOMS', img: '/Hero3.png' },
  { name: 'SWIMWEAR', img: '/Hero4.png' },
];

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
              <a
                key={cat.name}
                href="#"
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-black text-base font-medium tracking-wide">
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
            ))}
          </div>

          {/* Additional Links */}
          {/* <div className="border-t border-gray-100 py-4 px-6">
            <a href="#" className="block py-3 text-black font-medium">
              Customer Care
            </a>
            <a href="#" className="block py-3 text-black font-medium">
              Track My Order
            </a>
            <a href="#" className="block py-3 text-black font-medium">
              Size Guide
            </a>
          </div> */}

          {/* Account Section */}
          {/* <div className="border-t border-gray-100 py-4 px-6">
            <div className="flex items-center gap-2 mb-3">
              <FaUser className="w-5 h-5" />
              <span className="font-medium">Account</span>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-2 text-sm font-medium">
                Sign In
              </button>
              <button className="flex-1 border border-black py-2 text-sm font-medium">
                Register
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
