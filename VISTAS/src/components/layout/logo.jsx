const Logo = ({ src, height = 80 }) => {
  return (
    <div className="cursor-pointer px-5">
      <img
        src={src}
        style={{ height: `${height}px`, width: "auto" }}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;

