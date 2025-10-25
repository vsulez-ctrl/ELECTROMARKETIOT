// src/components/TablaEspecificaciones.jsx

// Componente reusable para mostrar una sección de características
const TablaEspecificaciones = ({ titulo, items }) => {
    // Si no hay ítems en esta sección, no renderizamos nada
    if (!items || items.length === 0) return null;

    return (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg }">
            {/* Título de la sección (ej: Características principales, Otros) */}
            <h3 className="text-xl  font-bold text-black mb-4 border-b pb-2 border-gray-700">{titulo}</h3>
            
            <dl className=" ">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex justify-between  mb-2 rounded-[5px] px-2 py-3 ${index % 2 === 0 ? 'bg-gray-300' : 'bg-white '}`}
                    >
                        {/* Clave de la característica */}
                        <dt className="text-sm font-medium text-gray-500">{item.clave}</dt>
                        {/* Valor de la característica */}
                        <dd className="text-sm font-semibold text-gray-black ml-4">{item.valor}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default TablaEspecificaciones;