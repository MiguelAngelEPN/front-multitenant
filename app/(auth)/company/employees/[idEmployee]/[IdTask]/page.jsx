"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function PageTaskLogsKpis() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;
    const [tenantId, setTenantId] = useState('');

    useEffect(() => {
      // Obtener el token del localStorage
      const token = localStorage.getItem("authToken");
  
      if (token) {
        const userData = JSON.parse(token);
        setTenantId(userData.tenantId);
        getTasksLogsList(userData.tenantId);
        getKPIsList(userData.tenantId);
        getEmployeeName(userData.tenantId);
        getTaskTitle(userData.tenantId);
      }
    }, []);

    let params = useParams();
    console.log('params: ', params)
    const [employeeId, setEmployeeId] = useState(params.idEmployee);
    const [taskId, setTaskId] = useState(params.IdTask);
    const [employeeName, setEmployeeName] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [kpis, setKpis] = useState([]);
    const [tasklogs, setTaskLogs] = useState([]);
    const router = useRouter();

    const getTasksLogsList = async (tenantId) => {
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`${backdorection}/employees/${employeeId}/task/${taskId}/tasklogs`, {
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

    const getKPIsList = async (tenantId) => {
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`${backdorection}/employees/${employeeId}/tasks/${taskId}/kpis`, {
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

        return [...new Set(allKeys)].filter((key) => key !== '_id' && key !== 'dropdownCriteria' && key !== 'questions');
    };

    const tableTaskLogsHeaders = getTableTaskLogsHeaders();
    const hasTasksLogs = tasklogs.length > 0;

    const getTableKPIsHeaders = () => {
        const allKeys = kpis.reduce((keys, task) => {
            return [...keys, ...Object.keys(task)];
        }, []);

        return [...new Set(allKeys)].filter((key) => key !== '_id' && key !== 'dropdownCriteria' && key !== 'questions');
    };

    const tableKPIsHeaders = getTableKPIsHeaders();
    const hasKPIs = kpis.length > 0;
    const handleButtonClickKPIEvaluetion = (id_kpi) => {
        router.push(`/company/employees/${params.idEmployee}/${params.IdTask}/${id_kpi}/kpi-evaluation`);
    };

    const handleButtonClickKPI = () => {
        //router.push(`/company/employees/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`);
    };

    const handleButtonClickLogs = () => {
        router.push(`/company/employees/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createTaskLogs`);
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

    const getTaskTitle = async (tenantId) => {
        try {
            //Obtener el nombre del empleado con x-tenant-id en backend
            const response = await fetch(`${backdorection}/employees/${employeeId}/tasks/${taskId}/title`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const title = await response.text();
            setTaskTitle(title);
            console.log("Respuesta: ", title);
        } catch (error) {
            console.error("Fetch error: ", error);
        }
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

    const handleDropdownAction = (kpiId) => {
        // Lógica para manejar la acción del botón "Dropdown Action"
        router.push(`/company/employees/${params.idEmployee}/${params.IdTask}/${kpiId}/kpi-form-dropdown`);
    };

    const handleQuestionsEvaluation = (kpiId) => {
        // Lógica para manejar la acción del botón "Dropdown Action"
        router.push(`/company/employees/${params.idEmployee}/${params.IdTask}/${kpiId}/kpi-form-questions`);
    }

    return (
        <>
            <div className="rounded-3xl homepage flex items-center min-h-screen p-4 flex-col">

                <div className='flex justify-end w-full'>
                    <Link href={`/company/employees/${params.idEmployee}`} className=" top-4 left-4 bg-[--primary-color] bg-opacity-50 hover:bg-[--secondary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                        ⬅️ Back
                    </Link>
                </div><br />

                <div className='w-full flex items-center justify-center mb-1'>

                    <div className='flex flex-col items-center w-1/3'>
                        <div className='mt-2 flex flex-col items-center justify-center'>
                            <h2 className='text-center text-[28px] text-[--primary-color]'>List TaskLogs and KPI's</h2>
                            <p className='text-[20px] text-[--secondary-color]'>Employee: {employeeName}</p>
                            <p className='text-[20px] text-[--secondary-color]'>Task: {taskTitle}</p>
                        </div>

                        <div className='flex space-x-7'>
                            <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}/createTaskLogs`}
                                className="py-2 bg-green-500 text-white rounded-full font-[12px] hover:bg-green-600 transition-colors w-[120px] text-center"
                            >
                                Register Log
                            </Link>

                            <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}/createKPI`}
                                className="py-2 bg-blue-500 text-white rounded-full font-[12px] hover:bg-blue-600 transition-colors w-[130px] text-center"
                            >
                                KPI Percentage
                            </Link>

                            <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}/createKPIForm`}
                                className="py-2 bg-yellow-500 text-black rounded-full font-[12px] hover:bg-yellow-600 transition-colors w-[120px] text-center"
                            >
                                KPI Form
                            </Link>
                        </div>

                    </div>
                </div>


                <div className='ml-4 flex items-center justify-center w-2/3 my-3'>
                    <div className="flex justify-center">
                        <div className="overflow-x-auto">
                            <table className="bg-slate-300 shadow-md rounded-lg overflow-hidden border-2">
                                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <tr>
                                        {tableKPIsHeaders.map((header) => (
                                            <th key={header} className="py-1 px-3 uppercase tracking-wider text-[13px] text-center">
                                                {header.replace(/_/g, ' ')}
                                            </th>
                                        ))}
                                        {hasKPIs && (
                                            <th className="py-1 px-3 uppercase tracking-wider text-[13px] text-center">Actions</th>
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
                                                <td key={header} className="py-1 px-3 text-[12px] text-center">
                                                    {renderCellContent(header, kpi[header])}
                                                </td>
                                            ))}
                                            <td className="py-1 px-2">
                                                {(!kpi.evaluationType || kpi.evaluationType === null) && (
                                                    <button
                                                        onClick={() => handleButtonClickKPIEvaluetion(kpi._id)}
                                                        className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2 text-[13px]"
                                                    >
                                                        Evaluation
                                                    </button>
                                                )}
                                                {kpi.evaluationType === 'dropdown' && (
                                                    <button
                                                        onClick={() => handleDropdownAction(kpi._id)}
                                                        className="py-1 px-3 bg-green-500 text-white rounded-full hover:bg-green-600 mb-2 text-[13px]"
                                                    >
                                                        Criteria evaluation
                                                    </button>
                                                )}
                                                {kpi.evaluationType === 'yes-no-questions' && (
                                                    <button
                                                        onClick={() => handleQuestionsEvaluation(kpi._id)}
                                                        className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 mb-2 text-[13px]"
                                                    >
                                                        Questions evaluation
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                {/*---------- tabla dinámica para tasks con campos variables ----------*/}
                <div className="flex justify-center">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-slate-300 shadow-md rounded-lg overflow-hidden border-2">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                <tr>
                                    {tableTaskLogsHeaders.map((header) => (
                                        <th key={header} className="py-3 px-3 uppercase tracking-wider text-[13px] text-center">
                                            {header.replace(/_/g, ' ')}
                                        </th>
                                    ))}
                                    {hasTasksLogs && (
                                        <th className="py-3 px-3 uppercase tracking-wider text-[13px] text-center">Actions</th>
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
                                            <td key={header} className="py-3 px-3 text-[12px] text-center">
                                                {renderCellContent(header, taskLog[header]?.userInput || taskLog[header])}
                                            </td>
                                        ))}
                                        <td className="py-3 px-2">
                                            <button
                                                onClick={() => handleButtonClickKPI()}
                                                className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-2 text-[13px]"
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
        </>

    );
}