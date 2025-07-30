import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/axios';
import SessionCard from '../components/SessionCard';
import Spinner from '../components/Spinner';

function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        const res = await api.get('/my-sessions');
        setSessions(res.data);
      } catch (err) {
        console.log('Error fetching my sessions:', err);
        setError('Failed to load your sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold text-center sm:text-left'>
          My Sessions
        </h1>
        <button
          onClick={() => navigate('/session-editor')}
          className='bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto'
        >
          + New Session
        </button>
      </div>

      {sessions.length === 0 ? (
        <p className='text-center text-gray-500'>
          You haven't created any sessions yet.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
              onClick={() => navigate(`/session-editor/${session._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MySessions;
