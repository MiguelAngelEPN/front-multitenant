"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/companyNavbar/Navbar';

export default function CreateKpiForm() {
    const router = useRouter();
    let params = useParams();
    console.log('params: ', params)
    console.log('params.idTask: ', params.IdTask)
    console.log('params.idEmployee: ', params.idEmployee)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    return (
        <>
            <Navbar />
            <div className="homepage h-[640px] flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                <div className='flex justify-end w-full'>
                    <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className=" top-4 left-4 bg-[--secondary-color] bg-opacity-50 hover:[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                        ⬅️ Back
                    </Link>
                </div><br />

                <div className="card-type">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-[--complementary-color]">Elige el tipo de pregunta</h1>
                    <div className='w-full flex space-x-3'>
                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPIForm/form-dropdown`}
                            className="w-full py-3 px-4 border-2 bg-[--complentary-color] text-white rounded hover:bg-[--complementary-color] hover:text-black text-center"
                        >
                            Generación dropdown de criterios de evaluación
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`}
                            className="w-full py-3 px-4 border-2 bg-[--complentary-color] text-white rounded hover:bg-[--complementary-color] hover:text-black text-center"
                        >
                            Métricas y unidad de tiempo
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPIForm/form-questions`}
                            className="w-full py-3 px-4 border-2 bg-[--complentary-color] text-white rounded hover:bg-[--complementary-color] hover:text-black text-center"
                        >
                            Preguntas de Si/No
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}