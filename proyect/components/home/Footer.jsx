import Link from 'next/link';
import Image from 'next/image';
import "./styles.css"
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaWhatsappSquare} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <div className='text-white bg-[#65579d] py-8 flex flex-col w-full text-center lg:flex-row lg:justify-evenly lg:items-start items-center'>
            <div className='justify-center'>
                <Link className='flex justify-center' href="/">
                    <Image src="/assets/backgrounds/icon_64.png" alt="Chasqi Logo" width={150} height={50} className="logoChasqi" priority />
                </Link><br />
                <div className=' text-[16px]'>© Chasqi 2024</div>
            </div><br />
            <div className="text-left flex flex-col lg:items-start items-center">
                <div className='text-[24px]'>Contáctanos Ecuador</div>
                <div className='text-[18px]'>Eduardo Salazar Gomez y Juan</div>
                <div className='text-[18px]'>de Dios Martinez, Edificio Alianza, tercer</div>
                <div className='text-[18px]'>piso.</div><br />
                <div className='flex flex-col text-left'>
                <div className='flex'>
                    <MdEmail size={30} color="white" /><div className=' ml-2 text-[21px]'>info@chasqi.io</div>
                </div>
                <div className='flex'>
                    <FaWhatsappSquare size={30} color="white" /><div className=' ml-2 text-[21px]'>0967752333</div>
                </div>
                </div>
            </div><br />
            <div className='text-left '>
                <div className='text-[24px]'>Nosotros</div><br />
                    {/*<Link href='/home-chasqi/terms-conditions' className=' text-[18px]'>Términos y condiciones</Link>*/}
            </div><br />
            <div className='text-left mr-2'>
                <div className='text-[24px]'>Síguenos en nuestras</div>
                <div className='text-[24px]'>redes sociales</div><br />
                <div className='flex'>
                    <a href='https://www.facebook.com/construex'><FaFacebook size={40} color="white" /></a>
                    <a href='https://www.instagram.com/construex/'><FaInstagramSquare size={40} color="white"  className='mx-12'/></a>
                    <a href='https://www.linkedin.com/company/construex/'><FaLinkedin size={40} color="white" /></a>
                </div>
            </div>
        </div>
    )
}