import Link from 'next/link';
import Image from 'next/image';
import "./styles.css"
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
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

                <div className="wrapper space-x-3">
                    <a href="https://www.facebook.com/construex" target="_blank" rel="noopener noreferrer" className="icon-link">
                        <div className="icon facebook">
                            <span className="tooltip">Facebook</span>
                            <svg
                                viewBox="0 0 320 512"
                                height="1.2em"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                ></path>
                            </svg>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/company/construex/" target="_blank" rel="noopener noreferrer" className="icon-link">
                        <div className="icon twitter">
                            <span className="tooltip">Linkedin</span>
                            <svg
                                height="1.8em"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="twitter"
                            >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.428c-.966 0-1.5-.689-1.5-1.546 0-.872.548-1.546 1.542-1.546.994 0 1.5.674 1.512 1.546 0 .857-.518 1.546-1.554 1.546zm12.5 11.428h-3v-4.955c0-1.184-.427-1.993-1.491-1.993-.811 0-1.293.543-1.505 1.067-.077.187-.096.448-.096.709v5.172h-3s.039-8.389 0-10h3v1.422c.398-.615 1.104-1.489 2.69-1.489 1.963 0 3.402 1.279 3.402 4.038v6.029z"></path>

                            </svg>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/construex/" target="_blank" rel="noopener noreferrer" className="icon-link">
                        <div className="icon instagram">
                            <span className="tooltip">Instagram</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.2em"
                                fill="currentColor"
                                className="bi bi-instagram"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                ></path>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}