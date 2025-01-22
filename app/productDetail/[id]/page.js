"use client";

import { useParams } from "next/navigation";
import { productos } from "../../mock/products";
import { useState } from "react";
import Image from "next/image";

export default function ProductDetail() {
  // Obtiene el id de los parámetros de la URL
  const { id } = useParams();

  // Encuentra el producto por id
  const producto = productos.find((prod) => prod.id === parseInt(id));

  if (!producto) return <div>Producto no encontrado</div>;

  const [cantidad, setCantidad] = useState(1);

  const handleCantidadChange = (e) => {
    const newCantidad = e.target.value;
    // Asegura que el valor ingresado sea un número
    const cantidadNumerica = Number(newCantidad);

    if (!isNaN(cantidadNumerica)) {
      // Limita el valor entre 1 y el stock disponible
      const cantidadFinal = Math.max(1, Math.min(cantidadNumerica, producto.stock));
      setCantidad(cantidadFinal);
    }
  };

  // Función para incrementar la cantidad
  const handleIncrement = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  // Función para decrementar la cantidad
  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

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
          <h3 className="text-xl text-gray-700 mb-4">Autor: {producto.author}</h3>
          <p className="text-lg text-gray-600 mb-6">{producto.description}</p>
          <p className="text-xl font-semibold mb-4">${producto.price}</p>
          <p className="text-lg font-semibold mb-4">Editorial: {producto.editorial}</p>

          {/* Contador de cantidad */}
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="cantidad" className="text-lg font-semibold">Cantidad</label>
            <button
              onClick={handleDecrement}
              className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center"
              disabled={cantidad <= 1} // Deshabilita si la cantidad es 1
            >
              -
            </button>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={handleCantidadChange}
              className="w-16 px-3 py-2 border rounded-md text-center"
              min="1"
              max={producto.stock}
            />
            <button
              onClick={handleIncrement}
              className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center"
              disabled={cantidad >= producto.stock} // Deshabilita si la cantidad es igual al stock
            >
              +
            </button>
            <span className="text-gray-600">Stock disponible: {producto.stock}</span>
          </div>

          <button className="w-full bg-green-300 text-black py-2 rounded-md hover:bg-green-400 transition duration-200">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}