import React from 'react';
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from 'react-icons/fa';

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
  return (
    <nav className="w-full">
      {/* Top Announcement Bar */}
      <div className="bg-pink-200 text-xs text-black flex justify-center items-center px-4 py-2 font-semibold">
        <span>SIGN UP FOR 20% OFF YOUR NEXT ORDER</span>
      </div>
      {/* Main Navbar */}
      <div className="bg-black text-white flex items-center justify-between px-6 py-3">
        {/* Left spacer for balance */}
        <div className="w-[200px]"></div>
        {/* Brand Name */}
        <div className="text-3xl font-bold tracking-widest">PINK MALIBU</div>
        {/* Right Icons */}
        <div className="flex items-center gap-6 w-[200px] justify-end">
          <FaSearch className="w-5 h-5 cursor-pointer" />
          <FaUser className="w-5 h-5 cursor-pointer" />
          <FaHeart className="w-5 h-5 cursor-pointer" />
          <span className="text-xs">0</span>
          <FaShoppingBag size={20} className="cursor-pointer" />
        </div>
      </div>
      {/* Category Menu */}
      <div className="bg-black text-white flex items-center justify-between px-6 py-2 border-t border-gray-800">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between w-full">
            {categories.map((cat) => (
              <a key={cat} href="#" className="font-bold uppercase text-sm hover:text-pink-400 transition-colors">{cat}</a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 