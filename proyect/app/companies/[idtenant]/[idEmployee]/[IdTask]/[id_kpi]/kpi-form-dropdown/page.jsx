"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function KpiFormDropdown() {
    let params = useParams();
    const [kpiInformation, setKpiInformation] = useState('')

    useEffect(() => {
        getKPIbyID();
    }, []);

    const getKPIbyID = async () => {
        try {
            const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis/${params.id_kpi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": params.idtenant,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            setKpiInformation(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    return (
        <div className="homepage flex items-center justify-center min-h-screen p-4 flex-col">
            <div className='flex justify-end w-full'>
                <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div>
            <div className='flex justify-center w-full'>
                <div className='custom-shadow w-[900px] bg-white bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm text-[var(--tertiary-color)] border-2 border-[var(--primary-color)]'>
                    <p className='text-center text-[24px] font-bold text-[var(--primary-color)]'>Evaluation "Criteria Dropdown"</p><br />

                    <div className="flex mb-2">
                        <p className='text-lg text-[var(--secondary-color)] mr-2'>Title:</p>
                        <p className='text-lg text-black'>{kpiInformation.title}</p>
                    </div>

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

                    <div>
                        <p className='text-center text-[24px] font-bold text-[var(--primary-color)]'>Dropdown criterias</p><br />
                        <ul className='text-black'>
                            {kpiInformation.dropdownCriteria && kpiInformation.dropdownCriteria.map((criteria, index) => (
                                <li key={index} className="mb-2">
                                    <span className="font-bold">{criteria.value}</span>: {criteria.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div><br />
            </div>
        </div>
    );
}