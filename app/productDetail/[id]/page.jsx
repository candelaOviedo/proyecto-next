"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error("Error al cargar el producto");
        }
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (producto) {
      // Verificar si el producto ya está en el carrito
      const productoEnCarrito = cart.find((item) => item.id === producto.id);

      // Si el producto ya está en el carrito, actualizar la cantidad
      if (productoEnCarrito) {
        const cantidadTotal = productoEnCarrito.quantity + cantidad;
        if (cantidadTotal <= producto.stock) {
          addToCart(producto, cantidadTotal);
        } else {
          alert(
            `No puedes agregar más de ${producto.stock} unidades de este producto.`
          );
        }
      } else {
        // Si el producto no está en el carrito, agregarlo con la cantidad seleccionada
        const cantidadFinal = Math.min(cantidad, producto.stock);
        addToCart(producto, cantidadFinal);
      }
    }
  };

  if (loading) return <div className="text-center text-lg">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="container mx-auto p-16 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center mb-6 lg:mb-0">
          <Image
            src={producto.image}
            alt={producto.title}
            width={400}
            height={350}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{producto.title}</h1>
          <h3 className="text-xl text-gray-700 mb-4">
            Autor: {producto.author}
          </h3>
          <p className="text-lg text-gray-600 mb-6">{producto.description}</p>
          <p className="text-xl font-semibold mb-4">${producto.price}</p>
          <p className="text-lg font-semibold mb-4">
            Editorial: {producto.editorial}
          </p>

          {/* Contador de cantidad */}
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="cantidad" className="text-lg font-semibold">
              Cantidad
            </label>
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center"
              disabled={cantidad <= 1}
            >
              -
            </button>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) =>
                setCantidad(Math.min(Number(e.target.value), producto.stock))
              }
              className="w-16 px-3 py-2 border rounded-md text-center"
              min="1"
              max={producto.stock}
            />
            <button
              onClick={() =>
                setCantidad(Math.min(cantidad + 1, producto.stock))
              }
              className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center"
              disabled={cantidad >= producto.stock}
            >
              +
            </button>
            <span className="text-gray-600">
              Stock disponible: {producto.stock}
            </span>
          </div>

          <button
            onClick={handleAgregarAlCarrito}
            className="w-full bg-green-300 text-black py-2 rounded-md hover:bg-green-400 transition duration-200"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
