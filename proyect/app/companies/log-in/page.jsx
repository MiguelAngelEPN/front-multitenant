"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/home/Header';

export default function EmployeeList() {
    const [tenantName, setTenantName] = useState('');
    const [employees, setEmployees] = useState([]);
    const router = useRouter();


    const getEmployeeList = async () => {
        try {
            // Obtener usuarios de empresa con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantName, // Pasar el nombre de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setEmployees(data);
            console.log("respuesta:", data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const getTableHeaders = () => {
        const allKeys = employees.reduce((keys, employee) => {
            return [...keys, ...Object.keys(employee)];
        }, []);

        // Exclude 'tasks' and 'Actions' since it will be manually added
        return [...new Set(allKeys)].filter((key) => key !== 'tasks' && key !== 'tenantId');
    };

    const tableHeaders = getTableHeaders();
    const hasEmployees = employees.length > 0;


    //<div className="bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center min-h-screen p-4 flex-col">
    return (<>
        <Header />
        <div className=" homepage flex items-center min-h-screen p-4 flex-col">

            <div className="bg-[--primary-color] rounded-lg shadow-lg p-8 w-full max-w-md bg-opacity-70 custom-shadow">
                <div className="flex flex-col items-center space-y-2">
                    <label htmlFor="tenantName" className="block text-[32px] font-medium text-white mb-2">
                        Lon In
                    </label>
                    <select
                        id="tenantName"
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                        value={tenantName}
                        onChange={e => setTenantName(e.target.value)}
                    >
                        <option value="" disabled>Selecciona una compañía</option>
                        <option value="pinturaaereo">pinturaaereo</option>
                        <option value="mconstruye">mconstruye</option>
                        <option value="electricomma">electricomma</option>
                        <option value="construex">construex</option>
                        <option value="chasqi">chasqi</option>
                    </select>

                    <Link
                        href={`/companies/${tenantName}`}
                        className="w-[85%] mt-2 py-2 bg-[--complementary-color] text-black rounded-lg font-semibold hover:bg-slate-300 transition-colors text-center"
                    >
                        Entrar
                    </Link>
                </div>
            </div>

        </div>
    </>)
}