// src/App.jsx - NAVBAR TRANSPARENTE EM TODAS AS PÁGINAS
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}

export default App;
