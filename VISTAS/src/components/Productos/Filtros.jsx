const Filtros = ({ titulo, marcas,rangoPrecioDisponible, filtro, setFiltro, limpiar }) => {
  const nf = new Intl.NumberFormat("es-CO");

  const toggleMarca = (m) =>
    setFiltro((s) => ({
      ...s,
      marcas: s.marcas.includes(m)
        ? s.marcas.filter((x) => x !== m)
        : [...s.marcas, m],
    }));

  return (
    <aside
      className="
        bg-[#0f131b] border border-[#1f2937] rounded-xl p-4 h-max
        sticky top-4
        md:static md:top-0
        md:w-full
      "
    >
      <h3 className="text-xl font-bold mb-4">{titulo}</h3>

      {/* Marcas */}
      <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">
        Marcas
      </h4>
      <div className="space-y-2 mb-4 grid grid-cols-2 md:block">
        {marcas.map((m) => (
          <label key={m} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={filtro.marcas.includes(m)}
              onChange={() => toggleMarca(m)}
            />
            <span>{m}</span>
          </label>
        ))}
      </div>

      {/* Precio */}
      <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">
        Precio
      </h4>
      <div className="space-y-2 mb-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="number"
            min={rangoPrecioDisponible.min}
            value={filtro.min}
            onChange={(e) =>
              setFiltro((s) => ({ ...s, min: Number(e.target.value || 0) }))
            }
            className="w-full bg-[#0b0f17] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none"
          />
          <span className="hidden sm:inline">—</span>
          <input
            type="number"
            min={rangoPrecioDisponible.max || 0}
            value={filtro.max}
            onChange={(e) =>
              setFiltro((s) => ({ ...s, max: Number(e.target.value || 0) }))
            }
            className="w-full bg-[#0b0f17] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none"
          />
        </div>
        <div className="text-xs opacity-75 text-center sm:text-left">
          ${nf.format(rangoPrecioDisponible.min)} — ${nf.format(rangoPrecioDisponible.max)}
        </div>
      </div>

      {/* Disponibilidad */}
      <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">
        Disponibilidad
      </h4>
      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          className="accent-blue-500"
          checked={filtro.disponible}
          onChange={(e) =>
            setFiltro((s) => ({ ...s, disponible: e.target.checked }))
          }
        />
        <span>Solo en stock</span>
      </label>

      {/* Buscador */}
      <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-2">
        Búsqueda
      </h4>
      <input
        placeholder="Buscar modelo…"
        value={filtro.q}
        onChange={(e) =>
          setFiltro((s) => ({ ...s, q: e.target.value }))
        }
        className="w-full bg-[#0b0f17] border border-[#1f2937] rounded-lg px-3 py-2 focus:outline-none mb-3"
      />

      <button
        onClick={limpiar}
        className="
          w-full bg-[#111827] border border-[#29344a]
          rounded-lg py-2 text-sm font-semibold hover:bg-[#172033] transition
        "
      >
        Restablecer
      </button>
    </aside>
  );
};

export default Filtros;
