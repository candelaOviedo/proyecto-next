"use client";
import { useEffect, useState } from "react";
import MainLayout from "./components/layouts/mainLayout";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setBooks(data.slice(0, 6));
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center text-lg">Cargando novedades...</p>;

  return (
    <MainLayout>
      {/* Barra de selección */}
      <div className="bg-gray-200 py-3 shadow-md">
        <nav className="container mx-auto flex justify-center space-x-8">
          <Link
            href="/catalogo"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Catálogo
          </Link>
          <Link
            href="/ofertas"
            className="text-gray-700 hover:text-red-500 transition font-semibold"
          >
            Ofertas
          </Link>
        </nav>
      </div>

      {/* Sección de novedades */}
      <main className="container flex flex-col items-center mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-black drop-shadow-[2px_2px_2px_rgba(0,0,0,0.35)]">
          Novedades de la Semana
        </h1>

        <div className="grid grid-cols-1 w-fit sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-lg p-4 shadow-md bg-amber-50 flex flex-col"
            >
              <div className="mb-4 flex justify-center">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="object-cover rounded-md"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 text-black drop-shadow-lg text-center">
                {book.title}
              </h2>

              <div className="flex justify-between items-center mt-auto">
                <p className="text-lg font-bold text-black">${book.price}</p>
                <Link
                  href={`/productDetail/${book.id}`}
                  className="text-black hover:text-white shadow-md hover:bg-green-300 transition duration-400 p-2 text-xl rounded-md bg-green-100"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </MainLayout>
  );
}