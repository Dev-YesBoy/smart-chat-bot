import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you're using 'react-dom/client'
import App from './App';

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);