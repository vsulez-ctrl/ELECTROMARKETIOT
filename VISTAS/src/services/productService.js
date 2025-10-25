const API_URL = "http://localhost:3000"; // cambia si usas otro puerto o dominio


const construirQueryString = (filtros) => {
    const params = new URLSearchParams();

    // 1. Categoria (Obligatoria)
    if (filtros.categoria) {
        params.append('categoria', filtros.categoria);
    }

    // 2. Marcas (Si hay más de una, la API debe manejarlas como un array)
    // Usaremos el formato ?marcas=A&marcas=B
    if (filtros.marcas && filtros.marcas.length > 0) {
        const marcasString = filtros.marcas.join(',');
        params.append('marcas', marcasString);
    }
    const subcategoriaValor = filtros.subcategoria ? filtros.subcategoria.trim() : null;
    if (subcategoriaValor) params.append('subcategoria', subcategoriaValor);
    // 3. Rango de Precio
    if (filtros.min) {
        params.append('precioMin', filtros.min);
    }
    if (filtros.max) {
        params.append('precioMax', filtros.max);
    }

    // 4. Búsqueda de texto (q)
    if (filtros.q) {
        params.append('texto', filtros.q);
    }

    // 5. Disponibilidad
    if (filtros.disponible === true) {
        params.append('disponible', 'true');
    }
    
    return params.toString();
};
// 🔹 Obtener productos por categoría
export async function buscarProductos(filtros, categoria) {
  try {
    const todosFiltros ={... filtros, categoria};
    const queryString = construirQueryString(todosFiltros);
    const url = `${API_URL}/productos/buscar?${queryString}`;
    const res = await fetch(url);
    if (!res.ok) console.log(`Error al obtener productos de ${categoria}`);
    const data = await res.json();
    console.log("➡️ Fetching URL:", url);
    console.log("✅ Productos por categoría:", data);
    return data;
  } catch (error) {
    console.error("❌ Error buscando productos por categoría:", error);
    return [];
  }
}


// 🔹 Obtener producto por ID
export async function obtenerProductoPorId(id) {
  try {
    const res = await fetch(`${API_URL}/productos/${id}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Error al obtener producto: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error buscando producto por ID:", error);
    return null;
  }
}

// 🔹 Obtener marcas disponibles desde backend

export  async function obtenerFiltrosDisponibles(categoria){
  try
  {
    console.log("➡️ Obteniendo filtros disponibles para categoría: api", categoria);
    const res = await fetch(`${API_URL}/productos/buscar/filtros/${categoria}`);
    if (!res.ok) throw new Error("Error al obtener filtros disponibles");
    const data = await res.json();
    console.log("✅ Filtros disponibles obtenidos:", data);
    return data;
  }catch(error){
    console.error("❌ Error obteniendo filtros disponibles:", error);
    return {
      marcas: [],
      rangoPrecio: {
        min: "0",
        max: "0"
    }
    };
  } 
} 

