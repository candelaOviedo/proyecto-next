"use client";

import Link from "next/link";
import { productos } from "../mock/products";

export default function ProductPage() {
  return (
    <div>
      <h1 className=" text-3xl font-bold text-center mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">{producto.title}</h2>
            <p className="text-gray-600">{producto.description}</p>
            <p className="text-lg font-bold text-blue-600">${producto.price}</p>
            <Link
              href={`/productDetail/${producto.id}`}
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}