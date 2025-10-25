import { useState, useEffect } from "react";
import Footer from "../components/layout/Footer";
import { buscarMicrocontroladores } from "../services/productService";

import Logo from "../components/layout/logo";
import mercado from "../assets/imagenes/ui/mercadoPago.png";
import logo from "../assets/imagenes/ui/logo.png";
import ResumenPedido from "../components/Pedido/ResumenPedido";

const MetodoPago = () => {
  const [seleccion, setSeleccion] = useState(() => {
    try {
      return localStorage.getItem("metodoPago") || "";
    } catch (e) {
      return "";
    }
  });

  const [cart, setCart] = useState([]);
  const [totales, setTotales] = useState({ subtotal: 0, envio: 0, total: 0 });

  // Campos tarjeta
  const [numero, setNumero] = useState("");
  const [exp, setExp] = useState("");
  const [titular, setTitular] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    try {
      if (seleccion) localStorage.setItem("metodoPago", seleccion);
    } catch (e) {}
  }, [seleccion]);

  // Cargar carrito desde localStorage (si existe) o usar mock
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(parsed);
        computeTotals(parsed);
      } else {
        // fallback: cargar algunos microcontroladores como placeholder
        (async () => {
          const items = await buscarMicrocontroladores();
          const selection = items.slice(0, 2).map((p) => ({ ...p, qty: 1 }));
          setCart(selection);
          computeTotals(selection);
        })();
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const computeTotals = (items) => {
    const subtotal = items.reduce((s, it) => s + (it.precio || 0) * (it.qty || 1), 0);
    const envio = subtotal > 0 ? 5000 : 0; // ejemplo de envío fijo
    setTotales({ subtotal, envio, total: subtotal + envio });
  };

  const handleConfirm = () => {
    if (!seleccion) return alert("Seleccione un método de pago antes de continuar.");
    if (seleccion === "tarjeta") {
      if (!numero || !exp || !titular || !cvv) return alert("Complete los datos de la tarjeta.");
      // Aquí iría la llamada al gateway o creación de orden
      alert("Pago con tarjeta simulado. Gracias.");
      return;
    }
    if (seleccion === "mercadopago") {
      // Simulación de redirección a mercado pago
      alert("Redirigiendo a MercadoPago (simulado)");
      return;
    }
  };

  return (
    <>
      

      <main className="max-w-6xl mx-auto px-4 py-12">
        <Logo  src={logo} height={120} />
        <h1 className="text-2xl font-semibold mb-6">ELIGE UN MÉTODO DE PAGO</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <div className="flex gap-6 mb-8 flex-wrap">
              {/* Tarjeta */}
              <div
                onClick={() => setSeleccion("tarjeta")}
                className={`flex-1 min-w-[220px] cursor-pointer p-6 border rounded-md text-center ${
                  seleccion === "tarjeta" ? "border-black" : "border-gray-200"
                }`}
              >
                <div className="h-20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="33" viewBox="0 0 50 33" fill="none" class="injected-svg" data-src="/public/img/payment-methods/creditdebitcard.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
                    <g clip-path="url(#clip0_25901_1160-5)">
                    <rect width="50" height="33" rx="1.5" fill="white"></rect>
                    <path d="M25.0004 22.1872H16.667V21.1456H25.0004V22.1872Z" fill="black"></path>
                    <path d="M31.6669 22.1872H33.3336V21.1456H31.6669V22.1872Z" fill="black"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.667 7.70817C11.667 7.13287 12.1334 6.6665 12.7087 6.6665H37.292C37.8673 6.6665 38.3337 7.13287 38.3337 7.70817V25.6248C38.3337 26.2001 37.8673 26.6665 37.292 26.6665H12.7087C12.1334 26.6665 11.667 26.2001 11.667 25.6248V7.70817ZM12.7087 7.70817H37.292V12.8122H12.7087V7.70817ZM12.7087 13.8539V25.6248H37.292L37.292 13.8539H12.7087Z" fill="black"></path>
                    </g>
                    <defs>
                    <clipPath id="clip0_25901_1160-5">
                    <rect width="50" height="33" rx="1.5" fill="white"></rect>
                    </clipPath>
                    </defs>
                    </svg>
                  <div  />
                </div>
                <div className="text-sm font-medium">TARJETA CRÉDITO/DÉBITO</div>
              </div>

              {/* MercadoPago */}
              <div
                onClick={() => setSeleccion("mercadopago")}
                className={`flex-1 min-w-[220px] cursor-pointer p-6 border rounded-md text-center ${
                  seleccion === "mercadopago" ? "border-black" : "border-gray-200"
                }`}
              >
                <div className="h-20 flex items-center justify-center mb-4">
                 <Logo src={mercado} height={40} />
                </div>
                <div className="text-sm font-medium">MERCADOPAGO</div>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4">COMPLETA LOS DETALLES DE PAGO</h2>

            {/* Form tarjeta: se muestra sólo si seleccion === 'tarjeta' */}
            {seleccion === "tarjeta" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-600">NÚMERO DE TARJETA</label>
                  <input
                    value={numero}
                    onChange={(e) => setNumero(e.target.value.replace(/[^0-9 ]/g, ""))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full border-b py-2 mt-2"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600">EXPIRACIÓN (MM/AA)</label>
                  <input
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                    placeholder="MM/AA"
                    className="w-full border-b py-2 mt-2"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600">TITULAR DE TARJETA</label>
                  <input
                    value={titular}
                    onChange={(e) => setTitular(e.target.value)}
                    placeholder="Nombre como figura en la tarjeta"
                    className="w-full border-b py-2 mt-2"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600">NÚMERO DE CVV</label>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="123"
                    className="w-full border-b py-2 mt-2"
                  />
                </div>
              </div>
            )}

            {seleccion === "mercadopago" && (
              <div className="p-4 border rounded-md mt-4">
                <p>Serás redirigido a MercadoPago para completar el pago (simulado).</p>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleConfirm}
                className="bg-black text-white px-6 py-3 rounded-md"
              >
                Finalizar pago
              </button>
            </div>
          </section>

          {/* Resumen lateral */}
         <ResumenPedido cart={cart} totales={totales} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MetodoPago;
