import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/formulario/Form";
import logo from "../assets/imagenes/ui/logo.png";
import IconsButton from "../components/layout/IconsButton";
import { register } from "../services/authService";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fields = [
    { name: "nombre", placeholder: "Nombre completo", type: "text" },
    { name: "email", placeholder: "Correo Electrónico", type: "email" },
    { name: "direccion", placeholder: "Dirección", type: "text" },
    { name: "telefono", placeholder: "Teléfono", type: "tel" },
    { name: "password", placeholder: "Contraseña", type: "password" }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await register(form);
      console.log("✅ Registro exitoso:", response.data);
      
      setSuccess("¡Registro exitoso! Redirigiendo al login...");
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      console.error("❌ Error en registro:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="relative bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <img src={logo} className="mb-4 mt-3 w-30 h-30 mx-auto" alt="Logo" />
        <h2 className="text-white text-xl font-semibold mb-6">
          Crear Cuenta
        </h2>

        <Link to="/" className="absolute top-2 left-2">
          <IconsButton Icon={Flecha} />
        </Link>

        <Form
          fields={fields}
          values={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          msg={error}
          submitText="REGISTRARSE"
        />

        {/* Mensaje de éxito */}
        {success && (
          <div className="mt-4 p-3 bg-green-900 border border-green-700 rounded-md">
            <p className="text-green-200 text-sm">{success}</p>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4">
          🔒 La contraseña debe tener: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (!@#$%^&*)
        </p>

        <div className="mt-6 text-gray-300 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;