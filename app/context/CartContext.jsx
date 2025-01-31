"use client"

import { createContext, useContext, useState } from "react";
const CartContext = createContext();

// Proveedor de contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product, quantity) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está en el carrito, sumamos la cantidad
        const newQuantity = existingProduct.quantity + quantity;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(newQuantity, product.stock) }
            : item
        );
      } else {
        // Si el producto no está en el carrito, lo agregamos con la cantidad seleccionada
        return [...prev, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al carrito
export const useCart = () => {
  return useContext(CartContext);
};
