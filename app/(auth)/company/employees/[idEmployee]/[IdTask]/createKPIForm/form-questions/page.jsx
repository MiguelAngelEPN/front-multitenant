"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CreateKpibyQuestions() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;

    const [tenantId, setTenantId] = useState('');

    useEffect(() => {
      // Obtener el token del localStorage
      const token = localStorage.getItem("authToken");
  
      if (token) {
        const userData = JSON.parse(token);
        setTenantId(userData.tenantId);
        getFields(userData.tenantId);
      }
    }, []);

    const router = useRouter();
    let params = useParams();
    console.log('params: ', params)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [timeUnit, setTimeUnit] = useState('');
    const [fieldFilter, setFieldFilter] = useState(["title", "priority", "startDate", "endDate", "concurrence", "state"]);

    const [selectedField, setSelectedField] = useState("");

    const [title, setTitle] = useState('');
    const [target, setTarget] = useState('');
    const [questions, setQuestions] = useState([{ text: '', answer: 0 }]); // Cambiado a 0 para false

    const addQuestion = () => {
        setQuestions([...questions, { text: '', answer: 0 }]); // Nuevo campo con valor 0 (false)
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

    const handleSelectChange = (event) => {
        setSelectedField(event.target.value);
    };
    const getFields = async (tenantId) => {
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

            const data1 = await response.json();
            console.log("field result: ", data1)
            setFieldFilter(prevFieldFilter => [...prevFieldFilter, ...data1]);

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
            evaluationType: 'yes-no-questions',
            questions: questions.map(q => ({ text: q.text, answer: q.answer })),

        };
        console.log('datos a enviar: ', kpiData)

        // Enviar los datos al backend
        /**/
        const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-tenant-id": tenantId, // Pasar el id de la empresa como x-tenant-id
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
        <>
            <div className="rounded-3xl min-h-screen flex flex-col items-center justify-center p-6 homepage">

                <div className='flex justify-end w-full'>
                    <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}/createKPIForm`} className="top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                        ⬅️ Back
                    </Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border-2 border-[--primary-color]">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-[--primary-color]">Create KPI for Task with evaluation by Questions</h1>
                    <form onSubmit={handleSubmit} className='text-black'>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[--secondary-color] mb-2">KPI Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className='flex space-x-5'>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-[--secondary-color] mb-2">Target</label>
                                <input
                                    type="number"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-[--secondary-color] mb-2">Time Unit (in days)</label>
                                <select
                                    value={timeUnit}
                                    onChange={(e) => setTimeUnit(e.target.value)}
                                    required
                                    className="w-full h-[42px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select a option</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='block text-m font-medium text-[--secondary-color] mb-2'>Field to be evaluated:</p>
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
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className='block text-m font-medium text-[--secondary-color] mb-2'>Date range:</p>
                            <div className='w-full flex justify-between'>
                                <div className='w-[220px]'>
                                    <p className='block text-sm font-medium text-[--secondary-color] mb-2'>Start Date:</p>
                                    <input
                                        type="datetime-local"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className='w-[220px]'>
                                    <p className='block text-sm font-medium text-[--secondary-color] mb-2'>End Date:</p>
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
                            <h2 className="text-lg font-semibold mb-4 text-[--secondary-color]">Evaluation by yes/no questions</h2>

                            {questions.map((question, index) => (
                                <div key={index} className="mb-4 flex items-center">
                                    <input
                                        type="text"
                                        value={question.text}
                                        onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                                        placeholder="Enter a question"
                                        required
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 mr-4"
                                    />
                                    <select
                                        value={question.answer}
                                        onChange={(e) => handleQuestionChange(index, 'answer', e.target.value === '1' ? 1 : 0)}
                                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 mr-4"
                                    >
                                        <option value={0}>No</option>
                                        <option value={1}>Yes</option>
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

                            <div className='flex justify-end'>
                                <button
                                    type="button"
                                    onClick={addQuestion}
                                    className="w-[40%] py-2 px-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Add Question
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-2 text-sm font-semibold text-white bg-[--primary-color] rounded-full hover:bg-fuchsia-800 border-2"
                        >
                            Create KPI
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
}