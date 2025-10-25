import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import MiniProyectos from "../components/home/MiniProyectos";
import Beneficios from "../components/home/Beneficios";
import Footer from "../components/layout/Footer";
import ProductosDestacados from "../components/home/ProductosDestacados";
import { useAuth } from '../context/AuthContext';

const HomeAutenticado = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar/>
      
      {/* Mensaje de bienvenida especial para usuarios autenticados */}
      {user && (
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-4 text-center shadow-lg">
          <p className="text-lg font-bold">
            ¡Bienvenido de nuevo, <strong>{user.nombre}</strong>! 
          </p>
          <p className="text-sm mt-1 opacity-90">
            Ahora puedes disfrutar de todos los beneficios de ElectroMarket
          </p>
        </div>
      )}

      <Hero/>
      <MiniProyectos/>
      <Beneficios/>
      <ProductosDestacados/>
      <Footer/>
    </>
  );
};

export default HomeAutenticado;