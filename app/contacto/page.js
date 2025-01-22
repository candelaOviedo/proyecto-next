"use client";

import { useState } from "react";
import MainLayout from "../components/layouts/mainLayout";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.mensaje
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Por favor, ingresa un email válido.");
      return;
    }

    // Simulación de envío
    console.log("Formulario enviado:", formData);
    setSuccess(true);
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <MainLayout title="Contacto">
    <div className="container mx-auto max-w-2xl p-6 bg-white shadow-md rounded-lg mt-10 bg-gradient-to-r from-amber-100  to-green-300 text-black">
      <h1 className="text-2xl font-bold text-center mb-6 ">Formulario de Contacto</h1>
      {success && (
        <div className="p-4 mb-6 text-green-700 bg-green-100 border border-green-400 rounded">
          ¡Mensaje enviado exitosamente!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block font-semibold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-blue-300 text-black"
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="block font-semibold mb-2">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-blue-300 text-black"
            placeholder="Ingresa tu apellido"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-blue-300 text-black"
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mensaje" className="block font-semibold mb-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-blue-300 text-black"
            rows="5"
            placeholder="Escribe tu mensaje aquí"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-5  bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
    </MainLayout>
  );
}