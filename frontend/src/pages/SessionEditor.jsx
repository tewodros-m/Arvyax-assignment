import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';

function SessionEditor() {
  const { id } = useParams(); // optional session ID
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    tags: '',
    json_file_url: '',
    id: null,
  });
  const [status, setStatus] = useState(''); // save feedback
  const timeoutRef = useRef(null);

  // Load existing session if editing
  useEffect(() => {
    if (id) {
      api
        .get(`/my-sessions/${id}`)
        .then((res) => {
          const session = res.data;
          setForm({
            id: session._id,
            title: session.title || '',
            tags: session.tags?.join(', ') || '',
            json_file_url: session.json_file_url || '',
          });
        })
        .catch(() => setStatus('Error loading session'));
    }
  }, [id]);

  // Auto-save after 5s of inactivity
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSaveDraft(true);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [form]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveDraft = async (silent = false) => {
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()),
      };
      const res = await api.post('/my-sessions/save-draft', payload);
      setForm((f) => ({ ...f, id: res.data._id }));
      if (!silent) setStatus('Draft saved');
    } catch (err) {
      console.error('Error saving draft:', err);
      if (!silent) setStatus('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()),
      };
      await api.post('/my-sessions/publish', payload);
      setStatus('Session published');
      navigate('/my-sessions');
    } catch (err) {
      console.log('Error publishing session:', err);
      setStatus('Failed to publish');
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      {id && (
        <button
          onClick={() => navigate('/my-sessions')}
          className='text-green-600 mb-4 cursor-pointer'
        >
          <span className='inline-block transform -translate-y-1 '>&larr;</span>
          Back
        </button>
      )}
      <h1 className='text-2xl font-bold mb-4'>
        {id ? 'Edit' : 'Create'} Session
      </h1>

      {status && <p className='text-sm text-green-600 mb-2'>{status}</p>}

      <Input
        label='Session Title'
        name='title'
        value={form.title}
        onChange={handleChange}
        placeholder='Eg. Morning Meditation'
      />

      <Input
        label='Tags (comma-separated)'
        name='tags'
        value={form.tags}
        onChange={handleChange}
        placeholder='Eg. stretching, yoga, ...'
      />

      <Input
        label='JSON File URL'
        name='json_file_url'
        value={form.json_file_url}
        onChange={handleChange}
        placeholder='Eg. https://example.com/file.json'
      />

      <div className='flex gap-4'>
        <Button onClick={() => handleSaveDraft(false)} color='gray'>
          Save Draft
        </Button>

        <Button onClick={handlePublish} color='green'>
          Publish
        </Button>
      </div>
    </div>
  );
}

export default SessionEditor;
