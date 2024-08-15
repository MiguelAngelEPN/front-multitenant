"use client"
import { useState } from 'react';
import Link from 'next/link';
import './style.css'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (index) => {
    setSelectedLink(index);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex mainmenu">
      <div
        className={`${isOpen ? 'w-64' : 'w-20'
          } bg-[#E7E5EE] text-black flex flex-col justify-between transition-all duration-300`}
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
            className="text-[var(--secondary-color)] focus:outline-none"
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
                className={`flex items-center h-[35px] pl-4 rounded-full hover:bg-[var(--complementary-color)] transition-colors duration-300 ${selectedLink === 1 ? 'bg-[var(--complementary-color)] border border-[#D7D6DD] shadow-[1px_3px_4px_rgba(0,0,0,0.1)]' : ''}`}
                onClick={() => handleLinkClick(1)}
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
                className={`flex items-center h-[35px] pl-4 rounded-full hover:bg-[var(--complementary-color)] transition-colors duration-300 ${selectedLink === 2 ? 'bg-[var(--complementary-color)] border border-[#D7D6DD] shadow-[1px_3px_4px_rgba(0,0,0,0.1)]' : ''}`}
                onClick={() => handleLinkClick(2)}
              >
                <span className="mr-3">👤</span>
                <span className={`${isOpen ? 'block' : 'hidden'} text-base font-medium`}>
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/companies/employee-list"
                className={`flex items-center h-[35px] pl-4 rounded-full hover:bg-[var(--complementary-color)] transition-colors duration-300 ${selectedLink === 3 ? 'bg-[var(--complementary-color)] border border-[#D7D6DD] shadow-[1px_3px_4px_rgba(0,0,0,0.1)]' : ''}`}
                onClick={() => handleLinkClick(3)}
              >
                <span className="mr-3">⚙️</span>
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
