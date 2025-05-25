'use client';
import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';

// Dynamically import react-quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function SafeQuill({ value, onChange }) {
  const quillRef = useRef(null);

  useEffect(() => {
    // No need for findDOMNode; this just ensures ref exists
    if (quillRef.current) {
      // You can access editor instance here if needed
      // const editor = quillRef.current.getEditor();
    }
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}
