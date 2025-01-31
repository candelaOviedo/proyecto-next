"use client";

import { useCart } from "@/app/context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const handleIncrement = (item) => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="container mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border-b py-4">
              <h2 className="text-xl">{item.title}</h2>
              <p>Stock disponible: {item.stock}</p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDecrement(item)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  -
                </button>
                <p>Cantidad: {item.quantity}</p>
                <button
                  onClick={() => handleIncrement(item)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  +
                </button>
              </div>
              <p>
                ${item.price} x {item.quantity} = ${item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 mt-2"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="mt-4">
            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
