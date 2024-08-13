"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function KpiEvaluation() {
    let params = useParams();
    //console.log('params: ', params)
    const [kpiPercentage, setKpiPercentage] = useState(0)
    const [fieldFilter, setFieldFilter] = useState(["nombre_cliente",
        "numero_factura",
        "valor_factura",
        "tipo_factura",
        "sucursal",
        "registrada",
        "fecha_registro"])
    const [selectedField, setSelectedField] = useState("");
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [kpiInformation, setKpiInformation] = useState('')

    useEffect(() => {

    }, []);
    const getFields = async () => {
        console.log("entro a getFields")
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/tasklog-keys`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": params.idtenant, //Pasar el id de la empresa como x-tenant-id
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            //console.log("field result: ", data1)
            setFieldFilter(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getKPIEcaluation = async () => {
        console.log("entro a getKPIEcaluation")
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/tasklogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": params.idtenant, //Pasar el id de la empresa como x-tenant-id
                },
                body: JSON.stringify({
                    key: selectedField,
                    startDate: startDate,
                    endDate: endDate,
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
            const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis/${params.id_kpi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": params.idtenant, //Pasar el id de la empresa como x-tenant-id
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
    const handleSelectChange = (event) => {
        setSelectedField(event.target.value);
    };

    return (
        <div className="homepage flex items-center justify-center min-h-screen p-4 flex-col">
            <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>
            <div className='flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5'>
                <div className='h-[400px] w-[500px] bg-white bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-sm text-[var(--tertiary-color)] border-2 border-[var(--primary-color)]'>
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

                    <div className='mb-4'>
                        <p className='text-lg text-[var(--secondary-color)]'>Campo a evaluar:</p>
                        <div className='flex space-x-5 justify-center items-center'>
                            <select
                                className="text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                value={selectedField}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select a field</option>
                                {fieldFilter.map((field, index) => (
                                    <option key={index} value={field}>
                                        {field}
                                    </option>
                                ))}
                            </select>
                            <button className='text-white bg-[var(--background-primary-button)] hover:bg-[var(--background-secundary-button)] font-semibold py-2 px-4 rounded-full shadow-md transition-all' onClick={getFields}>
                                Obtener campos
                            </button>
                        </div>
                    </div><br />
                    <div className='flex justify-center items-center'>
                        <button className='text-white bg-[var(--background-primary-button)] hover:bg-[var(--background-secundary-button)] font-semibold py-2 px-4 rounded-full shadow-md transition-all'
                            onClick={() => {
                                getKPIEcaluation()
                                getKPIbyID()
                            }}>
                            Calcular porcentaje
                        </button>
                    </div>
                </div><br />
            </div>


            <div className='h-[500px] w-[500px] bg-white bg-opacity-50 p-10 rounded-lg shadow-lg backdrop-blur-sm text-[black]'>
                <p className='text-center text-lg font-bold mb-1'>Descripción: {kpiInformation.Description}</p>
                <p className='text-center text-lg font-bold mb-1'>Cantidad de días: {kpiInformation.timeUnit}</p>
                <p className='text-center text-lg font-bold mb-1'>Días laborales (Sin Sábados ni Domingos): {kpiPercentage.daysConsidered}</p>

                <p className='text-center text-lg font-bold mb-1'>Número de entregables objetivo: {kpiPercentage.targetSales}</p>

                <p className='text-center text-lg font-bold mb-1'>Número de entregables existentes: {kpiPercentage.totalCount}</p>

                <p className='text-center text-lg font-bold mb-1'>Objetivo diario: {kpiInformation.target}</p>

                <p className='text-center text-lg font-bold mb-1'>
                    Barra de progreso: {kpiPercentage.kpiPercentage}%
                </p>
                <div className="relative pt-1">
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${kpiPercentage.kpiPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all"></div>
                    </div>
                </div>
                <div className={`mt-4 p-4 rounded-lg text-white flex items-center justify-center ${kpiPercentage.kpiPercentage <= 40 ? 'bg-red-500' : kpiPercentage.kpiPercentage <= 69 ? 'bg-yellow-500' : 'bg-green-500'}`}>
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
    );
}