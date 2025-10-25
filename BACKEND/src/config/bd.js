const { Pool } = require('pg');

// Configura tu conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',               // tu usuario de pgAdmin
  host: 'localhost',              // host local
  database: 'electromarketbd',    // tu base de datos
  password: '1234',      // cámbiala por tu contraseña real
  port: 5432,                     // puerto por defecto
});

// Verificar conexión
pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error al conectar a PostgreSQL:', err));

module.exports = pool;
