"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EmployeeList() {
    let params = useParams();
    //console.log('params: ', params)

    const [tenantName, setTenantName] = useState('');
    const [employees, setEmployees] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getEmployeeList()
    }, []);


    const getEmployeeList = async () => {
        try {
            // Obtener usuarios de empresa con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": params.idtenant, // Pasar el nombre de la empresa como x-tenant-id
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

    const handleButtonClick = (idEmployee) => {
        router.push(`/companies/${params.idtenant}/${idEmployee}`);
    };
    //<div className="bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center min-h-screen p-4 flex-col">
    return (<>
        <div className="rounded-3xl homepage flex items-center min-h-screen p-4 flex-col">
            <div className='flex justify-end w-full'>
                <Link href="/companies" className=" top-4 left-4 bg-[--secondary-color] bg-opacity-50 hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div><br />
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <Link href={`/companies/${params.idtenant}/create-employee`}
                    className="mt-3 py-2 bg-[--secondary-color] text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors w-[200px] text-center"
                >
                    Create Employee
                </Link><br />
                {/*---------- tabla dinámica para empleados con campos variables ----------*/}
                <div className="flex justify-center">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-300 shadow-md rounded-lg overflow-hidden border-2">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                <tr>
                                    {tableHeaders.map((header) => (
                                        <th key={header} className="py-3 px-3 text-left uppercase tracking-wider text-[13px] text-center">
                                            {header.replace(/_/g, ' ')}
                                        </th>
                                    ))}
                                    {hasEmployees && (
                                        <th className="py-3 px-6 text-left uppercase tracking-wider text-[13px] text-center">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className='text-black'>
                                {employees.map((employee, index) => (
                                    <tr
                                        key={employee._id}
                                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                    >
                                        {tableHeaders.map((header) => (
                                            <td key={header} className="py-3 px-3 text-[12px] text-center">
                                                {typeof employee[header] === 'object'
                                                    ? JSON.stringify(employee[header], null, 2)
                                                    : employee[header] ?? 'N/A'}
                                            </td>
                                        ))}
                                        <td className="py-3 px-6">
                                            <button
                                                onClick={() => handleButtonClick(employee._id)}
                                                className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-[13px]"
                                            >
                                                Task
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>)
}