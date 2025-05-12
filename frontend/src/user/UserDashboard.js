import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastResultRef = useRef(null);

  const fetchResults = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/content/search', {
        params: { q: searchQuery }
      });
      console.log('API Response:', response.data);
      setResults([response.data]); // Use array to manage multiple results
    } catch (error) {
      console.error('Search failed', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchResults();
    }
  };

  useEffect(() => {
    if (lastResultRef.current) {
      lastResultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🧠 Smart AI-Like Search</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Ask something..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ flex: 1, padding: '10px', fontSize: '1rem' }}
        />
        <button onClick={fetchResults} style={{ padding: '10px 16px' }}>Search</button>
      </div>

      {loading && <p>Searching...</p>}

      <div style={{ marginTop: '2rem' }}>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div
              ref={lastResultRef}
              key={result._id || index}
              style={{
                background: '#f1f1f1',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1rem',
                maxWidth: '90%',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <p style={{ fontSize: '0.9rem', color: '#555' }}>
                <strong>{result.title || 'No title available'}</strong>
              </p>
              <p style={{ marginTop: '0.5rem' }}>{result.message || 'No message available'}</p>

              <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '8px', marginTop: '1rem' }}>
                <code>{result.function || 'No function available'}</code>
              </pre>
            </div>
          ))
        ) : (
          <div
            style={{
              background: '#fff3cd',
              borderRadius: '16px',
              padding: '1rem',
              marginTop: '1rem',
              maxWidth: '90%',
              color: '#856404',
              border: '1px solid #ffeeba',
            }}
          >
            🤖 <em>Need more information.</em>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
