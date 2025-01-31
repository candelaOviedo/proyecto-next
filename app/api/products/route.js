import { db } from "@/app/context/configFireBase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request, { params }) {
  const { category } = params || {}; // Obtenemos la categoría desde los parámetros

  try {
    let booksRef;
    // Si hay una categoría, aplica un filtro
    if (category) {
      booksRef = query(collection(db, "books"), where("category", "==", category));
    } else {
      booksRef = collection(db, "books"); // Si no hay categoría, obtiene todos los libros
    }

    const booksSnap = await getDocs(booksRef);
    const booksData = booksSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(booksData), { status: 200 });
  } catch (err) {
    console.error("Error al obtener productos:", err);
    return new Response("Error al cargar los productos", { status: 500 });
  }
}