"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateKpibyDropdown() {
    const router = useRouter();
    let params = useParams();
    console.log('params: ', params)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');

    const [dropdownCriteria, setDropdownCriteria] = useState([]);
    const [newCriterion, setNewCriterion] = useState('');

    const handleAddCriterion = () => {
        if (newCriterion.trim() !== '') {
            setDropdownCriteria([...dropdownCriteria, newCriterion]);
            setNewCriterion('');
        }
    };
    // Función para eliminar un criterio específico
    const handleRemoveCriterion = (index) => {
        setDropdownCriteria(dropdownCriteria.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const timeTargetNumber = Number(target);

        // Crear el cuerpo de la solicitud
        const kpiData = {
            title,
            target: timeTargetNumber,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            evaluationType: 'dropdown',
            dropdownCriteria
        };
        console.log('datos a enviar: ', kpiData)

        // Enviar los datos al backend
        /* */
        const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-tenant-id": params.idtenant, // Pasar el id de la empresa como x-tenant-id
            },
            body: JSON.stringify(kpiData),
        });

        if (response.ok) {
            alert('KPI creado exitosamente');
            // Redirigir o realizar otras acciones
        } else {
            alert('Error al crear el KPI');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-6 homepage">
            <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>

            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Crear KPI para Tarea con evaluación por dropdown</h1>
                <form onSubmit={handleSubmit} className='text-black'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Título del KPI</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo (Target)</label>
                        <input
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className='block text-sm font-medium text-gray-700 mb-2'>Rango de fechas:</p>
                        <div className='w-full flex justify-between'>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-gray-700 mb-2'>fecha de inicio:</p>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-gray-700 mb-2'>fecha de fin:</p>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Evaluación por dropdown</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={newCriterion}
                                onChange={(e) => setNewCriterion(e.target.value)}
                                placeholder="Ingrese un criterio"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddCriterion}
                                className="mt-2 w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Añadir Criterio
                            </button>
                        </div>
                        <ul className="list-disc pl-5">
                            {dropdownCriteria.map((criterion, index) => (
                                <li key={index} className="text-gray-700 flex items-center justify-between">
                                    {criterion}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCriterion(index)}
                                        className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                                    >
                                        ✖
                                    </button>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Crear KPI
                    </button>
                </form>
            </div>
        </div>
    );
}