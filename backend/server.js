const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Connect to MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // change if needed
  database: 'ai_chat_app',
};

// Get all content
app.get('/api/content', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT * FROM content ORDER BY createdAt DESC');
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Smart search (match by prompt field)
app.get('/api/content/search', async (req, res) => {
  const { q = '' } = req.query;
  if (!q) return res.json(null);

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT * FROM content ORDER BY createdAt DESC');
    await conn.end();

    // Search by matching `q` to prompts
    const matched = rows.find(item => {
      if (!item.prompts) return false;
      try {
        const prompts = JSON.parse(item.prompts);
        return prompts.some(p => p.toLowerCase().trim() === q.toLowerCase().trim());
      } catch (e) {
        console.warn('Invalid JSON in prompts for item:', item.id);
        return false;
      }
    });

    if (matched) {
      return res.json(matched);
    } else {
      return res.json({ message: "Sorry, I did not understand." });
    }
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search error' });
  }
});


// Add new content
app.post('/api/content', async (req, res) => {
  // const { title, message, function: func } = req.body;
  const { title, message, function_field, prompts } = req.body;

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(
      `INSERT INTO content (title, message, function_field, prompts) VALUES (?, ?, ?, ?)`,
      [title, message, function_field, prompts || null]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, title, message, function_field, prompts });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Insert error' });
  }
});

// Update content
app.put('/api/content/:id', async (req, res) => {
  const { id } = req.params;
  const { title, message, function_field, prompts } = req.body;

  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute(
      `UPDATE content SET title = ?, message = ?, function_field = ?, prompts = ? WHERE id = ?`,
      [title, message, function_field || '', prompts || null, id]
    );
    await conn.end();
    res.json({ success: true });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete content
app.delete('/api/content/:id', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('DELETE FROM content WHERE id=?', [req.params.id]);
    await conn.end();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ MySQL server running at http://localhost:${PORT}`);
});
