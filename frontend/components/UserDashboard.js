import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // const typeText = async (text, callback) => {
  //   let index = 0;
  //   let typed = '';
  //   const interval = setInterval(() => {
  //     typed += text[index];
  //     callback(typed);
  //     index++;
  //     if (index >= text.length) clearInterval(interval);
  //   }, 20);
  // };

  const handleSearch = async () => {
    if (!input.trim()) return;
  
    const userMessage = { type: 'user', text: input };
    setChatLog(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
  
    const botPlaceholder = { type: 'bot', text: 'Loading ...' };
    setChatLog(prev => [...prev, botPlaceholder]);
  
    try {
      const response = await axios.get('http://localhost:4000/api/content/search', {
        params: { q: input }
      });
  
      const result = response.data;
      let finalBotText = '';

      if (result) {
        const intros = [
          "Here's something that might help:",
          "Take a look at this:",
          "This might answer your question:",
          "Here's a useful snippet:",
          "Let me explain:"
        ];

        const intro = intros[Math.floor(Math.random() * intros.length)];
        const title = result.title ? `<strong>${result.title}</strong><br/>` : '';
        const message = result.message ? `<div class="content-ms">${result.message}</div><br/>` : '';
        const func = result.function_field ? `<pre><code>${result.function_field}</code></pre>` : '';

        // finalBotText = `${intro}<br/>${title}${message}${func}`;
        finalBotText = `${title}${message}${func}`;
      } else {
        finalBotText = '🤖 I couldn’t find anything matching that. Try rephrasing your question!';
      }
  
      // Add delay before typing starts
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Remove placeholder
      setChatLog(prev => prev.slice(0, -1));
  
      // Add an empty bot message
      setChatLog(prev => [...prev, { type: 'bot', text: '' }]);
  
      // Simulate typing effect with rich HTML content
      let index = 0;
      const typingSpeed = 10;
      const interval = setInterval(() => {
        index += 1;
        setChatLog(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = finalBotText.slice(0, index);
          return [...updated];
        });
        if (index >= finalBotText.length) {
          clearInterval(interval);
        }
      }, typingSpeed);
  
    } catch (err) {
      console.error('Search failed:', err);
      setChatLog(prev => [...prev.slice(0, -1), { type: 'bot', text: '🤖 Something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🤖 Smart Chat Bot</h2>

      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        minHeight: '400px',
        background: '#f9f9f9',
        overflowY: 'auto',
        maxHeight: '500px'
      }}>
        {chatLog.map((chat, index) => {
          const codeBlocks = [];
          const htmlParts = chat.text.split(/<pre><code>|<\/code><\/pre>/g);

          htmlParts.forEach((part, i) => {
            if (i % 2 === 1) {
              codeBlocks.push(part);
            }
          });

          return (
            <div
              key={index}
              style={{
                textAlign: chat.type === 'user' ? 'right' : 'left',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  background: chat.type === 'user' ? '#007bff' : '#f0f0f0',
                  color: chat.type === 'user' ? '#fff' : '#000',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {/* Message with inner HTML rendering (from WYSIWYG) */}
                <div
                  dangerouslySetInnerHTML={{ __html: htmlParts[0] }}
                  style={{ marginBottom: codeBlocks.length > 0 ? '10px' : '0' }}
                />

                {/* Render each code block with copy button */}
                {codeBlocks.map((codeText, i) => (
                  <div key={i} style={{ position: 'relative', marginTop: '10px' }}>
                    <pre
                      style={{
                        background: '#eee',
                        padding: '10px',
                        borderRadius: '8px',
                        overflowX: 'auto',
                      }}
                    >
                      <code>{codeText}</code>
                    </pre>
                    <button
                      onClick={() => handleCopy(codeText)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        fontSize: '12px',
                        padding: '2px 6px',
                        cursor: 'pointer',
                      }}
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div ref={chatEndRef}></div>
      </div>

      <div style={{ display: 'flex', marginTop: '1rem', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ flex: 1, padding: '10px', fontSize: '1rem' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px 16px' }}>Send</button>
      </div>

      {loading && <p style={{ marginTop: '1rem' }}>Typing...</p>}
    </div>
  );
}

export default UserDashboard;
