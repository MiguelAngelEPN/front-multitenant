import MainMenu from '@/components/navMenu/MainMenu';

export default function RootLayout({ children }) {
    return (
        <div className='flex min-h-screen'>
            {/* Menú lateral */}
            <MainMenu />

            {/* Contenido principal */}
            <div className="flex-1 bg-gray-100">
                {children}
            </div>
        </div>
    );
}
