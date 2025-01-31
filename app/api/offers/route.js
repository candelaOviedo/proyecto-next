import { db } from "@/app/context/configFireBase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const booksRef = collection(db, "books");
    const booksSnap = await getDocs(booksRef);
    const booksData = booksSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filtrar solo los productos en oferta
    const ofertasFiltradas = booksData.filter((producto) => producto.onSale);

    return new Response(JSON.stringify(ofertasFiltradas), { status: 200 });
  } catch (err) {
    console.error("Error al obtener ofertas:", err);
    return new Response("Error al cargar las ofertas", { status: 500 });
  }
}