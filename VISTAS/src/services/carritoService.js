import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid'; // Asume que tienes instalado 'uuid'

// URL Base de tu API
const API_URL = 'http://localhost:3000/carrito'; 
const GUEST_TOKEN_KEY = 'sessionId';

// --- Funciones de Utilidad ---

// Obtiene el token de invitado o lo crea
 const obtenerTokenInvitado =() => {
    let token = Cookies.get(GUEST_TOKEN_KEY);
    console.log("Current Guest Token:", token);
    
    if (!token) {
        token = uuidv4();
        
        // 🚨 CAMBIO CLAVE: Añadir 'path: /' para que sea visible en todas las rutas
        Cookies.set(GUEST_TOKEN_KEY, token, { 
            expires: 7, 
            secure: false, 
            sameSite: 'Lax',
            path: '/' // <--- ASEGURA QUE LA COOKIE SE VEA EN CUALQUIER RUTA DEL DOMINIO
        });
        
        console.log("Cookie generada y establecida:", token);
    }
    
    return token;
    }
// Configura los encabezados de autenticación (JWT o Session-ID)
const obtenerEncabezadosAutenticacion = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const accessToken = localStorage.getItem('token'); 
    console.log("Access Token:", accessToken);
    if (accessToken) {
        // Para usuarios autenticados
        console.log("Setting Authorization header with token:", accessToken);
        headers['Authorization'] = `Bearer ${accessToken}`;
        Cookies.remove(GUEST_TOKEN_KEY, { path: '/' });
    } else {
        console.log("No token found, using guest session ID.");
        headers['Session-ID'] = obtenerTokenInvitado(); 
    }
    
    return headers;
};

// --- Clase CarritoApiService ---

class CarritoApiService {
    
    // Función genérica para manejar peticiones Fetch
    static async request(endpoint, method = 'GET', data = null) {
        const url = `${API_URL}${endpoint}`;
        const headers = obtenerEncabezadosAutenticacion();
        const config = { method, headers };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(url, config);
        console.log(`Response from ${method} ${url}:`, response);

        // Si la respuesta no es OK (ej: 400, 401, 500), lanzamos un error con el cuerpo de la respuesta
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ 
                error: `Error ${response.status}: ${response.statusText}` 
            }));
            const error = new Error(errorData.error || errorData.message || 'Error en la petición');
            error.response = { status: response.status, data: errorData }; // Adjuntamos data útil
            throw error;
        }

        return response.json();
    }

    // Obtener el carrito completo (GET /carrito)
    static async obtenerCarrito() {
        return this.request('', 'GET');
    }



// Agregar un producto (POST /carrito/agregar)
static async agregarItem(productoId, cantidad) {
    return this.request('/agregar', 'POST', { productoId, cantidad });
}

// Eliminar un producto (DELETE /carrito/eliminar/:productoId)
static async eliminarItem(productoId) {
    return this.request(`/eliminar/${productoId}`, 'DELETE');
}

// Actualizar cantidad (PUT /carrito/actualizar/:productoId)
static async actualizarCantidad(productoId, cantidad) {
    return this.request(`/actualizar/${productoId}`, 'PUT', { cantidad });
}

    // Obtener el valor del token de invitado actual (para usar en Login/Register)
   
}

export default CarritoApiService;