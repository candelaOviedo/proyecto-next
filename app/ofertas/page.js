"use client";
import MainLayout from "../components/layouts/mainLayout";
import { productos } from "../mock/products";
import Link from "next/link";
import Image from "next/image";

export default function Ofertas() {
  const ofertas = productos.filter((producto) => producto.onSale);

  return (
    <MainLayout>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6 text-black drop-shadow-[2px_2px_2px_rgba(0,0,0,0.35)]">Ofertas</h1>
        <div className="grid grid-cols-1 w-fit sm:grid-cols-2 md:grid-cols-3 gap-6">
    {ofertas.map((producto) => (
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