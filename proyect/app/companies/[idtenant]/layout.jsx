"use client"
import MainMenu from '@/components/navMenu/MainMenu';
import Navbar from '@/components/companyNavbar/Navbar';
import { useParams } from 'next/navigation';

export default function RootLayout({ children }) {
    let params = useParams();
    console.log('params: ', params.idtenant)
    return (
        <div className=''>
            <Navbar idtenant={params.idtenant} />
            <div className='flex h-full'>
                {/* Menú lateral */}
                <MainMenu idtenant={params.idtenant} />

                {/* Contenido principal */}
                <div className="flex-1 h-full bg-[#E7E5EE]">
                    {children}
                </div>
            </div>
        </div>
    );
}
