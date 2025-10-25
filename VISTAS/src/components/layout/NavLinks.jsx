import NavLink from "./NavLink";
import DropdownMenu from "./DropdownMenu";

const NavLinks = () => {
  const links = [
  { label: "HOME", path: "/" },
  { label: "PRODUCTOS", isDropdown: true }, // Aquí
  { label: "CONTACTO", path: "/contacto" },
  { label: "SOBRE NOSOTROS", path: "/about" },
];

return (
  <div className="flex-1 hidden  xl:flex pl-50 h-full gap-30 items-center " >
    {links.map(link =>
      link.isDropdown ? (
        <DropdownMenu key={link.label} label={link.label} />
      ) : (
        <NavLink key={link.path} {...link} />
      )
    )}
    
  </div>
);

};

export default NavLinks;
