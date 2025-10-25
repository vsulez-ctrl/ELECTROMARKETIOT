const   MessageBox = ({ msg }) => {
  if (!msg) return null;
  return <div className="text-red-500 text-sm">{msg}</div>;
}

export default MessageBox
