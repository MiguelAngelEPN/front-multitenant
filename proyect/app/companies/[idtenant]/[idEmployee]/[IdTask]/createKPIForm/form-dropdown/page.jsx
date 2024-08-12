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
        <div className="min-h-screen flex items-center justify-center homepage">
            <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>

            <div className="bg-[--primary-color] backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-white">Crear KPI para Tarea con evaluación por dropdown</h1>
                <form onSubmit={handleSubmit} className='text-black'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[--complementary-color] mb-2">Título del KPI</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[--complementary-color] mb-2">Objetivo (Target)</label>
                        <input
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-6">
                        <p className='block text-m font-medium text-[--complementary-color] mb-2'>Rango de fechas:</p>
                        <div className='w-full flex justify-between'>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-[--complementary-color] mb-2'>Fecha de inicio:</p>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-[--complementary-color] mb-2'>Fecha de fin:</p>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4 text-[--complementary-color]">Evaluación por dropdown</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={newCriterion}
                                onChange={(e) => setNewCriterion(e.target.value)}
                                placeholder="Ingrese un criterio"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    onClick={handleAddCriterion}
                                    className="px-4 py-2 text-sm text-white bg-green-500 rounded-full hover:bg-green-600 border-2"
                                >
                                    Añadir Criterio
                                </button>
                            </div>
                        </div>
                        <ul className="list-disc pl-5">
                            {dropdownCriteria.map((criterion, index) => (
                                <li key={index} className="bg-[--complementary-color] text-[--thertiary-color] flex items-center justify-between border-black border-2 p-1 my-2">
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
                        className="w-full px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 border-2"
                    >
                        Crear KPI
                    </button>
                </form>
            </div>
        </div>
    );
}