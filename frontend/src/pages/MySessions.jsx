import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/axios';
import SessionCard from '../components/SessionCard';

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

  if (loading) return <p className='text-center mt-10'>Loading...</p>;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>My Sessions</h1>
        <button
          onClick={() => navigate('/session-editor')}
          className='bg-green-600 text-white px-4 py-2 rounded'
        >
          + New Session
        </button>
      </div>

      {sessions.length === 0 ? (
        <p>You haven't created any sessions yet.</p>
      ) : (
        <div className='space-y-4'>
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
