// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Força o scroll para o topo quando a rota mudar
    window.scrollTo(0, 0);

    // Fallback para garantir que funcione
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Remove qualquer scroll suave temporariamente para mudança de página
    document.documentElement.style.scrollBehavior = 'auto';

    // Restaura scroll suave após mudança
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
