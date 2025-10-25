import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold text-white">ElectroMarket</h2>
          <p className="mt-4 text-sm">
            Tu tienda de tecnología para proyectos IoT. Encuentra microcontroladores, sensores y actuadores con soporte técnico y envíos rápidos.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/productos" className="hover:text-blue-400">Productos</a></li>
            <li><a href="/proyectos" className="hover:text-blue-400">Proyectos</a></li>
            <li><a href="/contacto" className="hover:text-blue-400">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contáctanos</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +57 300 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> contacto@electromarket.com
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-white font-semibold mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-blue-400"><Instagram /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ElectroMarket. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
