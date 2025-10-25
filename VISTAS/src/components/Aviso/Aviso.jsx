const Aviso = ({ mostrar, onClose }) => {
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#d2d2d39c] z-60">
      <div className="bg-white p-6  shadow-lg w-96 text-center border">
        <h2 className="text-lg font-normal mb-2 text-start ">AVISO</h2>
        <p className="text-gray-600 mb-4 text-start ">
          Has alcanzado el límite de unidades para este artículo.  
          Si deseas añadir más te recomendamos realizar un pedido adicional.
        </p>
        <button
          onClick={onClose}
          className="border px-32 py-2  hover:bg-gray-100 transition"
        >
          CERRAR
        </button>
      </div>
    </div>
  );
};

export default Aviso;
