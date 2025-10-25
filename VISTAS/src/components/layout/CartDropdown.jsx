// src/components/Navbar/CartDropdown.jsx
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CartProducto from "../Productos/CartProducto";
import { setRedirectUrl } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
export default function CartDropdown() {
  const [open, setOpen] = useState(true); // Puedes controlar esto desde un ícono externo
  const { cartItems, totalItems, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleProcesarPago = () => {
        if (isAuthenticated) {
            // Caso 1: Usuario autenticado -> Ir directo a Checkout
            navigate("/metodo-pago");
        } else {
            setRedirectUrl("/metodo-pago"); 
            navigate("/login");
        }
  };
  
  return (
    <div className="relative">
      {open && (
        <div className="absolute right-0 w-80 md:w-96 bg-white text-gray-900 shadow-2xl rounded-3xl p-6 z-50 border border-gray-200 transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold text-gray-800">🛒 Tu carrito</h3>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition"
              title="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Contenido */}
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-6">Tu carrito está vacío 🕊️</p>
          ) : (
            <>
              <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {cartItems.map((item, index) => (
                  <CartProducto key={index} item={item} />
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 border-t border-gray-300 pt-4">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-700 font-medium">
                    Total Items ({totalItems})
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    ${subtotal.toLocaleString("es-CO")}
                  </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3">
                  <button
                  onClick={handleProcesarPago}
              
                    className="w-full text-center bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Proceder al pago
                  </button>

                  <Link
                    to="/productos"
                    className="w-full border-2 text-center border-blue-700 text-blue-700 py-2.5 rounded-full font-medium hover:bg-blue-50 transition-all duration-200"
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

}