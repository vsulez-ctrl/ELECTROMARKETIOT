const FormInput = ({ name, type, value, onChange, disabled, placeholder }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-md bg-gray-900 border-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};


export default FormInput;