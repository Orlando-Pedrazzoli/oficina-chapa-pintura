// src/components/LanguageToggle.jsx
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className='language-toggle'
      onClick={toggleLanguage}
      aria-label='Alternar idioma / Toggle language'
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className='flag-icon'>
        {language === 'pt' ? (
          // Bandeira de Portugal
          <svg
            width='24'
            height='24'
            viewBox='0 0 640 480'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g fillRule='evenodd' strokeWidth='1pt'>
              <path fill='#060' d='M0 0h256v480H0z' />
              <path fill='#d80027' d='M256 0h384v480H256z' />
            </g>
            <circle
              cx='256'
              cy='240'
              r='80'
              fill='#ffce00'
              stroke='#d80027'
              strokeWidth='10'
            />
          </svg>
        ) : (
          // Bandeira do Reino Unido
          <svg
            width='24'
            height='24'
            viewBox='0 0 640 480'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path fill='#012169' d='M0 0h640v480H0z' />
            <path
              fill='#FFF'
              d='m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z'
            />
            <path
              fill='#C8102E'
              d='m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z'
            />
            <path fill='#FFF' d='M241 0v480h160V0H241zM0 160v160h640V160H0z' />
            <path fill='#C8102E' d='M0 193v96h640v-96H0zM273 0v480h96V0h-96z' />
          </svg>
        )}
      </span>
      <span className='language-code'>{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;
