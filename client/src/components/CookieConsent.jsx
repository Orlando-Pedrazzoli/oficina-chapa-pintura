import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { cookieConsentTranslations } from '../translations/cookieConsent';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true e desabilitado
    analytics: false,
    marketing: false
  });
  
  const { language } = useLanguage();
  const t = cookieConsentTranslations[language];

  useEffect(() => {
    // Verificar se já existe consentimento
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Pequeno delay para melhor UX
      setTimeout(() => setIsVisible(true), 1000);
    } else {
      // Carregar preferências salvas
      try {
        const saved = JSON.parse(consent);
        setPreferences(prev => ({ ...prev, ...saved }));
        applyCookiePreferences(saved);
      } catch (error) {
        console.error('Erro ao carregar preferências de cookies:', error);
      }
    }
  }, []);

  const applyCookiePreferences = (prefs) => {
    // Analytics (Google Analytics, etc)
    if (prefs.analytics) {
      // Ativar Google Analytics ou similar
      console.log('Analytics cookies enabled');
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      console.log('Analytics cookies disabled');
      // window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }

    // Marketing (Facebook Pixel, etc)
    if (prefs.marketing) {
      console.log('Marketing cookies enabled');
      // window.gtag('consent', 'update', { ad_storage: 'granted' });
    } else {
      console.log('Marketing cookies disabled');
      // window.gtag('consent', 'update', { ad_storage: 'denied' });
    }
  };

  const saveConsent = (prefs) => {
    const consentData = {
      ...prefs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    applyCookiePreferences(prefs);
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Não pode desativar cookies necessários
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="cookie-overlay" onClick={() => {}} />
      <div className="cookie-consent-container">
        <div className="cookie-consent-content">
          <div className="cookie-header">
            <h2 className="cookie-title">{t.title}</h2>
          </div>

          <p className="cookie-description">{t.description}</p>

          {!showDetails ? (
            // Vista Simplificada
            <div className="cookie-actions-simple">
              <button 
                onClick={() => setShowDetails(true)} 
                className="btn-cookie btn-customize"
              >
                {t.learnMore}
              </button>
              <button 
                onClick={handleRejectAll} 
                className="btn-cookie btn-reject"
              >
                {t.rejectAll}
              </button>
              <button 
                onClick={handleAcceptAll} 
                className="btn-cookie btn-accept"
              >
                {t.acceptAll}
              </button>
            </div>
          ) : (
            // Vista Detalhada
            <>
              <div className="cookie-options">
                {/* Cookies Necessários */}
                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <div className="cookie-option-info">
                      <h3>{t.necessary}</h3>
                      <p>{t.necessaryDesc}</p>
                    </div>
                    <label className="cookie-toggle disabled">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                {/* Cookies de Análise */}
                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <div className="cookie-option-info">
                      <h3>{t.analytics}</h3>
                      <p>{t.analyticsDesc}</p>
                    </div>
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handleToggle('analytics')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                {/* Cookies de Marketing */}
                <div className="cookie-option">
                  <div className="cookie-option-header">
                    <div className="cookie-option-info">
                      <h3>{t.marketing}</h3>
                      <p>{t.marketingDesc}</p>
                    </div>
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handleToggle('marketing')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="cookie-actions-detailed">
                <button 
                  onClick={handleRejectAll} 
                  className="btn-cookie btn-reject"
                >
                  {t.rejectAll}
                </button>
                <button 
                  onClick={handleSavePreferences} 
                  className="btn-cookie btn-save"
                >
                  {t.savePreferences}
                </button>
                <button 
                  onClick={handleAcceptAll} 
                  className="btn-cookie btn-accept"
                >
                  {t.acceptAll}
                </button>
              </div>
            </>
          )}

          <div className="cookie-footer">
            <a href="/privacy-policy" className="cookie-link" target="_blank">
              {t.privacyPolicy}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;