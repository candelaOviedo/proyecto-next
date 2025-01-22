import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Lo sentimos, la página que buscas no existe.</p>
        <p className="text-lg text-gray-500 mb-6">
          Es posible que haya un error en la URL o la página haya sido eliminada.
        </p>
        <Link href="/" className="inline-block px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Volver al inicio
        </Link>
      </div>
    </div>
  );
}