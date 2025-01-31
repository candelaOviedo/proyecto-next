import { db } from "@/app/context/configFireBase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const productRef = doc(db, "books", id);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return new Response("Producto no encontrado", { status: 404 });
    }

    const productData = {
      id: productSnap.id,
      ...productSnap.data(),
    };

    return new Response(JSON.stringify(productData), { status: 200 });
  } catch (err) {
    console.error("Error al obtener el producto:", err);
    return new Response("Error al cargar el producto", { status: 500 });
  }
}