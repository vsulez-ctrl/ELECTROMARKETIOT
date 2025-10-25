// src/components/Navbar/IconsButton.jsx
const IconsButton = ({ Icon, onClick , className="", children}) => {
    return (
        <button
            onClick={onClick}
            className={`p-2  cursor-pointer ${className}`}
        >
            <Icon />
            {children}
        </button>
    );
};

export default IconsButton;
