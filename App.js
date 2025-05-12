import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ message: '' });

  const fetchData = async () => {
    const res = await axios.get('http://localhost:4000/api/content');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editItem) {
      await axios.put(`http://localhost:4000/api/content/${editItem._id}`, form);
      setEditItem(null);
    } else {
      await axios.post('http://localhost:4000/api/content', form);
    }
    setForm({ message: '' });
    fetchData();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm({ message: item.message });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/content/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows="3"
          style={{ width: '100%' }}
        />
        <button type="submit">{editItem ? 'Update' : 'Add New'}</button>
      </form>

      <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Message</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item._id}>
              <td>{idx + 1}</td>
              <td>{item.message}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
