function Button({
  children,
  onClick,
  type = 'button',
  color = 'green',
  fullWidth = false,
}) {
  const base = `px-4 py-2 rounded text-white shadow font-medium`;
  const width = fullWidth ? 'w-full' : '';
  const colorClasses = {
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${colorClasses[color]} focus:outline-none focus:ring-2 ${width}`}
    >
      {children}
    </button>
  );
}

export default Button;
