"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { BsBuildings } from "react-icons/bs";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

export default function Home() {
  const [idenviar, setIdenviar] = useState('');
  const [resspuesta, setResspuesta] = useState('valor inicial');

  useEffect(() => {
    //pruebaMultenant().then(result => result).catch(error => console.log(error));
  }, []);

  const pruebaMultenant = async () => {
    try {
      // Obtener usuarios de empresa_a
      const responseA = await fetch(`localhost:3000/tenants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: "preubaMiguel",
          tenantId: "preubamiguel"
        }),
      });

      if (!responseA.ok) {
        throw new Error(`HTTP error! Status: ${responseA.status}`);
      }

      const dataA = await responseA.json();
      console.log("elementos empresa A:", dataA);

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header anclado en la parte superior */}
      <header className="w-full">
        <Header />
      </header>

      {/* Contenido principal que ocupa el espacio restante */}
      <main className="homepage flex-grow w-full ">
        <div className="flex flex-col items-center justify-center gap-16 sm:flex-row mt-28">
          <Link href={`/register`} className="card">
            <div>
              <figure className="icon-container">
                <BsBuildings
                  className="w-44 h-44 object-cover icon"
                  alt="companyImage"
                />
              </figure>
              <div className="contenido">
                <h3>Company</h3>
                <p>Chasqi for Companies</p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer anclado en la parte inferior */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
