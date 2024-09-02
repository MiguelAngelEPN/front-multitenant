"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  const backdorection = process.env.NEXT_PUBLIC_DIRECTION_PORT;

  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      const userData = JSON.parse(token);
      setTenantId(userData.tenantId);
      getEmployeeList(userData.tenantId)
    }
  }, []);


  const getEmployeeList = async (tenantId) => {
    try {
      // Obtener usuarios de empresa con x-tenant-id
      const response = await fetch(`${backdorection}/employees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": tenantId, // Pasar el nombre de la empresa como x-tenant-id
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEmployees(data);
      console.log("respuesta:", data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getTableHeaders = () => {
    const allKeys = employees.reduce((keys, employee) => {
      return [...keys, ...Object.keys(employee)];
    }, []);

    // Exclude 'tasks' and 'Actions' since it will be manually added
    return [...new Set(allKeys)].filter((key) => key !== 'tasks' && key !== 'tenantId' && key !== '__v');
  };

  const tableHeaders = getTableHeaders();
  const hasEmployees = employees.length > 0;

  const handleButtonClick = (idEmployee) => {
    router.push(`/company/employees/${idEmployee}`);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("copied text")
  };

  const renderCellContent = (header, value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-green-500 font-bold">&#10003;</span>
      ) : (
        <span className="text-red-500 font-bold">&#10007;</span>
      );
    }

    return typeof value === 'object' ? JSON.stringify(value, null, 2) : value ?? 'N/A';
  };
  //<div className="bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center min-h-screen p-4 flex-col">
  return (<>
    <div className="rounded-3xl homepage flex items-center min-h-screen p-4 flex-col">

      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='flex space-x-3 mb-3'>
          <Link href={`/company/create-employee`}
            className="mt-5 py-2 bg-[--secondary-color] text-white rounded-full font-semibold hover:bg-purple-800 transition-colors w-[220px] text-center"
          >
            Create Employee
          </Link><br />
          <Link href={`/company/create-task-department`}
            className="mt-5 py-2 bg-[--secondary-color] text-white rounded-full font-semibold hover:bg-purple-800 transition-colors w-[220px] text-center"
          >
            Assign Task to Department
          </Link>
        </div>

        {/*---------- tabla dinámica para empleados con campos variables ----------*/}
        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-300 shadow-md rounded-lg overflow-hidden border-2">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header} className="py-3 px-3 uppercase tracking-wider text-[13px] text-center">
                      {header.replace(/_/g, ' ')}
                    </th>
                  ))}
                  {hasEmployees && (
                    <th className="py-3 px-6 uppercase tracking-wider text-[13px] text-center">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="text-black">
                {employees.map((employee, index) => (
                  <tr
                    key={employee._id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    {tableHeaders.map((header) => (
                      <td key={header} className="py-3 px-3 text-[12px] text-center">
                        {header === '_id' ? (
                          <button
                            onClick={() => handleCopyToClipboard(employee[header])}
                            className="text-blue-500 hover:underline"
                            title="Click to copy ID"
                          >
                            {employee[header].length > 8
                              ? `${employee[header].substring(0, 8)}...`
                              : employee[header]}
                          </button>
                        ) : (
                          renderCellContent(header, employee[header])
                        )}
                      </td>
                    ))}

                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleButtonClick(employee._id)}
                        className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 text-[13px]"
                      >
                        Task
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>)
}