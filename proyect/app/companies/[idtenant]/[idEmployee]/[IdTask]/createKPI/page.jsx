"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function CreateKpi() {
  const router = useRouter();
  let params = useParams();
  console.log('params: ', params)
  console.log('params.idTask: ', params.IdTask)
  console.log('params.idEmployee: ', params.idEmployee)

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [timeUnit, setTimeUnit] = useState('');
  const [formula, setFormula] = useState('');
  const [fieldFilter, setFieldFilter] = useState([""]);
  const [selectedField, setSelectedField] = useState("");
  const [fieldtobeevaluated, setFieldToBeEvaluated] = useState('');
  const [additionalFields, setAdditionalFields] = useState([
    { type: 'string', name: '', value: '' }
  ]);

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { type: 'string', name: '', value: '' }]);
  };

  const handleRemoveField = (index) => {
    setAdditionalFields(additionalFields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = additionalFields.slice();
    newFields[index][field] = value;
    setAdditionalFields(newFields);
  };

  const getFields = async () => {
    console.log("entro a getFields")
    try {
      //Obtener tareas de empleados con x-tenant-id
      const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/tasklog-keys`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-tenant-id": params.idtenant, //Pasar el id de la empresa como x-tenant-id
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data1 = await response.json();
      //console.log("field result: ", data1)
      setFieldFilter(data1);

    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timeTargetNumber = Number(target);
    const timeUnitTarget = Number(timeUnit);
    // Crear el cuerpo de la solicitud
    const kpiData = {
      title,
      target: timeTargetNumber,
      timeUnit: timeUnitTarget,
      fieldtobeevaluated: selectedField,
      ...additionalFields.reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
      }, {}),
    };
    console.log('datos e enviar: ', kpiData)

    // Enviar los datos al backend
    const response = await fetch(`http://localhost:3000/employees/${params.idEmployee}/tasks/${params.IdTask}/kpis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-tenant-id": params.idtenant, //Pasar el id de la empresa como x-tenant-id
      },
      body: JSON.stringify(kpiData),
    });

    if (response.ok) {
      alert('KPI creado exitosamente');
      // Redirigir o realizar otras acciones
    } else {
      alert('Error al crear el KPI');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-6 homepage">
      <Link href={`/companies/${params.idtenant}/${params.idEmployee}/${params.IdTask}`} className="absolute top-4 left-4 bg-[--secondary-color] bg-opacity-50 hover:bg-[--primary-color] text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
        ⬅️ Back
      </Link>

      <div className="bg-[--primary-color] backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[--complementary-color]">Crear KPI para Tarea</h1>
        <form onSubmit={handleSubmit} className='text-black'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[--complementary-color] mb-2">Título del KPI</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className='flex space-x-5'>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[--complementary-color] mb-2">Objetivo (Target)</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[--complementary-color] mb-2">Unidad de tiempo (en días)</label>
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                required
                className="w-full h-[42px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Selecciona una opción</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className='mb-4'>
            <p className='block text-sm font-medium text-[--complementary-color] mb-2'>Campo a evaluar:</p>
            <div className='flex justify-between items-center'>
              <select
                className="text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                value={selectedField}
                onChange={handleSelectChange}
              >
                <option value="">Select a field</option>
                {fieldFilter.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              <button className='text-white bg-[var(--background-primary-button)] hover:bg-[var(--background-secundary-button)] font-semibold py-2 px-4 rounded-full shadow-md transition-all' onClick={getFields}>
                Obtener campos
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[--complementary-color] mb-2">Formula</label>
            <select
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              required
              className="w-full h-[42px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona una opción</option>
              <option value="count">count</option>
              <option value="count_distinct">count_distinct</option>
              <option value="sum()">sum()</option>
              <option value="avg()">avg()</option>
            </select>
          </div>


          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-[--complementary-color]">Campos Adicionales</h2>
            {additionalFields.map((field, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="mb-2 flex flex-col items-center space-y-4">
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type={field.type === 'number' ? 'number' : 'text'}
                    placeholder="Valor"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none bg-red-200 h-[30px] w-[30px] rounded flex items-center justify-center hover:bg-red-400"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right">
              <button
                type="button"
                onClick={handleAddField}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-full hover:bg-green-600 border-2 w-36"
              >
                Añadir Campo
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 border-2"
          >
            Crear KPI
          </button>
        </form>
      </div>
    </div>
  );
}
