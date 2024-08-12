"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateKpibyQuestions() {
    const router = useRouter();
    let params = useParams();
    console.log('params: ', params)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [questions, setQuestions] = useState([{ text: '', answer: false }]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', answer: false }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = questions.map((question, i) => {
            if (i === index) {
                return { ...question, [field]: value };
            }
            return question;
        });
        setQuestions(newQuestions);
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
            evaluationType: 'yes-no-questions',
            questions: questions.map(q => ({ text: q.text, answer: q.answer })),

        };
        console.log('datos a enviar: ', kpiData)

        // Enviar los datos al backend
        /**/
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
        <div className="min-h-screen flex items-center justify-center p-6 homepage">
            <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPIForm`} className="absolute top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                ⬅️ Back
            </Link>

            <div className="bg-[--primary-color] backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-[--complementary-color]">Crear KPI para Tarea con evaluación por Questions</h1>
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
                                <p className='block text-sm font-medium text-[--complementary-color] mb-2'>fecha de inicio:</p>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className='w-[220px]'>
                                <p className='block text-sm font-medium text-[--complementary-color] mb-2'>fecha de fin:</p>
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
                        <h2 className="text-lg font-semibold mb-4 text-[--complementary-color]">Evaluación por preguntas de sí o no</h2>

                        {questions.map((question, index) => (
                            <div key={index} className="mb-4 flex items-center">
                                <input
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                                    placeholder="Ingrese la pregunta"
                                    required
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 mr-4"
                                />
                                <select
                                    value={question.answer}
                                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value === 'true')}
                                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 mr-4"
                                >
                                    <option value={false}>No</option>
                                    <option value={true}>Sí</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="text-red-500 font-bold"
                                >
                                    X
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addQuestion}
                            className="w-full py-2 px-2 bg-green-500 text-white rounded-full  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Añadir Pregunta
                        </button>
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