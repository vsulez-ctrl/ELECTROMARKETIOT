import { Link } from "react-router-dom";

const CardProducto = ({ producto, nf }) => (
  <article className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-3 flex flex-col gap-3 relative">
    {producto.stock <= 0 && (
      <span className="absolute top-2 left-2 text-[11px] bg-red-700 text-white px-2 py-1 rounded-md">
        Agotado
      </span>
    )}
    <div className="h-48 bg-[#1d1f22] rounded-lg flex items-center justify-center overflow-hidden">
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="max-h-full max-w-full object-contain"
        onError={(e) => (e.currentTarget.style.opacity = 0.2)}
      />
    </div>
    <div className="space-y-1 text-center">
      <h3 className="font-semibold leading-snug" title={producto.nombre}>{producto.nombre}</h3>
      <div className="text-xs opacity-80">{producto.nombre_marca}</div>
      <div className="text-[0.9rem]">{producto.descripcion}</div>
      <div className="font-extrabold">${nf.format(producto.precio)}</div>
    </div>
    <Link to={`/productos/${producto.nombre_categoria.toLowerCase()}/${producto.id}`} className="mt-auto bg-blue-600 hover:bg-blue-500 transition text-white text-center font-semibold rounded-lg py-2">
      Ver detalle
    </Link>
  </article>
);

export default CardProducto;
