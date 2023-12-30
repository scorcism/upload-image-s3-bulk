import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      await axios.post('http://localhost:3000/api/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" name="images" onChange={handleFileChange} multiple />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default App;
