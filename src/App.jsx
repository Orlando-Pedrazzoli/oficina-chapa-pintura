// src/App.jsx - PROFISSIONAL COM SCROLL CORRETO
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import Contact from './pages/Contact';

import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className='App'>
      <ScrollToTop />
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
