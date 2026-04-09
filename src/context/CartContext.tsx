import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '../api/cart';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: any;
  quantity: number;
  color: string;
  size: string;
  itemTotal: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number, color?: string, size?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: (paymentMethod?: string, shippingAddress?: string) => Promise<any>;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  isLoading: false,
  refreshCart: async () => {},
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  checkout: async () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      refreshCart();
    } else {
      setItems([]);
      setItemCount(0);
    }
  }, [token]);

  const refreshCart = async () => {
    try {
      setIsLoading(true);
      const res = await cartAPI.get();
      setItems(res.data.items);
      setItemCount(res.data.itemCount);
      setSubtotal(res.data.subtotal);
      setTax(res.data.tax);
      setShipping(res.data.shipping);
      setTotal(res.data.total);
    } catch (err) {
      console.log('Error fetching cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1, color = '', size = '') => {
    try {
      const res = await cartAPI.add(productId, quantity, color, size);
      setItemCount(res.data.itemCount);
      await refreshCart();
    } catch (err) {
      console.log('Error adding to cart:', err);
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await cartAPI.update(itemId, quantity);
      setItemCount(res.data.itemCount);
      await refreshCart();
    } catch (err) {
      console.log('Error updating cart:', err);
      throw err;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await cartAPI.remove(itemId);
      setItemCount(res.data.itemCount);
      await refreshCart();
    } catch (err) {
      console.log('Error removing from cart:', err);
      throw err;
    }
  };

  const checkout = async (paymentMethod?: string, shippingAddress?: string) => {
    try {
      const res = await cartAPI.checkout(paymentMethod, shippingAddress);
      setItems([]);
      setItemCount(0);
      return res.data;
    } catch (err) {
      console.log('Error checking out:', err);
      throw err;
    }
  };

  return (
    <CartContext.Provider value={{
      items, itemCount, subtotal, tax, shipping, total, isLoading,
      refreshCart, addToCart, updateQuantity, removeItem, checkout,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
