"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import "./register.css"
import Image from "next/image";
import Link from "next/link";
import {useRouter } from 'next/navigation';

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
  const router = useRouter()
  const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;

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
      const response = await fetch(`${backdorection}/tenants`, {
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
        router.push(`/login`);
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
    <div className="fixed-scale mx-auto min-h-screen">
      <Header />
      <div className="contenedorPadre homepage">

        <div className="contenedor">

          <div className="contenedor-izquierda">
            <div className="conten-izq-box">
              <div className="panel-overlay">
                <Image src="/assets/backgrounds/icon_62.png" alt="ConstruEX Logo" width={380} height={160} className="mt-2 mb-8" priority />
                <h1 className="title-right worksans">
                  Already have an account?<br />
                </h1>
                <button className="loginhere worksans">
                  <Link href="/">
                    Log In Here
                  </Link>
                </button>
              </div>
            </div>
          </div>


          <div className="formulario-container px-0">
            <div className="formulario mt-0">
              <h1 className="title-left">Sign Up</h1>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                  <p htmlFor="companyName" className="block text-xl text-[--complementary-color] text-left">Company Name</p>
                  <input
                    id="companyName"
                    type="text"
                    className={` ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("companyName")}
                  />
                  {errors.companyName && <p className="text-red-200 text-sm mt-1">{errors.companyName.message}</p>}
                </div>


                <div>
                  <label htmlFor="tenantId" className="block text-xl text-[--complementary-color] text-left">Company Id</label>
                  <input
                    id="tenantId"
                    type="text"
                    className={`${errors.tenantId ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("tenantId")}
                  />
                  {errors.tenantId && <p className="text-red-200 text-sm mt-1">{errors.tenantId.message}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-xl text-[--complementary-color] text-left">Password</label>
                  <input
                    id="password"
                    type="password"
                    className={`text-black ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    {...register("password")}
                  />
                  {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <button type="submit" className="button-signup">Registrarse</button>
              </form>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
