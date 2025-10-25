const Card = ({ title, description, image, linkText, linkUrl, showButton = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img src={image} alt={title} className="w-full h-68 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Render condicional del botón */}
        {showButton && linkUrl && (
          <a
            href={linkUrl}
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {linkText || "Ver más"}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
