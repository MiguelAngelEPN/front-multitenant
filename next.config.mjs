/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone', // Configuración para despliegues optimizados
    basePath: '', // Asegúrate de que esté vacío si estás sirviendo desde la raíz
    reactStrictMode: true,
};

export default nextConfig;
