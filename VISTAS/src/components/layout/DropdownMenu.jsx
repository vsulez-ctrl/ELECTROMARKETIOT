import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const DropdownMenu = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      title: "MICROCONTROLADORES",
      items: ["ESP32", "Arduino", "Raspberry Pi"],
    },
    {
      title: "ACTUADORES",
      items: ["Electromecánicos", "Motores", "Pantallas"],
    },
    {
      title: "SENSORES",
      items: ["Ambientales", "Movimiento", "Proximidad"],
    },
  ];

  return (
    <div className="relative ">
      {/* Botón */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-900 font-semibold hover:text-blue-400"
      >
        {label}
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
        )}
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute left-0  mt-8 bg-white text-gray-900 shadow-lg rounded-md flex p-0 flex-col gap-16 z-50 xl:flex-row xl:p-10">
          {categories.map((category) => (
            <div key={category.title} className="min-w-[150px]">
              <Link className="text-blue-400 font-semibold mb-2 uppercase"                 to={`/productos?categoria=${category.title.toLowerCase()}`}
>
              {category.title}
               
              </Link>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/productos?categoria=${category.title.toLowerCase()}&subcategoria=${item.toLowerCase()}`}

                      className="hover:text-blue-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
