import { useState } from "react";
import DropdownMenu from "./DropdownMenu"; 
import NavLink from "./NavLink";



const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
    const links = [
  { label: "HOME", path: "/" },
  { label: "PRODUCTOS", isDropdown: true }, // Aquí
  { label: "CONTACTO", path: "/contacto" },
  { label: "SOBRE NOSOTROS", path: "/about" },
];

  return (
    <div className="xl:hidden h-10 w-20 flex items-center justify-center">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
        className="flex flex-col justify-between w-3 h-4 focus:outline-none items-center"
      >

        {isOpen ? (
         <svg role="button" tabindex="-1" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.324 9.526l7.541-7.54.662-.662L18.204 0l-.663.662-7.54 7.54L2.458.662 1.797 0 .473 1.324l.662.662 7.541 7.54-8.014 8.015-.662.662 1.325 1.323.662-.661L10 10.85l8.013 8.015.662.661L20 18.203l-.662-.662z" fill-rule="evenodd" fill="white"></path></svg>
        ) : (
          <>
            <svg class="fill-current text-white" width="20" height="20" viewBox="0 0 20 7" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="1.33333"></rect><rect y="5.33203" width="20" height="1.33333"></rect><rect y="10.3" width="20" height="1.33333"></rect></svg>
          </>
        )}
      </button>

      {/* Menú lateral */}
      {isOpen && (
        <div className="fixed top-20 right-0 w-64 h-full bg-[#111827] shadow-lg z-50 p-6 flex flex-col gap-6">
           
         {links.map(link =>
      link.isDropdown ? (
        <DropdownMenu key={link.label} label={link.label} />
      ) : (
        <NavLink key={link.path} {...link} />
      )
    )}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
