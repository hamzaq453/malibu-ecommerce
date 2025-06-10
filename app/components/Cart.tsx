'use client';

import React from 'react';
import Image from 'next/image';
import { FaTimes, FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';
import { urlFor } from '@/sanity/lib/image';
import { SanityImage } from '@/app/types/sanity';
import Link from 'next/link';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: SanityImage;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 10; // Free shipping over $99
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-280px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-lg mb-4">Your cart is empty</p>
              <Link
                href="/products"
                className="text-black underline hover:text-gray-700"
                onClick={onClose}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex gap-4 py-4 border-b border-gray-100">
                  {/* Product Image */}
                  <div className="relative w-24 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item._id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="px-4 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary and Checkout */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-4">
          {/* Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-500">
                ${(99 - subtotal).toFixed(2)} away from free shipping
              </p>
            )}
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart; 