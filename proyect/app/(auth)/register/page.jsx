"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,}$/;
// Definir el esquema de validación con zod
const schema = z.object({
  companyName: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres.").max(30),
  tenantId: z.string().min(5, "El ID de la empresa debe tener al menos 5 caracteres."),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .regex(passwordRegex, "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@#$%^&+=)."),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await fetch("http://localhost:3000/tenants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const result = await response.json();
      console.log(result);
      if (result.status == "error") {
        alert(result.message)
      }
      if (result.status == "success") {
        alert(result.message)
      }

      // Iniciar sesión automáticamente después del registro
      /*await signIn("credentials", {
        redirect: false,
        tenantId: data.tenantId,
        password: data.password,
      });*/

    } catch (error) {
      console.error("Error en el proceso de registro:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700">Nombre de la Empresa</label>
            <input
              id="companyName"
              type="text"
              className={`mt-1 p-2 w-full border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              {...register("companyName")}
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="tenantId" className="block text-gray-700">ID de la Empresa</label>
            <input
              id="tenantId"
              type="text"
              className={`mt-1 p-2 w-full border ${errors.tenantId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              {...register("tenantId")}
            />
            {errors.tenantId && <p className="text-red-500 text-sm mt-1">{errors.tenantId.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              className={`mt-1 p-2 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
