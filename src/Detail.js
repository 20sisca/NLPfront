// src/App.js
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
// import marked from 'marked';  // Import marked library

const FILES_LIST = [
  "/ccass/311018_1684574_1_CC.md",
  "/ccass/311018_1684550_1_CC.md",
  "/ccass/311018_1684551_1_CC.md",
  "/ccass/311018_1684552_1_CC.md"
];

export default function Detail() {

  const { fileName } = useParams();
  const location = useLocation();
  const fileData = location.state?.fileContent
  console.log('------', fileData)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Detail </h1>
        <div>{fileData}</div>
      </header>
    </div>
  );
}


