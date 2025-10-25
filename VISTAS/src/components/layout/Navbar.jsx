import Logo from "./logo";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIconos";
import BurgerMenu from "./BurgerMenu";
import logo from '../../assets/imagenes/ui/logo.png';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <nav className="bg-white shadow-sm">
        <div className="flex z-50 py-4 items-center h-12 md:h-14 lg:h-[84px] sticky top-0 bg-white">
          <Logo src={logo} height={100} />
          <div className="flex-1 flex justify-end pr-4">
            <div className="animate-pulse bg-gray-300 h-6 w-20 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="flex z-50 py-4 items-center h-12 md:h-14 lg:h-[84px] sticky top-0 bg-white">
        <Logo src={logo} height={100} />
        <NavLinks />
        <NavIcons user={user} />
        <BurgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;