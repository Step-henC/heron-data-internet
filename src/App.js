import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ChartsPage from './components/ChartsPage/ChartsPage';
import NotFound from './components/NotFound/NotFound';
import Contact from './components/Contact/Contact';

function App() {

  const [file, setFile] = useState(null) 
  const [badSamples, setBadSamples] = useState(null)

  useEffect(() => {
    if(!file) return;

    sessionStorage.setItem('file', JSON.stringify(file))
  }, [file])

  useEffect(() => {
    if(!badSamples) return;
    sessionStorage.setItem('badsamples', JSON.stringify(badSamples))
  }, [badSamples])
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage setFile={setFile} setBadSamples={setBadSamples}/>}/>
          <Route exact path='/:repNum/:allSame/charts' element={<ChartsPage file={file} />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/*' element={<NotFound/>} />
        </Routes>
      </Router>
  );
}

export default App;
