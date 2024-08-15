"use client"
import { useState } from 'react';
import Link from 'next/link';
import './style.css'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex mainmenu">
      <div
        className={`${isOpen ? 'w-64' : 'w-20'
          } bg-gray-800 text-white flex flex-col justify-between transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* Aquí puedes poner el nombre de la empresa o logo */}
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-[var(--complementary-color)] focus:outline-none"
          >
            {/* Aquí puedes poner un símbolo o cualquier representación visual */}
            {isOpen ? '✖️' : '☰'}
          </button>
        </div>

        <nav className="flex-1">
          <ul className='space-y-2 px-2'>
            <li>
              <Link
                href="/companies/employee-list"
                className="flex items-center h-[35px] pl-4 rounded-full hover:bg-[var(--background-secundary-button)] focus:bg-[var(--background-secundary-button)] transition-colors duration-300"
              >
                <span className="mr-3">{/* Símbolo en lugar de un icono */}🏠</span>
                <span className={`${isOpen ? 'block' : 'hidden'} text-base font-medium`}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/companies/employee-list"
                className="flex items-center h-[35px] pl-4 rounded-full hover:bg-[var(--background-secundary-button)] focus:bg-[var(--background-secundary-button)] transition-colors duration-300"
              >
                <span className="mr-3">{/* Símbolo en lugar de un icono */}👤</span>
                <span className={`${isOpen ? 'block' : 'hidden'} text-base font-medium`}>
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/companies/employee-list"
                className="flex items-center h-[35px] pl-4 rounded-full hover:bg-[var(--background-secundary-button)] focus:bg-[var(--background-secundary-button)] transition-colors duration-300"
              >
                <span className="mr-3">{/* Símbolo en lugar de un icono */}⚙️</span>
                <span className={`${isOpen ? 'block' : 'hidden'} text-base font-medium`}>
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
