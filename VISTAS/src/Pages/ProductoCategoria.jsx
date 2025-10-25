import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Filtros from "../components/Productos/Filtros"; // Importa tu componente de filtros

// Simulación de productos
const productosData = [
  { id: 1, nombre: "Producto A", categoria: "electronica", marca: "Sony", precio: 200, disponible: true },
  { id: 2, nombre: "Producto B", categoria: "electronica", marca: "Samsung", precio: 150, disponible: false },
  { id: 3, nombre: "Producto C", categoria: "ropa", marca: "Nike", precio: 100, disponible: true },
  // ... más productos
];

const ProductoCategoria = ({ url }) => {
  const { categoria } = useParams();

  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({ marcas: [], precio: [0, 1000], disponibilidad: false });

  useEffect(() => {
    // Filtrar por categoría inicialmente
    const filtradosCategoria = productosData.filter(p => p.categoria === categoria);
    setProductos(filtradosCategoria);
  }, [categoria]);

  const handleFilterChange = ({ marcas, precio, disponibilidad }) => {
    setFiltros({ marcas, precio, disponibilidad });
    let filtrados = productosData.filter(p => p.categoria === categoria);

    if (marcas.length > 0) {
      filtrados = filtrados.filter(p => marcas.includes(p.marca));
    }

    filtrados = filtrados.filter(p => p.precio >= precio[0] && p.precio <= precio[1]);

    if (disponibilidad) {
      filtrados = filtrados.filter(p => p.disponible);
    }

    setProductos(filtrados);
  };

  // Extraer marcas únicas de la categoría actual
  const marcasUnicas = [...new Set(productosData.filter(p => p.categoria === categoria).map(p => p.marca))];
  const precios = productosData.filter(p => p.categoria === categoria).map(p => p.precio);
  const precioMin = Math.min(...precios);
  const precioMax = Math.max(...precios);

  return (
    <div>
      <img src={url} alt="" />
      <h1 className="text-white">Productos de la categoría: {categoria}</h1>

      <Filtros
        marcas={marcasUnicas}
        precioMin={precioMin}
        precioMax={precioMax}
        onFilterChange={handleFilterChange}
      />

      <div className="productos-list">
        {productos.map(p => (
          <div key={p.id} className="producto-card">
            <h2>{p.nombre}</h2>
            <p>Marca: {p.marca}</p>
            <p>Precio: ${p.precio}</p>
            <p>{p.disponible ? "Disponible" : "Agotado"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductoCategoria;
