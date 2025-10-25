  import { useSearchParams } from "react-router-dom";
  import { useEffect, useState, useMemo } from "react";
  import Navbar from "../components/layout/Navbar";
  import Footer from "../components/layout/Footer";
  import HeroProducto from "../components/Productos/HeroProducto";
  import Filtros from "../components/Productos/Filtros";
  import ListaProductos from "../components/Productos/ListaProductos";
  import { obtenerFiltrosDisponibles, buscarProductos} from "../services/productService";
  const PlantillaProductos = ({  }) => {
    const capitalize = categoria => categoria[0].toUpperCase() + categoria.slice(1);
    const bannersPorCategoria = {
    microcontroladores: "src/assets/imagenes/productos/HeroProductos/microcontroladores-hero.png",
    actuadores: "src/assets/imagenes/productos/HeroProductos/actuadores-hero.jpg",
    sensores: "src/assets/imagenes/productos/HeroProductos/sensor-hero.png",
  };


    const [searchParams] = useSearchParams();
    const categoria = searchParams.get("categoria") || " ";
    const categoriaCapitalizada = capitalize(categoria);
    const subcategoria = searchParams.get("subcategoria") || " ";
    
    const subcategoriaCapitalizada = capitalize(subcategoria);


    const banner = bannersPorCategoria[categoria.toLowerCase()] || "/assets/imagenes/productos/HeroProductos/banner-general.png";
 

    const [filtrosDisponibles, setFiltrosDisponibles] = useState({
      marcas: [],
      rangoPrecio: { min: "0", max: "0" },
      disponibilidad: false,
    });

    const [filtroSeleccionado, setFiltroSeleccionado] = useState({
      marcas: [],
      min: 0,
      max: 0,
      disponible: false,
      q: "", // usamos la subcategoría para filtrar
      categoria: categoria,
      subcategoria: subcategoriaCapitalizada || null,
    });

    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(false);
    const nf = useMemo(() => new Intl.NumberFormat("es-CO"), []);

    // Obtener filtros iniciales
    useEffect(() => {
      (async () => {
        console.log("Obteniendo filtros para categoría:", categoriaCapitalizada);
        const data = await obtenerFiltrosDisponibles(categoriaCapitalizada);
        setFiltrosDisponibles(data);
        setFiltroSeleccionado((prev) => ({
          ...prev,
          min: parseFloat(data.rangoPrecio.min),
          max: parseFloat(data.rangoPrecio.max),
        }));
      })();
    }, [categoriaCapitalizada]);

    // Actualizar filtro al cambiar query params
    useEffect(() => {
      setFiltroSeleccionado((prev) => {
        // Solo actualizar si la subcategoría o la categoría realmente cambiaron en la URL
        if (prev.subcategoria !== subcategoria || prev.categoria !== categoria) {
            return {
                ...prev,
                categoria,
                subcategoria: subcategoriaCapitalizada || null,
                // Limpiar filtros de interacción del usuario al navegar
                q: "",
                marcas: [],
                disponible: false,
            };
        }
        return prev;
    });
    }, [categoria, subcategoriaCapitalizada]);

    // Buscar productos
    useEffect(() => {
      (async () => {
        console.log("Buscando productos para categoría:", categoriaCapitalizada, "con filtro:", filtroSeleccionado);
        if (!categoria || filtroSeleccionado.max === 0) return;
        setCargando(true);
        const productos = await buscarProductos(filtroSeleccionado,categoriaCapitalizada);
      
        setItems(productos);
        setCargando(false);
      })();
    }, [filtroSeleccionado]);

    return (
      <div className="min-h-screen text-white">
     
        <HeroProducto  imagen={banner} titulo={categoria.toUpperCase()} />
        <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <Filtros
            titulo={categoria.toUpperCase()}
            marcas={filtrosDisponibles.marcas}
            rangoPrecioDisponible={filtrosDisponibles.rangoPrecio}
            filtro={filtroSeleccionado}
            setFiltro={setFiltroSeleccionado}
            limpiar={() =>
              setFiltroSeleccionado({
                marcas: [],
                min: filtrosDisponibles.rangoPrecio.min,
                max: filtrosDisponibles.rangoPrecio.max,
                disponible: false,
                q: "",
                categoria,
              })
            }
          />
          <main>
            <h2 className="text-2xl font-extrabold tracking-wider mb-6">
              {categoria.toUpperCase()}
            </h2>
            <ListaProductos items={items} cargando={cargando} nf={nf} />
          </main>
        </div>
        <Footer />
      </div>
    );
  };

  export default PlantillaProductos;
