import axios from "axios";

// ✅ Asegúrate que la URL sea correcta
const api = axios.create({
  baseURL: "http://localhost:3000",  // Puerto 3000 (backend)
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos timeout
  withCredentials: true,
});

// Interceptor para incluir token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar respuestas - CORREGIDO
api.interceptors.response.use(
  (response) => {
    console.log("✅ [API] Respuesta recibida:", {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error("❌ [API] Error en respuesta:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ No se puede conectar al servidor');
      throw new Error('Error de conexión con el servidor');
    }
    
    return Promise.reject(error);
  }
);

export default api;