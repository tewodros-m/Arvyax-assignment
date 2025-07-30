import { useEffect, useState } from 'react';

import api from '../api/axios';
import SessionCard from '../components/SessionCard';
import Spinner from '../components/Spinner';

function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/sessions');
        setSessions(res.data);
      } catch (err) {
        console.log('Error fetching sessions:', err);
        setError('Failed to load sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className='text-center mt-10 text-red-500'>{error}</p>;

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Wellness Sessions</h1>

      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <div className='space-y-4'>
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
