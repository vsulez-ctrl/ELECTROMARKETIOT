import React, { useState, useRef } from "react";
import Form from "../components/formulario/Form";
import logo from "../assets/imagenes/ui/logo.png";
import IconsButton from "../components/layout/IconsButton";
import { Link, useNavigate } from "react-router-dom";
import { login, verificarCodigo, reenviarCodigo , getAndClearRedirectUrl} from "../services/authService";
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState("login"); 
  const [usuarioPendiente, setUsuarioPendiente] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleCodigoChange = (e) => {
    setCodigoVerificacion(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🔄 [LOGIN] Iniciando proceso de login...");
      const response = await login(form);
      
      console.log("📨 [LOGIN] Respuesta recibida:", response.data);
      
      if (response.data.requiereVerificacion === true) {
        console.log("🎯 [LOGIN] Cambiando a modo VERIFICACIÓN");
        setModo("verificacion");
        setUsuarioPendiente({
          id: response.data.usuarioId,
          email: response.data.email
        });
      }  else if (response.data.token) {
        console.log("🎉 [LOGIN] Login directo exitoso");
        
        // ✅ ACTUALIZAR EL CONTEXT DE AUTENTICACIÓN
        authLogin(response.data.usuario);
        const redirectUrl = getAndClearRedirectUrl();
        
        // ✅ FORZAR NAVEGACIÓN CON setTimeout
        setTimeout(() => {
          console.log(`🔄 [LOGIN] Navegando a ${redirectUrl}.`);
          window.location.href = redirectUrl; // Usa la URL de destino
        }, 100);
        
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
      
    } catch (err) {
      console.error("❌ [LOGIN] Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🔄 [VERIFICACIÓN] Verificando código...");
      const response = await verificarCodigo(usuarioPendiente.id, codigoVerificacion);
      
      console.log("✅ [VERIFICACIÓN] Código verificado:", response.data);
      if (response.data.token) {
        authLogin(response.data.usuario);
        const redirectUrl = getAndClearRedirectUrl();
                setTimeout(() => {
        console.log(`🔄 [VERIFICACIÓN] Navegando a ${redirectUrl}...`); 
        window.location.href = redirectUrl; // Usa la URL de destino
        }, 100);
        
      } else {
        throw new Error("No se recibió token después de la verificación");
      }
      
    } catch (err) {
      console.error("❌ [VERIFICACIÓN] Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReenviarCodigo = async () => {
    setError("");
    setLoading(true);

    try {
      console.log("🔄 [REENVÍO] Reenviando código...");
      await reenviarCodigo(usuarioPendiente.id);
      setError("✅ Se ha enviado un nuevo código a tu correo");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const volverALogin = () => {
    setModo("login");
    setCodigoVerificacion("");
    setError("");
  };

  const Flecha = () => (
    <svg
      className="fill-current text-white"
      width="28"
      height="8"
      viewBox="0 0 28 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(180deg)" }}
    >
      <path
        transform="scale(1 1)"
        d="M27.3536 4.35356C27.5488 4.15829 27.5488 3.84171 27.3536 3.64645L24.1716 0.464468C23.9763 0.269206 23.6597 0.269206 23.4645 0.464468C23.2692 0.65973 23.2692 0.976313 23.4645 1.17157L26.2929 4L23.4645 6.82843C23.2692 7.02369 23.2692 7.34027 23.4645 7.53554C23.6597 7.7308 23.9763 7.7308 24.1716 7.53554L27.3536 4.35356ZM0 4.5L27 4.5L27 3.5L0 3.5L0 4.5Z"
      />
    </svg>
  );

  const fields = [
    { name: "email", type: "email", placeholder: "Correo Electrónico", autocomplete: "email" },
    { name: "password", type: "password", placeholder: "Contraseña", autocomplete: "current-password" },
  ];

  console.log("🎯 [RENDER] Modo actual:", modo);

  if (modo === "verificacion") {
    console.log("🎯 [RENDER] Renderizando pantalla de VERIFICACIÓN");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="relative bg-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-sm text-center">
          <img src={logo} alt="ElectroMarket" className="mb-4 w-30 h-30 mx-auto" />
          <h2 className="text-white text-xl font-semibold mb-6">Verificación de Email</h2>
          
          <Link to="/" className="absolute top-5 left-5">
            <IconsButton Icon={Flecha} />
          </Link>

          <p className="text-gray-300 mb-4">
            Se ha enviado un código de verificación a:<br />
            <strong>{usuarioPendiente?.email}</strong>
          </p>

          <form onSubmit={handleVerificarCodigo} className="space-y-4">
            <input
              type="text"
              value={codigoVerificacion}
              onChange={handleCodigoChange}
              placeholder="Ingresa el código de 6 dígitos"
              className="w-full px-4 py-2 rounded-md bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="6"
              disabled={loading}
              autoComplete="one-time-code"
            />

            {error && (
              <div className={`text-sm ${error.includes('✅') ? 'text-green-400' : 'text-red-500'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || codigoVerificacion.length !== 6}
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>
          </form>

          <div className="mt-4 space-y-2">
            <button
              onClick={handleReenviarCodigo}
              disabled={loading}
              className="text-blue-400 hover:underline text-sm disabled:opacity-50"
            >
              ¿No recibiste el código? Reenviar
            </button>
            
            <button
              onClick={volverALogin}
              className="block text-gray-400 hover:text-white text-sm"
            >
              ← Volver al login
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log("🎯 [RENDER] Renderizando pantalla de LOGIN");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="relative bg-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-sm text-center">
        <img src={logo} alt="ElectroMarket" className="mb-4 w-30 h-30 mx-auto" />
        <h2 className="text-white text-xl font-semibold mb-6">Iniciar Sesión</h2>
        
        <Link to="/" className="absolute top-5 left-5">
          <IconsButton Icon={Flecha} />
        </Link>

        <Form
          fields={fields}
          values={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          msg={error}
          submitText="INICIAR SESIÓN"
        />

        {/* 🔐 ENLACE "OLVIDÉ MI CONTRASEÑA" - ACTUALIZADO A /recuperar */}
        <div className="mt-4 text-center">
          <Link 
            to="/recuperar" 
            className="text-blue-400 hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6 text-gray-300 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-400 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}