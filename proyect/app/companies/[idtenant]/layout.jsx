"use client"
import MainMenu from '@/components/navMenu/MainMenu';
import Navbar from '@/components/companyNavbar/Navbar';
import { useParams } from 'next/navigation';
import { getServerSession } from "next-auth/next";
import authOptions from "@/auth";

export default async function RootLayout({ children }) {
    let params = useParams();
    console.log('params: ', params.idtenant)
    const session = await getServerSession(authOptions);

    if (!session) {
        return <p>Access Denied. Please log in.</p>;
    }
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
