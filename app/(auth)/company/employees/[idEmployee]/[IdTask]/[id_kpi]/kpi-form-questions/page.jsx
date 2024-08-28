"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function KpiFormQuestions() {
    const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;
    const [tenantId, setTenantId] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Obtener el token del localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
            const userData = JSON.parse(token);
            setTenantId(userData.tenantId);
            getKPIbyID(userData.tenantId)
        }else{
            router.push(`/login`);
        }
    }, []);

    let params = useParams();
    const [kpiInformation, setKpiInformation] = useState(null);

    const getKPIbyID = async (tenantId) => {
        console.log("entro a getKPIEcaluation")
        try {
            const response = await fetch(`${backdorection}/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis/${params.id_kpi}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-tenant-id": tenantId,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data1 = await response.json();
            console.log("KpiInformation: ", data1);
            console.log("title: ", data1.title);
            setKpiInformation(data1);

        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };
    const handleAnswerChange = (index, newValue) => {
        const updatedQuestions = [...kpiInformation.questions];
        updatedQuestions[index].answer = parseInt(newValue, 10);
        setKpiInformation({ ...kpiInformation, questions: updatedQuestions });
    };
    const calculateTotal = () => {
        return kpiInformation.questions.reduce((total, question) => total + question.answer, 0);
    };
    return (
        <div className="rounded-3xl homepage flex items-center justify-center min-h-screen p-4 flex-col">

            <div className='flex justify-end w-full'>
                <Link href={`/company/employees/${params.idEmployee}/${params.IdTask}`} className="top-4 left-4 bg-[--secondary-color] hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                    ⬅️ Back
                </Link>
            </div><br />

            <div className='flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5'>

                <div className='custom-shadow border-2 border-[var(--secondary-color)] w-[700px] bg-[#EEEBF9] p-8 rounded-lg flex flex-col justify-center'>
                    <p className='text-center text-2xl font-bold text-[--primary-color]'>Evaluation "Yes/no Questions"</p><br />

                    {kpiInformation && (
                        <div className="text-[var(--tertiary-color)]">

                            <div className="flex">
                                <p className='text-lg text-[var(--secondary-color)] mr-2'>Title:</p>
                                <p className='text-lg text-black'>{kpiInformation.title}</p>
                            </div>
                            <div className="flex">
                                <p className='text-lg text-[var(--secondary-color)] mr-2'>Start Date:</p>
                                <p className='text-lg text-black'>{new Date(kpiInformation.startDate).toLocaleString()}</p>
                            </div>
                            <div className="flex">
                                <p className='text-lg text-[var(--secondary-color)] mr-2'>End Date:</p>
                                <p className='text-lg text-black'>{new Date(kpiInformation.endDate).toLocaleString()}</p>
                            </div>
                            <div className="flex">
                                <p className='text-lg text-[var(--secondary-color)] mr-2'>Evaluation Type:</p>
                                <p className='text-lg text-black'>{kpiInformation.evaluationType}</p>
                            </div>

                            <br />
                            <p className="text-center text-[24px] font-bold text-[var(--primary-color)]">Questions:</p>

                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b-2 border-gray-300">Question</th>
                                        <th className="py-2 px-4 border-b-2 border-gray-300">Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kpiInformation.questions.map((question, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b border-gray-300 text-[12px]">{question.text}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 text-[12px] text-center">
                                                <select
                                                    value={question.answer}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                    className="border border-gray-300 rounded p-1"
                                                >
                                                    <option value={0}>No</option>
                                                    <option value={1}>Yes</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="py-2 px-4 border-t-2 border-gray-300 font-bold text-center">Total:</td>
                                        <td className="py-2 px-4 border-t-2 border-gray-300 font-bold text-center">{calculateTotal()} / {kpiInformation.questions.length}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-t-2 border-gray-300 font-bold text-center">Your evaluation is:</td>
                                        <td className="py-2 px-4 border-t-2 border-gray-300 font-bold text-center">{(calculateTotal() / kpiInformation.questions.length) * 100} %</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}<br />

                    <div className='flex justify-center items-center'>
                        <button className='text-white bg-[var(--background-primary-button)] hover:bg-[var(--background-secundary-button)] font-semibold py-2 px-4 rounded-full shadow-md transition-all'
                            onClick={getKPIbyID}>
                            Save Evaluation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
