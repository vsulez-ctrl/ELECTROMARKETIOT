const  Hero = ()=> {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center z-0">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover z-1"
      >
        <source src="https://content.arduino.cc/assets/Teaser_TBD%20Dato%20CMS_Gradient-Loop_Assets_1-1.webm" type="video/webm" />
      </video>

      {/* Capa oscura para mejorar contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-50 "></div>

      {/* Texto encima */}
      <div className="relative z-10 text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tienda de tecnología para proyectos IoT
        </h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-lg">
          Encuentra microcontraladores, sensores y actuadores.
        </p>
       
      </div>
    </section>
  );
}
export default Hero;