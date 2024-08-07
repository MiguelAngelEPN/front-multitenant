"use client"
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function PageTaskLogsKpis() {
    let params = useParams();
    console.log('params: ', params)
    const [tenantId, setTenantId] = useState(params.idtenant);
    const [employeeId, setEmployeeId] = useState(params.idEmployee);
    const [taskId, setTaskId] = useState(params.IdTask);
    const [kpis, setKpis] = useState([]);
    const [tasklogs, setTaskLogs] = useState([]);
    const router = useRouter();

    const getTasksLogsList = async () => {
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees/${employeeId}/task/${taskId}/tasklogs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTaskLogs(data);
            console.log("Respuesta: ", data);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getKPIsList = async () => {
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`http://localhost:3000/employees/${employeeId}/tasks/${taskId}/kpis`, {
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
            setKpis(data1);
            console.log("Respuesta: ", data1);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getTableTaskLogsHeaders = () => {
        const allKeys = tasklogs.reduce((keys, task) => {
            return [...keys, ...Object.keys(task)];
        }, []);

        return [...new Set(allKeys)].filter((key) => key !== '_id');
    };

    const tableTaskLogsHeaders = getTableTaskLogsHeaders();
    const hasTasksLogs = tasklogs.length > 0;

    const getTableKPIsHeaders = () => {
        const allKeys = kpis.reduce((keys, task) => {
            return [...keys, ...Object.keys(task)];
        }, []);

        return [...new Set(allKeys)].filter((key) => key !== '_id');
    };

    const tableKPIsHeaders = getTableKPIsHeaders();
    const hasKPIs = kpis.length > 0;

    const handleButtonClickKPI = () => {
        router.push(`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`);
    };

    const handleButtonClickLogs = () => {
        router.push(`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createTaskLogs`);
    };

    const renderCellContent = (header, value) => {
        if (typeof value === 'boolean') {
            return value ? (
                <span className="text-green-500 font-bold">&#10003;</span>
            ) : (
                <span className="text-red-500 font-bold">&#10007;</span>
            );
        }

        return typeof value === 'object' ? JSON.stringify(value, null, 2) : value ?? 'N/A';
    };

    return (
        <div className="animated-gradient flex items-center justify-center min-h-screen p-4 flex-col">
            <Link href={`/companies/${params.idtenant}/${params.idEmployee}`} className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>

            <div className='bg-blue-400 w-full flex mb-3'>

                <div>
                    <div className='mt-10 flex flex-col items-center justify-center'>
                        <h2 className='text-[28px] text-rose-900'>List TaskLogs and KPI's</h2>
                        <p className='text-[20px] text-rose-950'>Employee: {employeeId}</p>
                        <p className='text-[20px] text-rose-950'>Task: {taskId}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md bg-opacity-70">
                        <div className="mb-4">
                            <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-2">
                                Tenant Name:
                            </label>
                            <input
                                id="tenantName"
                                type="text"
                                placeholder="CompanyExample"
                                className="text-black block w-full border border-gray-300 rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                                value={tenantId}
                                onChange={e => {
                                    // Limitar la longitud del valor a 400 caracteres
                                    if (e.target.value.length <= 90) {
                                        setTenantId(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {getTasksLogsList(); getKPIsList()}}
                            className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                        >
                            Listar TasksLogs and KPIs
                        </button>
                    </div> <br />

                    <div className='flex justify-evenly'>
                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createTaskLogs`}
                            className="py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors w-[150px] text-center"
                        >
                            Registrar Log
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`}
                            className="py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors w-[150px] text-center"
                        >
                            Registrar KPI
                        </Link>
                    </div>

                </div>

                <div>
                    <div className="flex justify-center">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <tr>
                                        {tableKPIsHeaders.map((header) => (
                                            <th key={header} className="py-3 px-6 text-left uppercase tracking-wider">
                                                {header.replace(/_/g, ' ')}
                                            </th>
                                        ))}
                                        {hasKPIs && (
                                            <th className="py-3 px-3 text-left uppercase tracking-wider">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className='text-black'>
                                    {kpis.map((kpi, index) => (
                                        <tr
                                            key={kpi._id}
                                            className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                        >
                                            {tableKPIsHeaders.map((header) => (
                                                <td key={header} className="py-3 px-6">
                                                    {renderCellContent(header, kpi[header])}
                                                </td>
                                            ))}
                                            <td className="py-3 px-2">
                                                <button
                                                    onClick={() => handleButtonClickKPI()}
                                                    className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2"
                                                >
                                                    Edit
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

            {/*---------- tabla dinámica para tasks con campos variables ----------*/}
            <div className="flex justify-center">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                {tableTaskLogsHeaders.map((header) => (
                                    <th key={header} className="py-3 px-6 text-left uppercase tracking-wider">
                                        {header.replace(/_/g, ' ')}
                                    </th>
                                ))}
                                {hasTasksLogs && (
                                    <th className="py-3 px-3 text-left uppercase tracking-wider">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='text-black'>
                            {tasklogs.map((taskLog, index) => (
                                <tr
                                    key={taskLog._id}
                                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                >
                                    {tableTaskLogsHeaders.map((header) => (
                                        <td key={header} className="py-3 px-6">
                                            {renderCellContent(header, taskLog[header])}
                                        </td>
                                    ))}
                                    <td className="py-3 px-2">
                                        <button
                                            onClick={() => handleButtonClickKPI()}
                                            className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}