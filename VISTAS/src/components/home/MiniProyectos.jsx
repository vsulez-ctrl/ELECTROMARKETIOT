import Card from "../layout/Card";

const MiniProyectos = () => {
const proyectos = [
    {
      title: "Sistema de riego automático",
      description: "Automatiza el cuidado de tus plantas controlando la humedad del suelo con un sensor y un ESP32. ",
      image: "https://preview.redd.it/sistema-di-irrigazione-automatico-con-arduino-v0-vk9c9fqjlzlf1.png?width=1080&crop=smart&auto=webp&s=c2355c3c3db4f50a03cf0bc8d5ee58622d8b96eb",
    },
    {
      title: "Carrito inteligente con cámara",
      description: "Construye un robot móvil con ESP32 y cámara integrada puedes controlar el movimiento de forma remota.  ",
      image: "https://www.didacticaselectronicas.com/web/image/product.product/39725/image_1024/%5BZYC0076%5D%20Kit%20Smart%20robot%20car.%20ESP32%20con%20c%C3%A1mara?unique=8fcaf2f",
    },
    {
      title: "Mini estación de monitoreo ambiental",
      description: "Diseña una estación que mide temperatura y humedad en tiempo real. ",
      image: "https://how2electronics.com/wp-content/uploads/2018/12/Interfacing-DHT11-Humidity-Temperature-Sensor-with-Arduino-LCD-1000x561.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Texto introductorio */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Proyectos de inspiración
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Inspírate con ideas de proyectos IoT que puedes crear usando sensores,
          microcontroladores y actuadores. ¡La tecnología está en tus manos!
        </p>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15">
          {proyectos.map((proyecto, index) => (
            <Card
              key={index}
              title={proyecto.title}
              description={proyecto.description}
              image={proyecto.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiniProyectos;
