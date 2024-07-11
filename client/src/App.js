import logo from './logo.svg';
import './App.css';

import Home from './screen/JS/home';
import Inventaire from './screen/JS/inventaire';
import Ajouter from './screen/JS/Inventaire/Ajouter';
import Televerser from './screen/JS/Inventaire/Televerser';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inventaire" element={<Inventaire />} />
        <Route path="/Inventaire/Ajouter" element={<Ajouter />} />
        <Route path="/Inventaire/Televerser" element={<Televerser />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
}

export default App;
