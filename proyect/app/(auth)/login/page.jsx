"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";

// Definir el esquema de validación con zod
const schema = z.object({
  tenantId: z.string().min(5, "Tenant ID must have at least 5 characters."), // Validación para tenantId
  password: z.string().min(8, "Password must have at least 8 characters."), // Validación para password
});

const LogInPage = () => {
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
      const response = await fetch("http://localhost:3000/tenants/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log(result);
      if (result.status == "error") {
        alert(result.message)
      }
      if (result.status == "success") {
        alert(result.message)
      }

      // Iniciar sesión con NextAuth.js
      /*await signIn("credentials", {
        redirect: false,
        tenantId: data.tenantId,
        password: data.password,
      });*/

    } catch (error) {
      console.error("Error during login process:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="tenantId" className="block text-gray-700">Tenant ID</label>
            <input
              id="tenantId"
              type="text"
              className={`mt-1 p-2 w-full border ${errors.tenantId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              {...register("tenantId")}
            />
            {errors.tenantId && <p className="text-red-500 text-sm mt-1">{errors.tenantId.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className={`mt-1 p-2 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
