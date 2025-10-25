
import Footer from "../components/layout/Footer";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <>
     
      
      {/* Hero Section */}
      <section className="relative w-full h-80 flex items-center justify-center text-center bg-gradient-to-r from-purple-600 to-pink-700">
        <div className="relative z-10 text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl mb-6 drop-shadow-lg">
            Conoce la historia detrás de ElectroMarket
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                ElectroMarket nació en 2020 con una visión clara: democratizar el acceso 
                a la tecnología IoT y electrónica para creadores, estudiantes y profesionales 
                en Colombia.
              </p>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                Lo que comenzó como un pequeño emprendimiento entre ingenieros apasionados 
                por la electrónica, hoy se ha convertido en la tienda de referencia para 
                proyectos de innovación tecnológica.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Creemos que cada gran invento comienza con un componente simple, y estamos 
                aquí para proporcionarte las herramientas que necesitas para hacer realidad 
                tus ideas más ambiciosas.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">1,000+</h3>
                  <p className="text-gray-600 text-sm">Clientes Satisfechos</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">2 Años</h3>
                  <p className="text-gray-600 text-sm">de Experiencia</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">100+</h3>
                  <p className="text-gray-600 text-sm">Productos</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">96%</h3>
                  <p className="text-gray-600 text-sm">Satisfacción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Misión */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Proveer componentes electrónicos de alta calidad y soporte técnico especializado 
                para empoderar a creadores, innovadores y educadores en el desarrollo de proyectos 
                tecnológicos que transformen nuestra sociedad.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser el ecosistema líder en Latinoamérica para el desarrollo de tecnología IoT, 
                reconocidos por nuestra innovación, calidad y compromiso con el crecimiento 
                de la comunidad maker y tecnológica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pasión</h3>
              <p className="text-gray-600">
                Amamos la tecnología y nos apasiona ver lo que nuestros clientes crean con nuestros productos.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Creemos en el poder de la colaboración y el crecimiento colectivo.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Calidad</h3>
              <p className="text-gray-600">
                Solo ofrecemos productos que cumplen con los más altos estándares de calidad.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovación</h3>
              <p className="text-gray-600">
                Constantemente buscamos nuevas formas de servir mejor a nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo (sección opcional) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestro Equipo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center bg-white rounded-xl shadow-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                AM
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Valentina Sulez</h3>
              <p className="text-blue-600 font-semibold mb-3">CEO & Fundadora</p>
              <p className="text-gray-600 text-sm">
                Ingeniera electrónica con 10+ años de experiencia en desarrollo de productos IoT.
              </p>
            </div>

            <div className="text-center bg-white rounded-xl shadow-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                CR
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Victor Gonsalez</h3>
              <p className="text-blue-600 font-semibold mb-3">CTO</p>
              <p className="text-gray-600 text-sm">
                Especialista en embedded systems y arquitectura de soluciones IoT escalables.
              </p>
            </div>

            <div className="text-center bg-white rounded-xl shadow-lg p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                LG
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Estefania Gironza</h3>
              <p className="text-blue-600 font-semibold mb-3">Directora de Soporte</p>
              <p className="text-gray-600 text-sm">
                Apasionada por ayudar a los clientes a hacer realidad sus proyectos tecnológicos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default About;