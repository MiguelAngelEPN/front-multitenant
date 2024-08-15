import MainMenu from '@/components/navMenu/MainMenu';
import Navbar from '@/components/companyNavbar/Navbar';

export default function RootLayout({ children }) {
    return (
        <div className=''>
            <Navbar />
            <div className='flex h-full'>
                {/* Menú lateral */}
                <MainMenu />

                {/* Contenido principal */}
                <div className="flex-1 h-full bg-[#E7E5EE]">
                    {children}
                </div>
            </div>
        </div>
    );
}
