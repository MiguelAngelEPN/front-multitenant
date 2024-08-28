"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateKpibyMetricsTime() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;
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
        const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis`, {
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
        <div className="rounded-3xl min-h-screen flex flex-col items-center justify-center p-6 homepage">

            <div className='flex justify-end w-full'>
                <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}/createKPIForm`} className=" top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div><br />

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border-2 border-[--primary-color]">
                <h1 className="text-3xl font-semibold mb-6 text-center text-[--primary-color]">Crear KPI para Tarea con métricas de unidad de tiempo</h1>
                <form onSubmit={handleSubmit} className='text-black'>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[--secondary-color] mb-2">Título del KPI</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[--secondary-color] mb-2">Objetivo (Target)</label>
                        <input
                            type="number"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
                        />
                    </div>
                    <div className="mb-6">
                        <p className='block text-m font-medium text-[--secondary-color] mb-2'>Rango de fechas:</p>
                        <div className='w-full flex justify-between'>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-[--secondary-color] mb-2'>Fecha de inicio:</p>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
                                />
                            </div>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-[--secondary-color] mb-2'>Fecha de fin:</p>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-[--primary-color] text-white rounded-full hover:bg-[--secondary-color] focus:outline-none focus:ring-2 focus:ring-[--primary-color] transition-all"
                    >
                        Crear KPI
                    </button>
                </form>
            </div>
        </div>
    );
}