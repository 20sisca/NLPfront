import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Detail = () => {
  const { fileName } = useParams();
  const location = useLocation();
  const fileData = location.state?.fileContent;
  const [responseMessage, setResponseMessage] = useState(null);
  // Function to highlight names in the text
  const highlightNames = (text, names) => {
    return names.reduce((highlightedText, name) => {
      const regex = new RegExp(`\\b${name}\\b`, 'gi'); // Match whole word, case-insensitive
      return highlightedText.replace(regex, `<span class="highlight">${name}</span>`);
    }, text);
  };
  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/process_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain', // Set the content type to text/plain
        },
        body: fileData,
      });

      const responseData = await response.json();
      setResponseMessage(responseData.result);
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };

  return (
    <div className="detail-container">
      <header className="detail-header">
        <h1>Detail</h1>
      </header>
      <div className="file-content">
        <strong>File Name:</strong> {fileName}
      </div>
      <div className="file-data">
        <strong>File Content:</strong>
        <pre>{fileData}</pre>
      </div>
      <div className="action-button-container">
        <button className="action-button" onClick={handleButtonClick}>
          Click me for action
        </button>
      </div>
      {responseMessage && (
        <div className="response-message">
          <strong>Response:</strong> {responseMessage.map(name => <li key={name}>{name}</li>)}
          <div
            className="file-data"
            dangerouslySetInnerHTML={{ __html: highlightNames(fileData, responseMessage) }}
          />

        </div>

      )}    </div>
  );
};

export default Detail;

