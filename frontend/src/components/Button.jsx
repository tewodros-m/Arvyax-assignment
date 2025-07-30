function Button({
  children,
  onClick,
  type = 'button',
  color = 'green',
  fullWidth = false,
  isLoading = false,
  disabled = false,
}) {
  const base = `px-4 py-2 rounded text-white shadow font-medium relative cursor-pointer`;
  const width = fullWidth ? 'w-full' : 'min-w-[120px]';
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
      disabled={isLoading || disabled}
      className={`${base} ${
        colorClasses[color]
      } focus:outline-none  focus:ring-2 ${width} ${
        isLoading ? 'opacity-80 cursor-not-allowed' : ''
      }`}
    >
      {isLoading && (
        <wspan className='animate-spin absolute mx-auto inline-block h-5 w-5 border-4 border-white border-t-transparent rounded-full' />
      )}

      {children}
    </button>
  );
}

export default Button;
