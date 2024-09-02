"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function KpiEvaluation() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;
    const [tenantId, setTenantId] = useState('');
    const router = useRouter();

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

    let params = useParams();
    console.log('params: ', params)
    const [kpiPercentage, setKpiPercentage] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [kpiInformation, setKpiInformation] = useState('')

    const [excludedDays, setExcludedDays] = useState([]);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleDayChange = (day) => {
        setExcludedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const getKPIEcaluation = async () => {
        console.log("entro a getKPIEcaluation")
        console.log("startDate: ", startDate)
        console.log("endDate: ", endDate)
        console.log("dias excluidas: ", excludedDays)
        try {
            //Obtener tareas de empleados con x-tenant-id
            /**/const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/kpi/${params.id_kpi}/evaluation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate,
                excludedDays: excludedDays,
            }),
        });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            console.log('data1: ', data1)
            setKpiPercentage(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };
    const getKPIbyID = async () => {
        console.log("entro a getKPIEcaluation")
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis/${params.id_kpi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            console.log("KpiInformation: ", data1)
            setKpiInformation(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    return (
        <div className="rounded-3xl homepage flex items-center justify-center min-h-screen p-4 flex-col">

            <div className='flex justify-end w-full'>
                <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}`} className="top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div>

            <div className='flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5'>
                <div className='custom-shadow w-[500px] bg-white bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm text-[var(--tertiary-color)] border-2 border-[var(--primary-color)]'>
                    <p className='text-center text-[24px] font-bold text-[var(--primary-color)]'>Evaluation Criteria</p><br />

                    <div className="mb-4">
                        <p className='text-lg mb-2 text-[var(--secondary-color)]'>Rango de fechas:</p>
                        <div className="flex space-x-4">
                            <div>
                                <label htmlFor="start-date" className="block text-sm font-medium text-[var(--tertiary-color)]">Fecha de inicio</label>
                                <input
                                    id="start-date"
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                />
                            </div>
                            <div>
                                <label htmlFor="end-date" className="block text-sm font-medium text-[var(--tertiary-color)]">Fecha de fin</label>
                                <input
                                    id="end-date"
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                />
                            </div>
                        </div>
                    </div>

                    {startDate && endDate && (
                        <div className="mb-4">
                            <p className='text-lg text-[var(--secondary-color)]'>Excluir días de la semana:</p>
                            <div className='flex flex-wrap space-x-1 justify-center'>
                                {weekdays.map(day => (
                                    <div
                                        key={day}
                                        className={`flex flex-col items-center p-2 rounded-full cursor-pointer transition-all ${excludedDays.includes(day) ? 'bg-[--primary-color] text-[--primary-color] border-red-400' : 'bg-gray-100 text-gray-800 border-gray-300'}`}
                                        onClick={() => handleDayChange(day)}
                                    >
                                        <input
                                            type="checkbox"
                                            id={day}
                                            value={day}
                                            checked={excludedDays.includes(day)}
                                            onChange={() => handleDayChange(day)}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={day}
                                            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-white border-2"
                                        >
                                            {day.substring(0, 2)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <br />
                    <div className='flex justify-center items-center'>
                        <button className='text-white bg-[var(--background-primary-button)] hover:bg-[var(--background-secundary-button)] font-semibold py-2 px-4 rounded-full shadow-md transition-all'
                            onClick={() => {
                                getKPIEcaluation();
                                getKPIbyID();
                            }}>
                            Calcular porcentaje
                        </button>
                    </div>
                </div><br />

                <div className='custom-shadow border-2 border-[var(--secondary-color)] h-[420px] w-[600px] bg-[#EEEBF9] p-10 rounded-lg flex flex-col justify-center'>

                    <p className='text-center text-2xl font-bold text-[--primary-color]'>Evaluation Results</p><br />

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Descripción: </p>
                        <p className='text-lg text-black'>{kpiInformation.description}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Unidad de tiempo en días: </p>
                        <p className='text-lg text-black'>{kpiInformation.timeUnit}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Objetivo en unidad de tiempo: </p>
                        <p className='text-lg text-black'>{kpiInformation.target}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Días laborales: </p>
                        <p className='text-lg text-black'>{kpiPercentage.daysConsidered}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Días no considerados: </p>
                        <p className='text-lg text-black'>{kpiPercentage.daysConsidered}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Número de entregables objetivo: </p>
                        <p className='text-lg text-black'>{kpiPercentage.targetSales}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Número de entregables existentes: </p>
                        <p className='text-lg text-black'>{kpiPercentage.totalCount}</p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>
                            {kpiPercentage.totalCount > kpiPercentage.targetSales
                                ? 'Número de entregables excedentes:'
                                : 'Número de entregables faltantes:'}
                        </p>
                        <p className='text-lg text-black'>
                            {(kpiPercentage.targetSales - kpiPercentage.totalCount) < 0
                                ? (kpiPercentage.targetSales - kpiPercentage.totalCount) * -1
                                : (kpiPercentage.targetSales - kpiPercentage.totalCount) }
                        </p>
                    </div>

                    <div className='flex'>
                        <p className='text-center text-lg text-[--secondary-color] font-bold mr-1'>Porcentage: </p>
                        <p className='text-lg text-black'>{kpiPercentage.kpiPercentage}%</p>
                    </div>

                    <div className="relative pt-1">
                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                            <div
                                style={{ width: `${kpiPercentage.kpiPercentage}%` }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all ${kpiPercentage.kpiPercentage <= 40 ? 'bg-red-500' :
                                    kpiPercentage.kpiPercentage <= 69 ? 'bg-yellow-500' :
                                        'bg-green-500'
                                    }`}>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-1 p-4 rounded-lg text-white flex items-center justify-center ${kpiPercentage.kpiPercentage <= 40 ? 'bg-red-500' :
                        kpiPercentage.kpiPercentage <= 69 ? 'bg-yellow-500' :
                            'bg-green-500'
                        }`}>
                        {kpiPercentage.kpiPercentage <= 40 && (
                            <>
                                <span className="mr-2">😞</span>
                                <p>Reprobado</p>
                            </>
                        )}
                        {kpiPercentage.kpiPercentage > 40 && kpiPercentage.kpiPercentage <= 69 && (
                            <>
                                <span className="mr-2">😐</span>
                                <p>Mejorando</p>
                            </>
                        )}
                        {kpiPercentage.kpiPercentage > 69 && (
                            <>
                                <span className="mr-2">😊</span>
                                <p>Aprobado</p>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}