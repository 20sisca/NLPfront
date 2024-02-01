import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Detail = () => {
  const { fileName } = useParams();
  const location = useLocation();
  const fileData = location.state?.fileContent;
  const [responseMessage, setResponseMessage] = useState(null);
  const [anonymizedText, setAnonymizedText] = useState(null);
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

  // Function to anonymize names in the text
  const anonymizeNames = (text, names) => {
    let anonymizedText = text;
    names.forEach((name) => {
      const regex = new RegExp(`\\b${name.replace(/\./g, '\\.')}\\b`, 'gi');
      anonymizedText = anonymizedText.replace(regex, anonymizeSingleName(name));
    });
    return anonymizedText;
  };

  // Function to anonymize a single name
  const anonymizeSingleName = (name) => {
    // Anonymize the name while keeping the first letter
    const firstLetter = name[0];
    // const restOfName = '[D]'.repeat(name.length - 1);
    return `[${firstLetter}]`;
  };

  // Handler for the anonymize button
  const handleAnonymizeButtonClick = () => {
    // Anonymize names in the text based on responseMessage
    const anonymizedText = anonymizeNames(fileData, responseMessage);
    setAnonymizedText(anonymizedText);
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
          Trouver les protagonistes
        </button>
      </div>
      {responseMessage && (
        <div className="response-message">
          <strong>Response:</strong> {responseMessage.map(name => <li key={name}>{name}</li>)}
          <div
            className="file-data"
            dangerouslySetInnerHTML={{ __html: highlightNames(fileData, responseMessage) }}
          />

          <div className="action-button-container">
            <button className="action-button" onClick={handleAnonymizeButtonClick}>
              Anonymiser le texte
            </button>
          </div>
          {anonymizedText}
        </div>

      )}    </div>
  );
};

export default Detail;

