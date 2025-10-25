const Producto = require("../models/Entidades/Productos");
const pool = require("../config/bd");

class ProductoServicio {
  constructor() {

  }

 

  async obtenerPorId(productId) {
    const query = 'SELECT * FROM productos WHERE id = $1';
    try
    {
      const result = await pool.query(query, [productId]);
      if (result.rows.length > 0) {
        return result.rows[0]; // Producto no encontrado
      }else{
        return []
      }
    
    }
    catch (error) {
      console.error("Error retrieving product by ID:", error);
      throw new Error("Database error while fetching product by ID.");
    }
    

  }

 



async obtenerFiltrosDisponibles(categoria) {
  try{
    const precioResultado = await pool.query(
        "SELECT MIN(precio) AS min, MAX(precio) AS max FROM productos p JOIN marcas m ON p.marca_id = m.id_marca JOIN marca_categoria mc ON m.id_marca = mc.id_marca JOIN categorias c ON mc.id_categoria = c.id_categoria WHERE c.nombre = $1", [categoria]
    );

    
    const marcasResultado = await pool.query(
        "SELECT m.nombre FROM categorias c JOIN marca_categoria mc ON c.id_categoria = mc.id_categoria JOIN marcas m ON mc.id_marca = m.id_marca WHERE c.nombre = $1 ORDER BY m.nombre", [categoria]
    );
    console.log(marcasResultado.rows)
    console.log("✅ Retrieved available filters for category:", categoria);
    console.log({
        marcas: marcasResultado.rows.map(row => row.marca),
        rangoPrecio: {
            min: precioResultado.rows[0].min || 0, // Manejar caso de no resultados
            max: precioResultado.rows[0].max || 0,
        },
        disponibilidad: false
    });
    return {
        marcas: marcasResultado.rows.map(row => row.nombre),
        rangoPrecio: {
            min: precioResultado.rows[0].min || 0, // Manejar caso de no resultados
            max: precioResultado.rows[0].max || 0,
        },
        disponibilidad: false
    };

  }catch(error){
    console.error("Error retrieving available filters for category:", error);
    throw new Error("Database error while fetching available filters for category.");
  }
    
    
}

  async obtenerTodos() {
    const query = 'SELECT * FROM productos WHERE disponible = TRUE ORDER BY nombre';
    try {
      const result = await pool.query(query);
      console.log("✅ Retrieved all products");
      return result.rows;
    } catch(error) {
      console.error("Error retrieving all products:", error);
      throw new Error("Database error while fetching all products.");
    }
  }

  async buscarConFiltros({ texto, categoria, subcategoria, precioMin, precioMax, marcas ,disponibilidad }) {
  try {
    console.log(precioMax, precioMin)
    let sql = `SELECT p.*, m.nombre as nombre_marca, c.nombre as nombre_categoria, s.nombre as nombre_subcategoria FROM productos p JOIN marcas m ON p.marca_id = m.id_marca JOIN subcategorias s ON p.subcategoria_id = s.id_subcategoria JOIN categorias c ON s.categoria_id = c.id_categoria WHERE 1=1`;
    const params = [];

    // 🔹 Búsqueda por texto (nombre, marca o descripción)
    if (texto) {
      params.push(`%${texto}%`);
      sql += ` AND (p.nombre ILIKE $${params.length} OR 
      p.descripcion ILIKE $${params.length})`;
    }

    // 🔹 Filtrar por categoría
    if (categoria) {
      params.push(categoria);
      sql += ` AND c.nombre = $${params.length}`;
    }
    if (subcategoria) {
      params.push(subcategoria);
      sql += ` AND s.nombre = $${params.length}`;
    }

    // 🔹 Filtrar por marcas
    if (marcas && marcas.length > 0) {
      const placeholders = marcas.map((_, i) => `$${params.length + i + 1}`).join(", ");
      sql += ` AND m.nombre IN (${placeholders})`;
      params.push(...marcas);
    }

    // 🔹 Filtrar por rango de precios
    if (precioMin) {
      params.push(parseFloat(precioMin));
      sql += ` AND p.precio >= $${params.length}`;
    }

    if (precioMax) {
      params.push(parseFloat(precioMax));
      sql += ` AND p.precio <= $${params.length}`;
    }

    // 🔹 Filtrar por disponibilidad
    if (disponibilidad === "true" || disponibilidad === true) {
      sql += ` AND p.stock > 0`;
    }

    sql += " ORDER BY nombre ASC";

    console.log("🧩 Query generada:", sql);
    console.log("📦 Parámetros:", params);

    const  result = await pool.query(sql, params);
  
    return result.rows;
  } catch (error) {
    console.error("❌ Error en buscarConFiltros:", error);
    throw error;
  }
}


}

module.exports = ProductoServicio ;
