import Link from "next/link";

const MenuList = () => {
  return (
    <div>
        <nav className="mt-4 space-x-4 flex justify-center">
          <Link href="/" className="block text-lg text-gray-800 hover:text-blue-600 transition-colors">Inicio</Link>
          <Link href="/contacto" className="block text-lg text-gray-800 hover:text-blue-600 transition-colors">Contacto</Link>
        </nav>
    </div>
  );
};

export default MenuList;