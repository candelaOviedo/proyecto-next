"use client";
import MainLayout from "../components/layouts/mainLayout"; // Importar MainLayout
import { productos } from "../mock/products";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Catalogo() {
  const categorias = [...new Set(productos.map((producto) => producto.category))]; // Categorías únicas
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.category === categoriaSeleccionada)
    : productos;

  return (
    <MainLayout>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6 text-black drop-shadow-[2px_2px_2px_rgba(0,0,0,0.35)]">Catálogo</h1>

        {/* Barra de categorías */}
        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`px-4 py-2 rounded-md font-semibold ${
                categoria === categoriaSeleccionada
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-600 hover:text-white`}
              onClick={() =>
                setCategoriaSeleccionada(
                  categoria === categoriaSeleccionada ? "" : categoria
                )
              }
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 w-fit sm:grid-cols-2 md:grid-cols-3 gap-6">
    {productosFiltrados.map((producto) => (
      <div
        key={producto.id}
        className="border rounded-lg p-4 shadow-md bg-amber-50 flex flex-col"
      >
        <div className="mb-4 flex justify-center">
          <Image
            src={producto.image}
            alt={producto.title}
            width={300}
            height={400}
            className="object-cover rounded-md"
          />
        </div>
        <h2 className="text-xl font-bold mb-2 text-black drop-shadow-lg text-center">
          {producto.title}
        </h2>

        {/* Contenedor flex para alinear el precio y el botón */}
        <div className="flex justify-between items-center mt-auto">
          <p className="text-lg font-bold text-black">${producto.price}</p>
          <Link
            href={`/productDetail/${producto.id}`}
            className="text-black hover:text-white shadow-md hover:bg-green-300 transition duration-400 p-2 text-xl rounded-md bg-green-100"
          >
            Ver Detalle
          </Link>
        </div>
      </div>
    ))}
  </div>
      </div>
    </MainLayout>
  );
}