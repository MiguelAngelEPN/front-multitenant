"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

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
            <div className="rounded-3xl homepage min-h-screen flex flex-col items-center justify-center p-6">
                <div className='flex justify-end w-full'>
                    <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className=" top-4 left-4 bg-[--secondary-color] bg-opacity-50 hover:[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                        ⬅️ Back
                    </Link>
                </div><br />

                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border-2 border-[--primary-color]">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-[--primary-color]">Elige el tipo de pregunta</h1>
                    <div className='w-full flex space-x-3'>
                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPIForm/form-dropdown`}
                            className="w-full py-3 px-4 border-2 border-[--secondary-color] bg-[--complentary-color] text-[--secondary-color] rounded text-center hover:bg-[--secondary-color] hover:text-white hover:border-[--complementary-color]"
                        >
                            Generación dropdown de criterios de evaluación
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPI`}
                            className="w-full py-3 px-4 border-2 border-[--secondary-color] bg-[--complentary-color] text-[--secondary-color] rounded text-center hover:bg-[--secondary-color] hover:text-white hover:border-[--complementary-color]"
                        >
                            Métricas y unidad de tiempo
                        </Link>

                        <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}/createKPIForm/form-questions`}
                            className="w-full py-3 px-4 border-2 border-[--secondary-color] bg-[--complentary-color] text-[--secondary-color] rounded text-center hover:bg-[--secondary-color] hover:text-white hover:border-[--complementary-color]"
                        >
                            Preguntas de Si/No
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}