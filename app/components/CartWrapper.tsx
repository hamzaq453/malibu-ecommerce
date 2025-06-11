'use client';

import { useCart } from '../context/CartContext';
import Cart from './Cart';

const CartWrapper = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  
  return (
    <Cart
      isOpen={isOpen}
      onClose={closeCart}
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
    />
  );
};

export default CartWrapper; 