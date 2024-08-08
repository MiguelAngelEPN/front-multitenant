"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function KpiEvaluation() {
    let params = useParams();
    console.log('params: ', params)
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
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            console.log("field result: ", data1)
            setFieldFilter(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getKPIEcaluation = async () => {
        console.log("entro a getKPIEcaluation")
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/tasklogs?key=${selectedField}`, {
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
            setKpiPercentage(data1.kpiPercentage);

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
        <div className="animated-gradient flex items-center justify-center min-h-screen p-4 flex-col">
            <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>
            <div className='h-[400px] w-[500px] bg-white bg-opacity-50 p-10 rounded-lg shadow-lg backdrop-blur-sm  text-[black]'>
                <p className='text-center text-xl font-bold'>KPI EVALUATION</p><br />
                <div className="mb-4 space-x-10">
                    <p className='text-lg'>Rango de fechas:</p>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex space-x-5 justify-center items-center'>
                    <p className='text-lg'>Campo a evaluar:</p>
                    <select
                        className="text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <button className='text-black bg-green-300 hover:bg-green-500 font-semibold py-2 px-4 rounded-full shadow-md transition-all' onClick={getFields}>
                        Obtener campos
                    </button><br />
                </div><br />

                <button className='text-black bg-green-300 hover:bg-green-500 font-semibold py-2 px-4 rounded-full shadow-md transition-all'
                    onClick={() => {
                        getKPIEcaluation()
                        getKPIbyID()
                    }}>
                    Calcular porcentaje
                </button><br />
            </div><br />

            <div className='h-[300px] w-[500px] bg-white bg-opacity-50 p-10 rounded-lg shadow-lg backdrop-blur-sm text-[black]'>
                <p className='text-center text-lg font-bold mb-1'>Descripción: {kpiInformation.description}</p>
                <p className='text-center text-lg font-bold mb-1'>Objetivo: {kpiInformation.target}</p>
                <p className='text-center text-lg font-bold mb-1'>Cantidad de días: {kpiInformation.timeUnit}</p>
                <p className='text-center text-lg font-bold mb-1'>Número de entregables: {kpiPercentage}%</p>
                <p className='text-center text-lg font-bold mb-1'>Barra de progreso: {kpiPercentage}%</p>
                <div className="relative pt-1">
                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${kpiPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}