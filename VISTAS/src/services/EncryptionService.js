import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'electromarket-frontend-2024-secure-key';

export class EncryptionService {
    static encryptPassword(password) {
        try {
            console.log("🔐 Encriptando contraseña...");
            const encrypted = CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
            console.log("✅ Encriptación exitosa");
            return encrypted;
        } catch (error) {
            console.error('❌ Error en encriptación:', error);
            throw error; // Propagar el error para manejarlo arriba
        }
    }
}

export default EncryptionService;