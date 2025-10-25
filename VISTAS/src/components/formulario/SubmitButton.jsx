const  SubmitButton = ({ loading, text })=> {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 rounded-md bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold hover:opacity-90 transition"
    >
      {loading ? 'Ingresando…' : text}
    </button>
  );
}
export default SubmitButton;