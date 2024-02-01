import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const FILES_LIST = [
  "311018_1684574_1_CC",
  "311018_1684550_1_CC",
  "311018_1684551_1_CC",
  "311018_1684552_1_CC"
];

export default function Home() {
  const [fileData, setFileData] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (fileName) => {
    // console.log('Button clicked for:', fileName, fileData, fileData[fileName]);
    navigate(`/detail/${fileName}`, { state: { fileContent: fileData[fileName] } });
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const promises = FILES_LIST.map(async (fileName) => {
          const response = await fetch("/ccass/" + fileName + ".md");
          const textContent = await response.text();
          console.log(textContent);  // Log the resolved text content
          return { fileName: fileName, textContent };
        });

        const fileContents = await Promise.all(promises);

        const transformedObject = fileContents.reduce((acc, { fileName, textContent }) => {
          acc[fileName] = textContent;
          return acc;
        }, {});

        setFileData(transformedObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown Files Viewer</h1>
        <ul>
          {Object.keys(fileData).map((fileName, index) => (
            <li key={index}>
              <button onClick={() => handleButtonClick(fileName)}>
                <div>
                  {fileName}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

