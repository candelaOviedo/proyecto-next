"use client";
import MainLayout from "../components/layouts/mainLayout";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función que obtiene productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const url = categoriaSeleccionada ? `/api/products` : "/api/products";
        const response = await fetch(url);

        if (!response.ok) {
          console.error("Respuesta de la API no OK", response.status);
          throw new Error("Error al cargar los productos");
        }

        const data = await response.json();
        console.log("Datos de productos:", data);

        // Actualiza los productos
        setProductos(data);
        setProductosFiltrados(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaSeleccionada]);

  // Obtener categorías únicas de los productos
  const categorias = [
    ...new Set(productos.map((producto) => producto.category)),
  ].filter(Boolean);

  // Filtrar productos según la categoría seleccionada
  useEffect(() => {
    if (categoriaSeleccionada) {
      const productosFiltrados = productos.filter(
        (producto) => producto.category === categoriaSeleccionada
      );
      setProductosFiltrados(productosFiltrados);
    } else {
      setProductosFiltrados(productos);
    }
  }, [categoriaSeleccionada, productos]);

  if (loading) return <div className="text-center text-lg">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <MainLayout>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6 text-black drop-shadow-[2px_2px_2px_rgba(0,0,0,0.35)]">
          Catálogo
        </h1>

        {/* Barra de categorías */}
        <div className="flex flex-wrap justify-center space-x-4 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`px-4 py-2 rounded-md font-semibold ${
                categoria === categoriaSeleccionada
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-green-300 hover:text-white`}
              onClick={() => {
                setCategoriaSeleccionada(
                  categoria === categoriaSeleccionada ? "" : categoria
                );
              }}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 w-fit sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
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
                  <p className="text-lg font-bold text-black">
                    ${producto.price}
                  </p>
                  <Link
                    href={`/productDetail/${producto.id}`}
                    className="text-black hover:text-white shadow-md hover:bg-green-300 transition duration-400 p-2 text-xl rounded-md bg-green-100"
                  >
                    Ver Detalle
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-red-500">
              No se encontraron productos
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
