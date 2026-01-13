// src/hooks/useSiteContent.js
import { useState, useEffect } from 'react';
import { siteContentAPI, partPricesAPI, servicesAPI } from '../services/api';

/**
 * Hook para buscar conteúdo do site (contactos, about, etc)
 */
export const useSiteContent = (section = null) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await siteContentAPI.getAll();
      
      if (section) {
        setContent(data[section] || {});
      } else {
        setContent(data);
      }
    } catch (err) {
      console.error('Erro ao buscar conteúdo:', err);
      setError(err.message);
      setContent({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [section]);

  return { content, loading, error, refetch: fetchContent };
};

/**
 * Hook para buscar preços das peças
 */
export const usePartPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await partPricesAPI.getAll();
      setPrices(data);
    } catch (err) {
      console.error('Erro ao buscar preços:', err);
      setError(err.message);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const getPriceById = (partId) => {
    return prices.find(p => p.partId === partId);
  };

  return { prices, loading, error, refetch: fetchPrices, getPriceById };
};

/**
 * Hook para buscar serviços
 */
export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await servicesAPI.getAll();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao buscar serviços:', err);
      setError(err.message);
      setServices([]); // Retorna array vazio para fallback funcionar
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, loading, error, refetch: fetchServices };
};

export default useSiteContent;