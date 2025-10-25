import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { obtenerProductoPorId } from "../services/productService";
import TablaEspecificaciones from "../components/Productos/TablaEsoecificaciones";
import { useCart } from "../context/CartContext";
export default function ProductoDetalle() {
  const { addToCart } = useCart();
  const { categoria, id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const aumentar = () => {
    if (producto && cantidad < producto.stock) {
        setCantidad(cantidad + 1);
    }
  };

  useEffect(() => {
    (async () => {
      if(id){

        const data = await obtenerProductoPorId(id);
    
        setProducto(data);
      }
    })();
  }, [id]);

  if (!producto) return <div className="text-white p-10">Cargando producto...</div>;
  const specs = producto?.especificaciones;
  return (
    <div className="min-h-screen text-gray-900 ">

      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0f131b] p-5 rounded-xl flex items-center justify-center">
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="max-h-96 object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{producto.nombre}</h1>
          <p className="text-sm opacity-80 mb-4">{producto.marca}</p>
          <div className="text-2xl font-extrabold mb-6">${producto.precio.toLocaleString("es-CO")}</div>
          <p className="text-sm mb-6 tracking-[2px] leading-6 ">{producto.detalle_extenso}</p>
          <p className="text-shadow-blue-950 font-bold mb-5 font-halis"> Stock disponible: {producto.stock} </p>
      <div className="flex items-center gap-4 mb-6 justify-center">

      <p className=" text-[1.3rem] mr-5 font-chronicle">Cantidad:</p>
      <div className="flex items-center  rounded-md overflow-hidden">
        <button
          onClick={disminuir}
          className="px-3    text-white text-[1.5rem] bg-gray-800 hover:bg-gray-600 font-bold"
        >
          -
        </button>
        <span className="px-4 font-chronicle">{cantidad}</span>
        <button
          onClick={aumentar}
          className="px-3 py-1 bg-gray-800 text-white hover:bg-gray-600 font-bold"
        >
          +
        </button>
      </div>
    </div>
      <div className="flex items-center justify-center font-halis font-extralight">

          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white  rounded-lg px-6 py-3 "
            onClick={() => addToCart(producto, cantidad)}
          >
            Añadir al carrito
          </button>
      </div>
        </div>
      </div>
     <div className="mt-16  px-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Especificaciones Técnicas
            </h1>
            
            {/* Renderizar las secciones si existen en el JSONB */}
            {specs && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Sección 1: Características principales */}
                    <TablaEspecificaciones 
                        titulo="Características Principales" 
                        items={specs.principales} 
                    />

                    {/* Sección 2: Peso y dimensiones / Dimensiones si existe */}
                    <TablaEspecificaciones 
                        titulo="Peso y Dimensiones" 
                        items={specs.dimensiones} 
                    />
                    
                    {/* Sección 3: Otros (Ej: Eléctricas, Memoria) */}
                    <TablaEspecificaciones 
                        titulo="Otros (Datos Eléctricos y Memoria)" 
                        items={specs.otros} 
                    />
                </div>
            )}
            
            {/* Si no hay especificaciones, mostrar un mensaje */}
            {!specs && (
                <p className="text-gray-500">No hay especificaciones detalladas disponibles para este producto.</p>
            )}
        </div>
      <Footer />
    </div>
  );
}
