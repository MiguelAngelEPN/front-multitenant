"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
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
          <ul>
            <li>
              <Link
                href="/companies"
                className="flex items-center p-4 hover:bg-[var(--background-secundary-button)] focus:bg-[var(--background-secundary-button)] transition-colors duration-300"
              >
                <span className="mr-3">{/* Símbolo en lugar de un icono */}🏠</span>
                <span className={`${isOpen ? 'block' : 'hidden'} text-base font-medium`}>
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/companies"
                className="flex items-center p-4 hover:bg-[var(--background-secundary-button)] focus:bg-[var(--background-secundary-button)] transition-colors duration-300"
              >
                <span className="mr-3">{/* Símbolo en lugar de un icono */}👤</span>
                <span className={`${isOpen ? 'block' : 'hidden'} text-base font-medium`}>
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/companies"
                className="flex items-center p-4 hover:bg-[var(--background-secundary-button)] focus:bg-[var(--background-secundary-button)] transition-colors duration-300"
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
