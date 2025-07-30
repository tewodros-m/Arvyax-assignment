import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

function SessionEditor() {
  const { id } = useParams(); // optional session ID
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    tags: '',
    json_file_url: '',
    id: null,
  });
  const timeoutRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

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
        .catch(() => toast.error('Error loading session'));
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
    if (!silent) setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()),
      };
      const res = await api.post('/my-sessions/save-draft', payload);
      setForm((f) => ({ ...f, id: res.data._id }));
      if (!silent) toast.success('Draft saved successfully!');
    } catch (err) {
      console.error('Error saving draft:', err);
      if (!silent) toast.error('Failed to save draft session');
    } finally {
      if (!silent) setSaving(false);
    }
  };

  // const handlePublish = async () => {
  const handlePublish = async () => {
    setPublishing(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((tag) => tag.trim()),
      };
      await api.post('/my-sessions/publish', payload);
      toast.success('Session published successfully!');
      navigate('/my-sessions');
    } catch (err) {
      console.log('Error publishing session:', err);
      toast.error('Failed to publish session');
    } finally {
      setPublishing(false);
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
        <Button
          onClick={() => handleSaveDraft(false)}
          color='gray'
          isLoading={saving}
          disabled={!form.title || !form.json_file_url || !form.tags}
        >
          Save Draft
        </Button>

        <Button
          onClick={handlePublish}
          color='green'
          isLoading={publishing}
          disabled={!form.title || !form.json_file_url || !form.tags}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}

export default SessionEditor;
