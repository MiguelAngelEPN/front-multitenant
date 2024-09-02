"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function KpiFormDropdown() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;
    const [tenantId, setTenantId] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Obtener el token del localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
            const userData = JSON.parse(token);
            setTenantId(userData.tenantId);
            getKPIbyID(userData.tenantId);
        }else{
            router.push(`/login`);
        }
    }, []);

    let params = useParams();
    const [kpiInformation, setKpiInformation] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const getKPIbyID = async (tenantId) => {
        try {
            const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis/${params.id_kpi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            console.log('respusl', data1)
            setKpiInformation(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const handleRowClick = (value) => {
        setSelectedValue(value);
        console.log('Selected Value:', value);
    };

    return (
        <>
            <div className="rounded-3xl homepage flex items-center justify-center min-h-screen p-4 flex-col">
                <div className='flex justify-end w-full'>
                    <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}`} className="top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                        ⬅️ Back
                    </Link>
                </div>
                <div className='flex justify-center w-full'>
                    <div className='custom-shadow w-[900px] bg-white bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm text-[var(--tertiary-color)] border-2 border-[var(--primary-color)]'>
                        <p className='text-center text-[24px] font-bold text-[var(--primary-color)]'>Evaluation "Criteria Dropdown"</p><br />

                        <div className="flex mb-2">
                            <p className='text-lg text-[var(--secondary-color)] mr-2'>Start Date:</p>
                            <p className='text-lg text-black'>{new Date(kpiInformation.startDate).toLocaleString()}</p>
                        </div>

                        <div className="flex mb-2">
                            <p className='text-lg text-[var(--secondary-color)] mr-2'>End Date:</p>
                            <p className='text-lg text-black'>{new Date(kpiInformation.endDate).toLocaleString()}</p>
                        </div>

                        <div className="flex mb-2">
                            <p className='text-lg text-[var(--secondary-color)] mr-2'>Evaluation Type:</p>
                            <p className='text-lg text-black'>{kpiInformation.evaluationType}</p>
                        </div>
                        <div className="flex mb-2">
                            <p className='text-lg text-[var(--secondary-color)] mr-2'>target:</p>
                            <p className='text-lg text-black'>{kpiInformation.target}</p>
                        </div>

                        <div>
                            <p className='text-center text-[24px] font-bold text-[var(--primary-color)]'>Dropdown Criteria</p><br />
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 bg-gray-200 text-left font-bold">{kpiInformation.title}</th>
                                        <th className="px-4 py-2 bg-gray-200 text-left font-bold">Criteria</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black">
                                    {kpiInformation.dropdownCriteria && kpiInformation.dropdownCriteria.map((criteria, index) => (
                                        <tr
                                            key={index}
                                            className={`cursor-pointer ${selectedValue === criteria.value ? 'bg-[var(--secondary-color)] text-white' : 'hover:bg-gray-100'}`}
                                            onClick={() => handleRowClick(criteria.value)}>
                                            <td className="border px-4 py-2">{criteria.value}</td>
                                            <td className="border px-4 py-2">{criteria.text}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {selectedValue && (
                            <div className='mt-6 p-4 bg-[var(--primary-color)] text-white text-center text-lg font-bold rounded-lg'>
                                Your evaluation is {(selectedValue / kpiInformation.target) * 100}%
                            </div>
                        )}
                    </div><br />
                </div>
            </div>
        </>
    );
}

