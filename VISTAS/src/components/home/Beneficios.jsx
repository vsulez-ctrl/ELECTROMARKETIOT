import { Package, Truck, LifeBuoy, BadgeDollarSign, Lightbulb } from "lucide-react";

const Beneficios = () => {
  const beneficios = [
    {
      title: "Variedad de productos",
      description: "Sensores, microcontroladores y actuadores para todos tus proyectos.",
      icon: <Package className="h-12 w-12 stroke-[1.2]" />,
    },
    {
      title: "Envíos rápidos",
      description: "Recibe tus pedidos sin largas esperas.",
      icon: <Truck className="h-12 w-12 stroke-[1.2]" />,
    },
    {
      title: "Soporte técnico",
      description: "Asesoría y guías para tus proyectos.",
      icon: <LifeBuoy className="h-12 w-12 stroke-[1.2]" />,
    },
    {
      title: "Precios accesibles",
      description: "Componentes de calidad con precios competitivos.",
      icon: <BadgeDollarSign className="h-12 w-12 stroke-[1.2]" />,
    },
    {
      title: "Inspiración constante",
      description: "Mini proyectos y tutoriales para motivarte a crear más.",
      icon: <Lightbulb className="h-12 w-12 stroke-[1.2]" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-800 text-center flex">
    

        {beneficios.map((b, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-white mb-4">{b.icon}</div>
            <h3 className="font-semibold text-lg text-white">{b.title}</h3>
            <p className="text-gray-300 text-sm mt-2">{b.description}</p>
          </div>
        ))}
     
    </section>
  );
};

export default Beneficios;
