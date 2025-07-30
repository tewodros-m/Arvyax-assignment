export default function Spinner({ size = 24, color = 'green' }) {
  const borderColor = {
    green: 'border-green-500',
    white: 'border-white',
    gray: 'border-gray-500',
    blue: 'border-blue-500',
  };

  return (
    <div className='flex items-center justify-center py-6'>
      <span
        className={`animate-spin rounded-full border-4 border-t-transparent ${borderColor[color]}`}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
