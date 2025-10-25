import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import PlantillaProductos from "./Pages/PlantillaProductos";
import ProductoDetalle from "./Pages/ProductoDetalle";
import MetodoPago from "./Pages/MetodoPago";
import Navbar from "./components/layout/Navbar";
import { useCart } from "./context/CartContext";
import Aviso from "./components/Aviso/Aviso";
import OlvidePassword from "./Pages/OlvidePassword";
import RestablecerPassword from "./Pages/RestablecerPassword";
import HomeAutenticado from "./Pages/HomeAutenticado";
import Contacto from "./Pages/Contacto";
import About from "./Pages/About";

function App() {
 
  const location = useLocation();
  const {limiteAlcanzado, setlimiteAlcanzado} = useCart();

  // Ocultar el navbar en la ruta /metodo-pago
  const hideNavbar = location.pathname === "/metodo-pago";

  return (
    <>
   
           {limiteAlcanzado && (
        <Aviso mostrar={limiteAlcanzado} onClose={() => setlimiteAlcanzado(false)} />
      )}
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/olvide-password" element={<OlvidePassword />} />
        <Route path="/" element={<HomeAutenticado />} />
        <Route path="/restablecer-password" element={<RestablecerPassword />} />
        <Route path="/productos" element={<PlantillaProductos />} />
        <Route path="/productos/:categoria/:id" element={<ProductoDetalle />} />
        <Route path="/metodo-pago" element={<MetodoPago />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

 
    </>
  );
}

export default App;
