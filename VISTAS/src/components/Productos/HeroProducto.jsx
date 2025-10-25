const HeroProducto = ({ imagen, titulo }) => {
  return (
    <div className="w-full relative">
      <img src={imagen} alt={titulo} className="w-full h-[320px] object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">{titulo}</h1>
      </div>
    </div>
  );
};

export default HeroProducto;
