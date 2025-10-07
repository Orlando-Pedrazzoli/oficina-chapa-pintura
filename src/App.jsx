// src/App.jsx - ATUALIZADO COM LANGUAGEPROVIDER
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BudgetEstimator from './pages/BudgetEstimator';
import BudgetDetails from './pages/BudgetDetails';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className='App'>
        <ScrollToTop />
        <Navbar />
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/orcamento' element={<BudgetEstimator />} />
            <Route path='/orcamento/:carType' element={<BudgetDetails />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </LanguageProvider>
  );
}

export default App;
