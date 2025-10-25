import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Form from "../components/formulario/Form";
import logo from "../assets/imagenes/ui/logo.png";
import IconsButton from "../components/layout/IconsButton";
import api from "../services/api";

const RestablecerPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    
    const [form, setForm] = useState({
        nuevaPassword: "",
        confirmarPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [tokenValido, setTokenValido] = useState(null);

    // Verificar token al cargar la página
    useEffect(() => {
        const verificarToken = async () => {
            if (!token) {
                setError("Token no proporcionado");
                setTokenValido(false);
                return;
            }

            try {
                await api.post("/auth/verificar-token-reset", { token });
                setTokenValido(true);
            } catch (err) {
                setError(err.response?.data?.error || "Token inválido o expirado");
                setTokenValido(false);
            }
        };

        verificarToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (form.nuevaPassword !== form.confirmarPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/restablecer-password", {
                token,
                nuevaPassword: form.nuevaPassword
            });
            
            setSuccess(response.data.mensaje);
            
            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                navigate("/login");
            }, 3000);
            
        } catch (err) {
            setError(err.response?.data?.error || "Error al restablecer la contraseña");
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

    const fields = [
        { 
            name: "nuevaPassword", 
            type: "password", 
            placeholder: "Nueva Contraseña" 
        },
        { 
            name: "confirmarPassword", 
            type: "password", 
            placeholder: "Confirmar Contraseña" 
        }
    ];

    // Mostrar carga mientras verifica token
    if (tokenValido === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white">Verificando enlace...</div>
            </div>
        );
    }

    // Mostrar error si token no es válido
    if (tokenValido === false) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="relative bg-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-sm text-center">
                    <img src={logo} alt="ElectroMarket" className="mb-4 w-30 h-30 mx-auto" />
                    <h2 className="text-white text-xl font-semibold mb-6">Enlace Inválido</h2>
                    
                    <Link to="/login" className="absolute top-5 left-5">
                        <IconsButton Icon={Flecha} />
                    </Link>

                    <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md">
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>

                    <div className="mt-6 text-gray-300 text-sm">
                        <Link to="/olvide-password" className="text-blue-400 hover:underline">
                            Solicitar nuevo enlace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="relative bg-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-sm text-center">
                <img src={logo} alt="ElectroMarket" className="mb-4 w-30 h-30 mx-auto" />
                <h2 className="text-white text-xl font-semibold mb-6">Nueva Contraseña</h2>
                
                <Link to="/login" className="absolute top-5 left-5">
                    <IconsButton Icon={Flecha} />
                </Link>

                <p className="text-gray-300 mb-6 text-sm">
                    Ingresa tu nueva contraseña
                </p>

                <Form
                    fields={fields}
                    values={form}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    onSubmit={handleSubmit}
                    loading={loading}
                    msg={error}
                    submitText="RESTABLECER CONTRASEÑA"
                />

                {/* Mensaje de éxito */}
                {success && (
                    <div className="mt-4 p-3 bg-green-900 border border-green-700 rounded-md">
                        <p className="text-green-200 text-sm">{success}</p>
                        <p className="text-green-200 text-xs mt-2">Redirigiendo al login...</p>
                    </div>
                )}

                <p className="text-xs text-gray-400 mt-4">
                    🔒 La contraseña debe tener: 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (!@#$%^&*)
                </p>
            </div>
        </div>
    );
};

export default RestablecerPassword;