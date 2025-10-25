import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/formulario/Form";
import logo from "../assets/imagenes/ui/logo.png";
import IconsButton from "../components/layout/IconsButton";
import api from "../services/api";

const OlvidePassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.post("/auth/olvide-password", { email });
            setSuccess(response.data.mensaje);
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.error || "Error al procesar la solicitud");
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
            name: "email", 
            type: "email", 
            placeholder: "Correo Electrónico", 
            autocomplete: "email" 
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="relative bg-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-sm text-center">
                <img src={logo} alt="ElectroMarket" className="mb-4 w-30 h-30 mx-auto" />
                <h2 className="text-white text-xl font-semibold mb-6">Recuperar Contraseña</h2>
                
                <Link to="/login" className="absolute top-5 left-5">
                    <IconsButton Icon={Flecha} />
                </Link>

                <p className="text-gray-300 mb-6 text-sm">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>

                <Form
                    fields={fields}
                    values={{ email }}
                    onChange={(e) => setEmail(e.target.value)}
                    onSubmit={handleSubmit}
                    loading={loading}
                    msg={error}
                    submitText="ENVIAR ENLACE"
                />

                {success && (
                    <div className="mt-4 p-3 bg-green-900 border border-green-700 rounded-md">
                        <p className="text-green-200 text-sm">{success}</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md">
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                <div className="mt-6 text-gray-300 text-sm">
                    ¿Recordaste tu contraseña?{" "}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Volver al login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OlvidePassword;