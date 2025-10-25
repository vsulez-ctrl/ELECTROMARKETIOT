import CardProducto from "./CardProducto";

const ListaProductos = ({ items, cargando, nf }) => {
  if (cargando)
    return <div className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-4 mb-4">Cargando…</div>;

  if (!cargando && items.length === 0)
    return (
      <div className="bg-[#0f131b] border border-[#1f2937] rounded-xl p-4 mb-4">
        No se encontraron productos con estos criterios.
      </div>
    );

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((p) => (
        <CardProducto key={p.id} producto={p} nf={nf} />
      ))}
    </div>
  );
};

export default ListaProductos;
