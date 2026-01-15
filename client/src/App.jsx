import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CookieConsent from './components/CookieConsent'; // ADICIONAR

// Pages
import Homepage from './pages/Homepage';
import Services from './pages/Services';
import Contact from './pages/Contact';
import BudgetEstimator from './pages/BudgetEstimator';
import BudgetDetails from './pages/BudgetDetails';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - Sem Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Public Routes - Com Navbar/Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/orcamento" element={<BudgetEstimator />} />
                <Route path="/orcamento/:carType" element={<BudgetDetails />} />
              </Routes>
              <Footer />
              <FloatingButtons />
              <CookieConsent /> {/* ADICIONAR AQUI */}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;