"use client"
import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function CreateTaskLogs() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;
    const [tenantId, setTenantId] = useState('');
    const [task, setTask] = useState('');
    const [additionalFields, setAdditionalFields] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const userData = JSON.parse(token);
            setTenantId(userData.tenantId);
            fetchTask(userData.tenantId);
            getFields(userData.tenantId);
        }
    }, []);

    let params = useParams();
    //console.log('params: ', params);

    const fetchTask = async (tenantId) => {
        try {
            const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching task');
            }

            const task = await response.json();
            console.log('Task fetched:', task);
            setTask(task);
            return task;
        } catch (error) {
            console.error('Error:', error);
            // Manejar el error según sea necesario
        }
    };
    const getFields = async (tenantId) => {// get adicional fields - task
        console.log("entro a getFields")
        try {
            //Obtener tareas de empleados con x-tenant-id
            const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/task-keys`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId, //Pasar el id de la empresa como x-tenant-id
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();

            // Filtrar el campo 'departament'
            data = data.filter(field => field !== 'departament');
            console.log("field result: ", data);

            setAdditionalFields(data);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };


    const { register, handleSubmit, control, watch } = useForm({
        defaultValues: {
            tasklogs: {
                additionalFields: [{ key: '', value: '', type: 'string' }],
            },
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tasklogs.additionalFields",
    });

    const onFormSubmit = async (data) => {
        const processedData = {
            ...data,
            additionalFields: additionalFields.reduce((acc, field) => {
                acc[field] = {
                    name: field,
                    value: task[field]?.value || "",
                    userInput: data.tasklogs.additionalFields[field],
                };
                return acc;
            }, {}),
        };

        console.log("data send: ", processedData.additionalFields);

        /**/const response = await fetch(`${backdorection}/employees/${params.idEmployee}/task/${params.IdTask}/tasklogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tenant-id": tenantId,
            },
            body: JSON.stringify(processedData.additionalFields),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataResponse = await response.json();
        console.log("respuesta: ", dataResponse);
        alert("TaskLogs Successfully Registered");
    };
    const renderFields = () => {
        return additionalFields.map((field, index) => {
            const matchedField = task[field] || {}; // Hacer "match" con los datos de la tarea
            // Determinar el tipo de input basado en el valor esperado
            let inputType;
            switch (matchedField.value) {
                case 'string':
                    inputType = 'text';
                    break;
                case 'number':
                    inputType = 'number';
                    break;
                case 'boolean':
                    inputType = 'select';
                    break;
                case 'date':
                    inputType = 'date';
                    break;
                default:
                    inputType = 'text';
                    break;
            }

            return (
                <div key={index} className="flex flex-col space-y-2 mb-4 border-t border-gray-200 pt-4">
                    <label className="text-black">{matchedField.name || field}</label>
                    {inputType === 'select' ? (
                        <select
                            className="text-black block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            {...register(`tasklogs.additionalFields.${field}`)}
                        >
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    ) : (
                        <input
                            type={inputType}
                            placeholder={`Enter ${matchedField.name || field}`}
                            className="text-black block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            {...register(`tasklogs.additionalFields.${field}`)}
                        />
                    )}
                </div>
            );
        });
    };

    return (
        <div className="rounded-3xl homepage flex flex-col items-center justify-center min-h-screen p-8">
            <div className='flex justify-end w-full'>
                <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}`} className="top-4 left-4 bg-[--secondary-color] bg-opacity-50 hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border-2 border-[--primary-color]">
                {task && (
                    <div className="mb-6 p-4 bg-[--primary-color] text-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-2">Task Details</h3>
                        <p><strong>Title:</strong> {task.title}</p>
                        <p><strong>Priority:</strong> {task.priority}</p>
                        <p><strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
                        <p><strong>State:</strong> {task.state}</p>
                        <p><strong>{task.departament ? 'Departament:' : ''}</strong> {task.departament ? task.departament : ''}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <h2 className="text-center text-3xl font-semibold text-[--primary-color] mb-2">Register TaskLog</h2>

                    <div className="space-y-4">
                        <label className="block text-xl font-medium text-black">Additional Fields</label>
                        {renderFields()}
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-6 py-2 w-full text-sm font-semibold text-white bg-[--primary-color] rounded-full hover:bg-fuchsia-900 border-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );

}