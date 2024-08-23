"use client"
import React from 'react'
import { useEffect, useState } from "react";
import Link from 'next/link';
import './style.css'
import Header from '@/components/home/Header';
import Footer from "@/components/home/Footer";
import { getServerSession } from "next-auth/next";
import authOptions from "@/auth";

function Companies() {

    const [companyRegister, setCompanyRegister] = useState('');
    const [idCompanyRegister, setIdCompanyRegister] = useState('');

    const pruebaMultenant = async () => {
        try {
            // Obtener usuarios de empresa_a
            const responseA = await fetch(`http://localhost:3000/tenants`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    companyName: companyRegister,
                    tenantId: idCompanyRegister
                }),
            });

            if (!responseA.ok) {
                throw new Error(`HTTP error! Status: ${responseA.status}`);
            }

            const data = await responseA.json();
            console.log("respuesta:", data);
            alert("Registro de company exitoso")

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    return (
        <div className='fixed-scale mx-auto max-w-screen-2xl'>
            <Header />
            <div className="homepage flex items-center justify-center min-h-[80vh]">
                <div className="contenedorPadre flex flex-col items-center p-6 bg-opacity-70 rounded-lg shadow-lg">
                    <p className="title-left">REGISTER COMPANY</p><br />
                    <div className="flex flex-col w-full space-y-4 text-black formularioregistercompany">
                        <div className="flex flex-col text-[white]">
                            <label className="text-xl text-[--complementary-color] text-left">Company Name:</label>
                            <input
                                type="text"
                                placeholder="CompanyExample"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={companyRegister}
                                onChange={(e) => {
                                    if (e.target.value.length <= 90) {
                                        setCompanyRegister(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl text-[--complementary-color] text-left">Id Company:</label>
                            <input
                                type="text"
                                placeholder="CompanyExample"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={idCompanyRegister}
                                onChange={(e) => {
                                    if (e.target.value.length <= 90) {
                                        setIdCompanyRegister(e.target.value);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="butonscontinter flex justify-center w-full mt-6 space-x-6">
                        <Link
                            href="./"
                            className="linkref py-2 text-sm font-semibold text-white bg-red-400 rounded-full hover:bg-red-500"
                        >
                            Cancelar
                        </Link>

                        <button
                            onClick={() => {
                                pruebaMultenant();
                            }}
                            className="py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600"
                        >
                            Enviar
                        </button>

                        <Link
                            href="/companies/log-in"
                            className="linkref py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
                        >
                            Siguiente
                        </Link>

                    </div><br />
                </div>


            </div>
            <Footer />
            </div>
    )
}

export default Companies