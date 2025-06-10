'use client';

import React, { createContext, useContext, useState } from 'react';
import { SanityImage } from '@/app/types/sanity';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: SanityImage;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Check if item already exists with same ID and size
      const existingItemIndex = currentItems.findIndex(
        (item) => item._id === newItem._id && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }

      // Add new item
      return [...currentItems, newItem];
    });
    openCart(); // Open cart when item is added
  };

  const removeItem = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item._id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 