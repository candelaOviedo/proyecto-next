import Link from "next/link";
import Menu from "./menu";
import Image from "next/image";
const Navbar = () => {
  return (
    <header className="bg-white p-4 text-black bg-gradient-to-r from-amber-100 to-green-200">
      <nav className="flex justify-between ">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dq9qp6jqx/image/upload/c_crop,ar_16:9/v1726078406/BookishApp_lcnjqt.png"
            alt="logo"
            width={100}
            height={100}
            className="object-cover rounded-md shadow-sm"
          ></Image>
        </Link>
        <Menu />
      </nav>
    </header>
  );
};

export default Navbar;
