const ResumenPedido = ({ cart, totales }) => {
  return (
    <aside className="lg:col-span-1 border p-4 rounded-md">
      <h3 className="font-semibold mb-4">RESUMEN DEL PEDIDO</h3>
      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-3">
          {cart.map((it) => (
            <div key={it.id} className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{it.nombre}</div>
                <div className="text-xs text-gray-500">Cantidad: {it.qty || 1}</div>
              </div>
              <div className="text-sm">${(it.precio || 0).toLocaleString()}</div>
            </div>
          ))}

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between text-sm">
              <div>Subtotal</div>
              <div>${totales.subtotal.toLocaleString()}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>Envío</div>
              <div>${totales.envio.toLocaleString()}</div>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <div>Total</div>
              <div>${totales.total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ResumenPedido;
