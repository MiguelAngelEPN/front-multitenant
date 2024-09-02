"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {useSession } from "next-auth/react";
export default function Navbar() {
  
  //const {data: session, status} = useSession();
  //console.log({session, status})
  const [tenantId, setTenantId] = useState(null);
  const router = useRouter()

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      const userData = JSON.parse(token);
      setTenantId(userData.tenantId);
    } else {
      router.push(`/login`);
    }
  }, []);
  //bg-[#A268A7]
  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("authToken");

    // Redirigir a la página de inicio de sesión
    router.push(`/login`);
  };
  return (
    <div className="w-full flex h-14 bg-[#E7E5EE]">
      <div className="flex w-full">
        <div className="">
          <Link href="/company/employees">
            <Image src="/assets/backgrounds/icon_62.png" alt="ConstruEX Logo" width={260} height={50} className="logoCX" priority />
          </Link>
        </div>
        <nav className="flex items-center justify-end w-full h-full">

          <div className='mr-8'>
            <button className='bg-red-600 text-white rounded-full p-2 w-20'
              onClick={handleLogout}>
              Salir
            </button>
          </div>

          <div className='bg-[--complementary-color] rounded-full border-3 border-solid border-[#D4D2DB] pl-10 pr-2 h-10 flex items-center text-[--tertiary-color]'>
            {tenantId ? tenantId : 'Loading ...'}
            <div className="cursor-pointer ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-user-round"
              >
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
