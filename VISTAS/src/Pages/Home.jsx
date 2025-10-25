import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import MiniProyectos from "../components/home/MiniProyectos";
import Beneficios from "../components/home/Beneficios";
import Footer from "../components/layout/Footer";
import ProductosDestacados from "../components/home/ProductosDestacados";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Verificar si hay usuario logeado
    const user = localStorage.getItem("user");
  
    
    if (user) {
      console.log("✅ Usuario autenticado:", JSON.parse(user));
    } else {
      console.log("❌ No hay usuario autenticado");
    }
  }, []);

  const getUserInfo = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  };

  const user = getUserInfo();

  return (
    <>
   
      
      {/* Mensaje de bienvenida si está logueado */}
      {user && (
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-4 text-center shadow-lg">
          <p className="text-lg font-bold">
            ¡Bienvenido de nuevo, <strong>{user.nombre}</strong>! 
          </p>
          <p className="text-sm mt-1 opacity-90">
            Email: {user.email} | Disfruta de tu experiencia en ElectroMarket
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

export default Home;