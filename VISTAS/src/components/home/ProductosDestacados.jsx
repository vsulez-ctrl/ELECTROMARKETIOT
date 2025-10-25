import tienda from "../../assets/imagenes/productos/Tienda.jpg";

const ProductosDestacados = () => {
 

  return (
    <section className=" flex  items-center  py-16 bg-gray-50 px-5">
        <div>
            <img src={tienda} alt=""  className=" h-100 w-350 rounded-[10%] xl:h-200  "/>
        </div>
        <div className=" text-center px-4 ">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Tu espacio de tecnología en la ciudad </h1>

            <p  >Acércate a nuestra tienda física y vive la experiencia ElectroMarket: calidad, confianza y todo lo que necesitas para crear proyectos inteligentes.</p>

        </div>
    
    </section>
  );
};

export default ProductosDestacados;
