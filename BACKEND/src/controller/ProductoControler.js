class ProductoController {
  constructor(productoService) {
    this.productoService = productoService;
  }

  /**
   * Obtener todos los productos
   */
  obtenerTodos(req, res) {
    try {
      const productos = this.productoService.obtenerTodos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener producto por ID
   */
  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await this.productoService.obtenerPorId(parseInt(id));

      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(producto);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Buscar productos con texto o filtros
   */
  async buscarProductos(req, res) {
    try {
      const { texto, categoria,subcategoria, precioMin, precioMax, marcas, soloDisponibles } =
        req.query;

      let productos = [];
      console.log(precioMin, precioMax);

     
        // búsqueda con filtros
        productos = await this.productoService.buscarConFiltros({
          texto,
          categoria,
          subcategoria,
          precioMin: precioMin ? parseFloat(precioMin) : undefined,
          precioMax: precioMax ? parseFloat(precioMax) : undefined,
          marcas: marcas ? marcas.split(",") : [],
          soloDisponibles: soloDisponibles === "true",
        });
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtener productos por categoría
   */

  /**
   * Obtener filtros disponibles
   */
 async obtenerFiltrosDisponibles(req, res) {
  try {
    const { categoria } = req.params;
    const filtros = await this.productoService.obtenerFiltrosDisponibles(categoria);
    res.json(filtros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}

module.exports = ProductoController;
