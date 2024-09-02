"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function PageTaskListEmployee() {
    const [tenantId, setTenantId] = useState('');
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;

    useEffect(() => {
      // Obtener el token del localStorage
      const token = localStorage.getItem("authToken");
  
      if (token) {
        const userData = JSON.parse(token);
        setTenantId(userData.tenantId);
        getTasksListEmployee(userData.tenantId)
        getEmployeeName(userData.tenantId);
      }
    }, []);
  
    let params = useParams(); 
    console.log('params: ', params)
    const [employeeId, setEmployeeId] = useState(params.idEmployee);
    const [employeeName, setEmployeeName] = useState('');
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    const getTasksListEmployee = async (tenantId) => {
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`${backdorection}/employees/${employeeId}/tasks`, {
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
            setTasks(data);
            console.log("Respuesta: ", data);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getEmployeeName = async (tenantId) => {
        try {
            //Obtener el nombre del empleado con x-tenant-id en backend
            const response = await fetch(`${backdorection}/employees/${employeeId}/name`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const name = await response.text();
            setEmployeeName(name);
            console.log("Respuesta: ", name);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    const getTableHeaders = () => {
        const allKeys = tasks.reduce((keys, task) => {
            return [...keys, ...Object.keys(task)];
        }, []);

        return [...new Set(allKeys)].filter((key) => key !== 'kpis' && key !== 'tasklogs' && key !== '_id');
    };

    const tableHeaders = getTableHeaders();
    const hasTasks = tasks.length > 0;

    const handleButtonClickKPI = (IdTask) => {
        router.push(`/company/employees/${params.idEmployee}/${IdTask}`);
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

    return (<>
        <div className="rounded-3xl homepage flex items-center min-h-screen p-4 flex-col">
            <div className='flex justify-end w-full'>
                <Link href={`/company/employees`} className=" top-4 left-4 bg-[--primary-color] bg-opacity-50 hover:bg-[--secondary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div><br />

            <div className='mt-10'>
                <h2 className='text-center text-[32px] text-[--primary-color]'>List tasks</h2>
                <p className='text-[24px] text-[--secondary-color]'>Employee: {employeeName}</p>
            </div>

                <Link href={`/company/employees/${params.idEmployee}/CreateTask`}
                    className="my-5 py-2 bg-[--secondary-color] text-white rounded-full font-semibold hover:bg-purple-800 transition-colors w-[220px] text-center"
                >
                    Assign Task to Employee
                </Link>
            
            {/*---------- tabla dinámica para tasks con campos variables ----------*/}
            <div className="flex justify-center">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-slate-300 shadow-md rounded-lg overflow-hidden border-2">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                {tableHeaders.map((header) => (
                                    <th key={header} className="py-3 px-3 uppercase tracking-wider text-[13px] text-center">
                                        {header.replace(/_/g, ' ')}
                                    </th>
                                ))}
                                {hasTasks && (
                                    <th className="py-3 px-3 uppercase tracking-wider text-[13px] text-center">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className='text-black'>
                            {tasks.map((task, index) => (
                                <tr
                                    key={task._id}
                                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                >
                                    {tableHeaders.map((header) => (
                                        <td key={header} className="py-3 px-3 text-[12px] text-center">
                                            {renderCellContent(header, task[header]?.name || task[header])}
                                        </td>
                                    ))}
                                    <td className="py-3 px-2">
                                        <button
                                            onClick={() => handleButtonClickKPI(task._id)}
                                            className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2 text-[12px]"
                                        >
                                            Logs and KPIs
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    );
}