"use client";
import MainLayout from "../components/layouts/mainLayout";
import { productos } from "../mock/products";
import Link from "next/link";
import Image from "next/image";

export default function Ofertas() {
  const ofertas = productos.filter((producto) => producto.onSale);

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Ofertas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ofertas.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="mb-4">
                <Image
                  src={producto.image}
                  alt={producto.title}
                  width={300}
                  height={400}
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 text-black text-center">{producto.title}</h2>
              <p className="text-lg font-bold text-blue-600 text-end">${producto.price}</p>
              <Link
                href={`/productDetail/${producto.id}`}
                className="text-blue-500 hover:text-blue-600 underline justify-end flex"
              >
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}