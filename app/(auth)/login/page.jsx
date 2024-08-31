"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import "./login.css"
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { FaGoogle } from "react-icons/fa";
import Btn from "@/components/Btn";

// Definir el esquema de validación con zod
const schema = z.object({
  tenantId: z.string().min(5, "Tenant ID must have at least 5 characters."), // Validación para tenantId
  password: z.string().min(8, "Password must have at least 8 characters."), // Validación para password
});

const LogInPage = () => {
  //console.log("secret:", process.env.NEXT_PUBLIC_NEXTAUTH_SECRET)
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
    try {
      // Llama al endpoint de login en tu backend
      const response = await fetch(`${backdorection}/tenants/login`, {
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
      if (result.status === "error") {
        alert(result.message);
        return;
      }

      // Crear un token simple con la información del usuario
      const token = JSON.stringify({
        tenantId: data.tenantId,
        loggedIn: true,
        // Puedes agregar más información si es necesario
      });

      // Guardar el token en localStorage
      localStorage.setItem("authToken", token);

      // Redirigir a la página principal de la aplicación
      window.location.href = "/company/employees";
    } catch (error) {
      console.error("Error during login process:", error);
      alert("Login failed, please try again.");
    }
  };
  
  // Función para manejar el envío del formulario
  /* const onSubmit = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      tenantId: data.tenantId,
      password: data.password,
    });

    if (!result.error) {
      window.location.href = '/company/employees';
    } else {
      alert('Login failed');
    }
  };*/

  return (
    <div className="fixed-scale mx-auto min-h-screen">

      <Header />

      <div className="homepage flex justify-evenly items-center min-h-[80vh]">
        {/*<Btn />*/}
        <div className="loginContainer">

          <div className="leftHalf">

            <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
              <h1 className='text-white text-[32px] my-3'>Log In</h1><br />

              <div className="loginForm2 mb-[1rem]">
                <label htmlFor="tenantId" className="text-white text-left mb-2 text-[14px] ">Company ID</label>
                <input
                  id="tenantId"
                  type="text"
                  className={`${errors.tenantId ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("tenantId")}
                />
                {errors.tenantId && <p className="text-red-500 text-sm mt-1">{errors.tenantId.message}</p>}
              </div>

              <div className="loginForm2">
                <label htmlFor="password" className="text-white text-left text-[14px] mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  className={`${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="w-[80%] mb-1 mt-[6px]">
                <p className="text-white text-[14px] text-left">
                  <Link href="/">
                    Forgot your password? Click here!
                  </Link>
                </p>
              </div>

              {/*Checkbox*/}
              <div className="">
                <div className="">
                  <input className='' type={"checkbox"} name="checkbox" id="checkbox" />
                  <label className='text-white text-[14px]'>Remember me</label>
                </div>
              </div><br />


              <button type="submit" className="buttonLogin">Log In</button>
            </form>

            <div className='flex justify-center items-center'>
              <button className="socialbuttonLogin w-1/4">
                <div className="socialLogin"><FaGoogle /></div>
              </button>
              <div className='text-white text-center text-[14px] w-3/4'>Or Log in with your google account.</div>
            </div>

          </div>

          <div className="rightHalf">
            <Image src="/assets/backgrounds/icon_62.png" alt="ConstruEX Logo" width={260} height={50} className="chasqilogo mb-8" priority />

            <h1 className="text-black text-center text-[32px] px-5">
              Don&apos;t have an account?
            </h1><br />

            <button className="sigupLogin">
              <Link href="/">
                Register Here
              </Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LogInPage;
