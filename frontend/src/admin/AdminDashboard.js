import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [contents, setContents] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    function: '',
    recommend: false,
  });

  const fetchContents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/content');
      setContents(response.data);
    } catch (err) {
      console.error('Failed to fetch content', err);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`http://localhost:4000/api/content/${editingItem.id}`, formData);
      } else {
        await axios.post('http://localhost:4000/api/content', formData);
      }
      setFormData({ title: '', message: '', function: '', recommend: false });
      setEditingItem(null);
      fetchContents();
    } catch (err) {
      console.error('Error saving content:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/content/${id}`);
      fetchContents();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>📋 Admin Dashboard</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <textarea
          name="function"
          placeholder="Function"
          value={formData.function_field}
          onChange={handleChange}
          rows={4}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />

        <button type="submit" style={{ padding: '10px 16px' }}>
          {editingItem ? 'Update' : 'Add'} Content
        </button>
      </form>

      <div>
        {contents.map((item) => (
          <div key={item.id} style={{ background: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h4>{item.title}</h4>
            <p>{item.message}</p>
            <pre style={{ background: '#eee', padding: '8px', borderRadius: '6px' }}>
              <code>{item.function_field}</code>
            </pre>
            
            <button onClick={() => handleEdit(item)} style={{ marginRight: '8px' }}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}


export default AdminDashboard;
