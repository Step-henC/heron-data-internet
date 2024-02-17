import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ChartsPage from './components/ChartsPage/ChartsPage';
import NotFound from './components/NotFound/NotFound';
import Contact from './components/Contact/Contact';
import ContactSuccess from './components/Contact/ContactSuccess';
import ContactError from './components/Contact/ContactError';

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
          <Route exact path='/contact/success' element={<ContactSuccess />} />
          <Route exact path='/contact/error' element={<ContactError />} />
          <Route exact path='/*' element={<NotFound/>} />
        </Routes>
      </Router>
  );
}

export default App;
