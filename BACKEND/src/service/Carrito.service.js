// /service/CarritoService.js
const pool = require('../config/bd');

class CarritoServicio {

    /**
     * Busca el carrito ACTIVO existente o crea uno nuevo de forma segura (maneja concurrencia).
     */
    static async obtenerIdCarroActivo(usuarioId, invitadoToken) {
        const identificationField = usuarioId ? 'usuario_id' : 'token_invitado';
        const identificationValue = usuarioId || invitadoToken;
        console.log("tokern invitado en getOrCreateActiveCartId:", invitadoToken);
        console.log("tokern usuario en getOrCreateActiveCartId:", usuarioId);
        if (!identificationValue) {
            throw new Error("Se requiere usuario o token de invitado para gestionar el carrito.");
        }

        // 1. Intentar buscar el carrito ACTIVO
        const searchQuery = `
            SELECT id_carrito 
            FROM carritos 
            WHERE ${identificationField} = $1 AND estado = 'ACTIVO' 
            ORDER BY fecha_actualizacion DESC 
            LIMIT 1;
        `;
        let res = await pool.query(searchQuery, [identificationValue]);

        if (res.rows.length > 0) {
            // Encontrado (el más reciente o el único)
            return res.rows[0].id_carrito;
        } 
        
        // 2. Si no se encontró, intentar crear uno nuevo
        try {
            const createQuery = `
                INSERT INTO carritos (usuario_id, token_invitado, estado) 
                VALUES ($1, $2, 'ACTIVO') 
                RETURNING id_carrito;
            `;
            const newCartRes = await pool.query(createQuery, [usuarioId || null, invitadoToken || null]);
            return newCartRes.rows[0].id_carrito;

        } catch (error) {
            // 3. Manejo de error de CONCURRENCIA (PostgreSQL error code for unique_violation is '23505')
            if (error.code === '23505') { 
                console.log("Advertencia: Intento de crear carrito duplicado detectado. Volviendo a buscar el existente.");
                
                // Re-ejecutar la búsqueda para obtener el carrito que fue creado concurrentemente
                let finalRes = await pool.query(searchQuery, [identificationValue]);
                
                if (finalRes.rows.length > 0) {
                    return finalRes.rows[0].id_carrito;
                } else {
                    throw new Error("Fallo al crear y luego re-obtener el carrito activo.");
                }
            }
            throw error;
        }
    }

    /**
     * Agrega un producto al carrito (hace UPSERT en carrito_items).
     */
    static async agregarItem(usuarioId, invitadoToken, productoId, cantidad) {
    // ... (Tu código de logs y obtener carritoId)
    const carritoId = await this.obtenerIdCarroActivo(usuarioId, invitadoToken);

    // 1. Obtener precio, stock, Y cantidad actual en el carrito (para ese producto)
    const [productoResult, itemActualResult] = await Promise.all([
        pool.query("SELECT precio, stock FROM productos WHERE id = $1", [productoId]),
        pool.query("SELECT cantidad FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2", [carritoId, productoId])
    ]);

    if (productoResult.rows.length === 0) {
        throw new Error("Producto no encontrado");
    }

    const { precio, stock } = productoResult.rows[0];
    const cantidadActualEnCarrito = itemActualResult.rows.length > 0 ? itemActualResult.rows[0].cantidad : 0;
    
    // 🚨 LÓGICA DE VALIDACIÓN DE STOCK
    const nuevaCantidadTotal = cantidadActualEnCarrito + cantidad;
    
    if (nuevaCantidadTotal > stock) {
        console.log("❌ Intento de agregar más unidades que el stock disponible:")
        // Enviar un error específico con la cantidad máxima permitida
        return ({
            limiteAlcanzado: true,
            mensaje: `No se puede agregar ${cantidad} unidades. Solo quedan ${stock - cantidadActualEnCarrito} unidades disponibles en stock.`,
            carritoId,
            
        });
    }
    
    // 2. Insertar/Actualizar el ítem (UPSERT)
    // El UPSERT está bien, solo que ahora sabemos que la suma no excederá el stock.
    const resultado = await pool.query(
        `INSERT INTO carrito_items (carrito_id, producto_id, cantidad, precio_unitario)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (carrito_id, producto_id) 
            DO UPDATE SET 
                cantidad = carrito_items.cantidad + EXCLUDED.cantidad,
                fecha_actualizacion = NOW() 
            RETURNING id_item`,
        [carritoId, productoId, cantidad, precio]
    );
    
 
    console.log("Item agregado/actualizado en carrito:", { carritoId, itemId: resultado.rows[0].id_item });
    return { carritoId, itemId: resultado.rows[0].id_item };
}

    /**
     * Elimina una línea de producto del carrito.
     */
    static async eliminarItem(usuarioId, invitadoToken, productoId) {
        const carritoId = await this.obtenerIdCarroActivo(usuarioId, invitadoToken);
        
        const resultado = await pool.query(
            "DELETE FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2",
            [carritoId, productoId]
        );
        
        if (resultado.rowCount > 0) {
             // Actualizar el timestamp del carrito principal si se modificó
             await pool.query("UPDATE carritos SET fecha_actualizacion = NOW() WHERE id_carrito = $1", [carritoId]);
        }
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     */
    static async actualizarItemCantidad(usuarioId, invitadoToken, productoId, nuevaCantidad) {
        if (nuevaCantidad === 0) {
            // Si la cantidad es 0, es mejor eliminar el ítem.
            return this.eliminarItem(usuarioId, invitadoToken, productoId);
        }
        
        const carritoId = await this.obtenerIdCarroActivo(usuarioId, invitadoToken);
         const [productoResult, itemActualResult] = await Promise.all([
        pool.query("SELECT precio, stock FROM productos WHERE id = $1", [productoId]),
        pool.query("SELECT cantidad FROM carrito_items WHERE carrito_id = $1 AND producto_id = $2", [carritoId, productoId])
    ]);

    if (productoResult.rows.length === 0) {
        throw new Error("Producto no encontrado");
    }

    const { stock } = productoResult.rows[0];
    const cantidadActualEnCarrito = itemActualResult.rows.length > 0 ? itemActualResult.rows[0].cantidad : 0;
    
    // 🚨 LÓGICA DE VALIDACIÓN DE STOCK
    const nuevaCantidadTotal = cantidadActualEnCarrito + cantidad;
    
    if (nuevaCantidadTotal > stock) {
        console.log("❌ Intento de agregar más unidades que el stock disponible:")
        // Enviar un error específico con la cantidad máxima permitida
        return ({
            limiteAlcanzado: true,
            mensaje: `No se puede agregar ${cantidad} unidades. Solo quedan ${stock - cantidadActualEnCarrito} unidades disponibles en stock.`,
            carritoId,
            
        });
    }
        // El precio_unitario NO se actualiza aquí, solo la cantidad.
        const resultado = await pool.query(
            `UPDATE carrito_items 
             SET cantidad = $1, fecha_actualizacion = NOW()
             WHERE carrito_id = $2 AND producto_id = $3`,
            [nuevaCantidad, carritoId, productoId]
        );

        if (resultado.rowCount === 0) {
             // 🚨 Este es el error que buscábamos corregir con la lógica de ID
             throw new Error("El producto no existe en el carrito.");
        }
        
        // Actualizar el timestamp del carrito principal
        await pool.query("UPDATE carritos SET fecha_actualizacion = NOW() WHERE id_carrito = $1", [carritoId]);
    }


    /**
     * Obtiene el contenido detallado del carrito.
     */
    static async obtenerCarrito(usuarioId, invitadoToken) {
        const carritoId = await this.obtenerIdCarroActivo(usuarioId, invitadoToken);

        const consulta = `
            SELECT
                ci.producto_id AS id,
                p.nombre,
                p.imagen_url,
                ci.cantidad,
                ci.precio_unitario,
                (ci.cantidad * ci.precio_unitario) AS subtotal
            FROM
                carrito_items ci
            JOIN
                productos p ON ci.producto_id = p.id
            WHERE
                ci.carrito_id = $1;
        `;
        const items = await pool.query(consulta, [carritoId]);

        // Cálculo del total
        const total = items.rows.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

        return {
            carritoId,
            items: items.rows,
            total: total.toFixed(2)
        };
    }
    
  // ... (Código anterior de CarritoService)

    /**
     * Consolida el carrito de invitado (invitadoToken) al carrito ACTIVO del usuario (usuarioId).
     * Mueve los items del carrito de invitado al carrito de usuario y elimina el de invitado.
     */
    static async consolidarCarrito(usuarioId, invitadoToken) {
        if (!usuarioId || !invitadoToken) return;
        
        console.log(`[CARRITO] Iniciando consolidación: Guest ${invitadoToken} -> User ${usuarioId}`);

        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Iniciar la transacción

            // 1. Obtener el ID del carrito del INVITADO
            const guestCartRes = await client.query(
                "SELECT id_carrito FROM carritos WHERE token_invitado = $1 AND estado = 'ACTIVO'",
                [invitadoToken]
            );

            if (guestCartRes.rows.length === 0) {
                console.log("[CARRITO] No hay carrito de invitado activo para consolidar.");
                await client.query('COMMIT');
                return; 
            }
            
            const guestCartId = guestCartRes.rows[0].id_carrito;

            // 2. Obtener/Crear el ID del carrito ACTIVO del USUARIO
            // Usamos una consulta directa en la transacción para evitar recursión con getOrCreateActiveCartId
            let userCartRes = await client.query(
                "SELECT id_carrito FROM carritos WHERE usuario_id = $1 AND estado = 'ACTIVO'",
                [usuarioId]
            );

            let userCartId;
            if (userCartRes.rows.length === 0) {
                // Si el usuario NO tiene un carrito activo, usamos el carrito de invitado
                userCartId = guestCartId;
                
                // Transferimos el carrito de invitado al usuario
                await client.query(
                    `UPDATE carritos 
                     SET usuario_id = $1, token_invitado = NULL, fecha_actualizacion = CURRENT_TIMESTAMP
                     WHERE id_carrito = $2`,
                    [usuarioId, userCartId]
                );
                console.log(`[CARRITO] Carrito ${guestCartId} transferido al usuario ${usuarioId}.`);

            } else {
                // Si el usuario SÍ tiene un carrito activo, FUSIONAMOS (el escenario más complejo)
                userCartId = userCartRes.rows[0].id_carrito;
                
                // Mover/Fusionar ítems del carrito invitado al carrito del usuario
                // Realiza un UPSERT (Insertar o Sumar Cantidad si el producto ya existe)
                await client.query(
                    `INSERT INTO carrito_items (carrito_id, producto_id, cantidad, precio_unitario)
                     SELECT $1, producto_id, cantidad, precio_unitario 
                     FROM carrito_items 
                     WHERE carrito_id = $2
                     ON CONFLICT (carrito_id, producto_id)
                     DO UPDATE SET
                         cantidad = carrito_items.cantidad + EXCLUDED.cantidad,
                         fecha_actualizacion = NOW()`,
                    [userCartId, guestCartId]
                );

                // Eliminar todos los ítems del carrito de invitado
                await client.query("DELETE FROM carrito_items WHERE carrito_id = $1", [guestCartId]);
                
                // Eliminar el carrito de invitado (que ahora está vacío)
                await client.query("DELETE FROM carritos WHERE id_carrito = $1", [guestCartId]);
                
                // Actualizar el timestamp del carrito del usuario
                await client.query("UPDATE carritos SET fecha_actualizacion = NOW() WHERE id_carrito = $1", [userCartId]);

                console.log(`[CARRITO] Carrito ${guestCartId} fusionado y eliminado. Los ítems se movieron a ${userCartId}.`);
            }

            await client.query('COMMIT'); // Confirmar todos los cambios
            return { exito: true, userCartId };

        } catch (error) {
            await client.query('ROLLBACK'); // Deshacer si algo falla
            console.error("[CARRITO] Error crítico en consolidación. ROLLBACK ejecutado:", error.message);
            throw new Error("Fallo al consolidar el carrito del invitado. Intente nuevamente.");
        } finally {
            client.release();
        }
    }
}



module.exports = CarritoServicio;