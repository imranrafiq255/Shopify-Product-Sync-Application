const Button = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-600 text-white px-4 py-2 w-full"
      disabled={loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
