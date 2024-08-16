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
    const [timeUnit, setTimeUnit] = useState('');

    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [selectedField, setSelectedField] = useState("");
    const [fieldFilter, setFieldFilter] = useState([""]);

    const [dropdownCriteria, setDropdownCriteria] = useState([]);
    const [newCriterionText, setNewCriterionText] = useState('');
    const [newCriterionValue, setNewCriterionValue] = useState('');

    const handleAddCriterion = () => {
        if (newCriterionText.trim() !== '' && newCriterionValue.trim() !== '') {
            setDropdownCriteria([
                ...dropdownCriteria,
                { text: newCriterionText, value: newCriterionValue },
            ]);
            setNewCriterionText('');
            setNewCriterionValue('');
        }
    };
    // Función para eliminar un criterio específico
    const handleRemoveCriterion = (index) => {
        setDropdownCriteria(dropdownCriteria.filter((_, i) => i !== index));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const timeTargetNumber = Number(target);
        const timeUnitTarget = Number(timeUnit);

        // Crear el cuerpo de la solicitud
        const kpiData = {
            title,
            target: timeTargetNumber,
            timeUnit: timeUnitTarget,
            fieldtobeevaluated: selectedField,
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

    const handleSelectChange = (event) => {
        setSelectedField(event.target.value);
    };

    return (
        <>
            <div className="rounded-3xl min-h-screen flex flex-col items-center justify-center bg-[--complementary-color] p-6 homepage">
                <div className='flex justify-end w-full'>
                    <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPIForm`} className=" top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                        ⬅️ Back
                    </Link>
                </div><br />

                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border-2 border-[--primary-color]">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-[--primary-color]">Crear KPI para Tarea con evaluación por dropdown</h1>
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[--secondary-color] mb-2">Unidad de tiempo (en días)</label>
                            <select
                                value={timeUnit}
                                onChange={(e) => setTimeUnit(e.target.value)}
                                required
                                className="w-full h-[42px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <p className='block text-sm font-medium text-[--secondary-color] mb-2'>Campo a evaluar:</p>
                            <div className='flex justify-between items-center'>
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

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-4 text-[--primary-color]">Evaluación por dropdown</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newCriterionText}
                                    onChange={(e) => setNewCriterionText(e.target.value)}
                                    placeholder="Ingrese un criterio"
                                    className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
                                />
                                <input
                                    type="number"
                                    value={newCriterionValue}
                                    onChange={(e) => setNewCriterionValue(e.target.value)}
                                    placeholder="Ingrese un valor numérico"
                                    className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[--primary-color]"
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={handleAddCriterion}
                                        className="px-4 py-2 text-sm text-white bg-[--secondary-color] rounded-full hover:bg-[--primary-color] transition-all"
                                    >
                                        Añadir Criterio
                                    </button>
                                </div>
                            </div>
                            <ul className="list-disc pl-5">
                                {dropdownCriteria.map((criterion, index) => (
                                    <li
                                        key={index}
                                        className="bg-[--tertiary-color] text-white flex items-center justify-between p-2 my-2 rounded"
                                    >
                                        <span>{criterion.text} - {criterion.value}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCriterion(index)}
                                            className="ml-2 text-red-600 hover:text-red-800 transition-all"
                                        >
                                            ✖
                                        </button>
                                    </li>
                                ))}
                            </ul>
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
        </>

    );
}