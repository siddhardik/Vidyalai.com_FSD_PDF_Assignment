import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onFileUpload(response.data.message);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload PDF
      </button>
    </div>
  );
}

export default FileUpload;
