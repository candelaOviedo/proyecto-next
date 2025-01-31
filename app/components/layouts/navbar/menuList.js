import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const MenuList = () => {
  const { cart } = useCart();

  // Aseguramos que 'cart' sea un arreglo válido y calculamos el total de productos
  const totalProductos = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  return (
    <div>
      <nav className="mt-4 space-x-4 flex justify-center">
        <Link
          href="/"
          className="block text-lg text-gray-800 hover:text-blue-600 transition-colors"
        >
          Inicio
        </Link>
        <Link
          href="/contacto"
          className="block text-lg text-gray-800 hover:text-blue-600 transition-colors"
        >
          Contacto
        </Link>

        <div className="relative">
          <Link
            href="/cart"
            className="text-lg text-gray-800 hover:text-blue-600 transition-colors"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
            {totalProductos > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalProductos}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MenuList;
