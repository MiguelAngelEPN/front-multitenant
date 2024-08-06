"use client"
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Link from 'next/link';

export default function CreateEmployees({ params }) {

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            employee: {
                name: '',
                department: '',
                work_position: '',
                additionalFields: [{ key: '', value: '', type: 'string' }],
            },
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "employee.additionalFields"
    });

    const onFormSubmit = async (data) => {
        const { name, department, work_position, additionalFields } = data.employee;
        const additionalData = additionalFields.reduce((acc, field) => {
            if (field.key && field.value) {
                switch (field.type) {
                    case 'number':
                        acc[field.key] = parseFloat(field.value);
                        break;
                    case 'boolean':
                        acc[field.key] = field.value === 'true';
                        break;
                    case 'date':
                        acc[field.key] = new Date(field.value);
                        break;
                    default:
                        acc[field.key] = field.value;
                }
            }
            return acc;
        }, {});

        const formattedData = {
            name,
            department,
            work_position,
            ...additionalData,
        };

        console.log("data send: ", formattedData);
        // Aquí puedes realizar la petición API con formattedData
        const response = await fetch(`http://localhost:3000/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-tenant-id": params.idtenant, // Pasar el nombre de la empresa como x-tenant-id
            },
            body: JSON.stringify(
                formattedData
            ),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataResponse = await response.json();
        console.log("respuesta: ", dataResponse);
        alert("Employee Successfully Registered")
    }

    return (<>
        <div className="animated-gradient flex items-center justify-center min-h-screen p-8">
            <Link href="/companies/employee-list" className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>
            <div className="w-full max-w-2xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md">
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">Register Employee</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("employee.name", { required: "Name is required" })}
                            />
                            {errors.employee?.name && <p className="mt-1 text-sm text-red-500">{errors.employee.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <input
                                type="text"
                                placeholder="Department"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("employee.department", { required: "Department is required" })}
                            />
                            {errors.employee?.department && <p className="mt-1 text-sm text-red-500">{errors.employee.department.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Work Position</label>
                            <input
                                type="text"
                                placeholder="Work Position"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                {...register("employee.work_position", { required: "Work Position is required" })}
                            />
                            {errors.employee?.work_position && <p className="mt-1 text-sm text-red-500">{errors.employee.work_position.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 ">Additional Fields</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col space-y-2 mb-4 border-t border-gray-200 pt-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Field Key"
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        {...register(`employee.additionalFields.${index}.key`)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Field Value"
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        {...register(`employee.additionalFields.${index}.value`)}
                                    />
                                </div>
                                <div>
                                    <select
                                        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        {...register(`employee.additionalFields.${index}.type`)}
                                    >
                                        <option value="string">String</option>
                                        <option value="number">Number</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    className="self-end px-4 py-2 mt-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm text-white bg-green-500 rounded-full hover:bg-green-600"
                                onClick={() => append({ key: '', value: '', type: 'string' })}
                            >
                                Add Field
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </>)
}
