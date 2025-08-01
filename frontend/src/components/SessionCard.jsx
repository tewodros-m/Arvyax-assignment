import { formatDate } from '../utils/formatDate';

function SessionCard({ session, onClick }) {
  const { title, tags, json_file_url, status, created_at } = session;

  return (
    <div
      onClick={onClick}
      className={`border border-green-600 rounded p-4 bg-white shadow-sm hover:shadow-md transition ${
        onClick ? 'cursor-pointer' : ''
      } hover:border-green-300`}
    >
      <div className='flex justify-between items-start gap-2 mb-2'>
        <h2 className='text-base sm:text-lg font-semibold text-gray-800 line-clamp-2'>
          {title}
        </h2>
        {status && (
          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
              status === 'draft'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {status}
          </span>
        )}
      </div>

      {tags?.length > 0 && (
        <p className='text-sm text-green-600 mb-1 break-words'>
          Tags: #{tags.join(', #')}
        </p>
      )}

      {created_at && (
        <p className='text-xs text-gray-400 mt-2'>
          Created: {formatDate(created_at)}
        </p>
      )}

      {json_file_url && (
        <a
          href={json_file_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 text-sm underline inline-block mt-2'
          // onClick={(e) => e.stopPropagation()}
        >
          View JSON
        </a>
      )}
    </div>
  );
}

export default SessionCard;
