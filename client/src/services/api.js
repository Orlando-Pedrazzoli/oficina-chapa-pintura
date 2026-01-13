// src/services/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper para requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.json();
};

// ============================================
// PREÇOS DAS PEÇAS - /api/part-prices
// ============================================
export const partPricesAPI = {
  // Público - lista preços
  getAll: () => request('/part-prices'),
  
  // Admin - lista todos
  getAllAdmin: () => request('/part-prices/admin'),
  
  // Admin - atualizar preço
  update: (id, data) => request(`/part-prices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// ============================================
// SERVIÇOS - /api/services
// ============================================
export const servicesAPI = {
  // Público - lista serviços ativos
  getAll: () => request('/services'),
  
  // Admin - lista todos (incluindo inativos)
  getAllAdmin: () => request('/services/admin'),
  
  // Admin - criar serviço
  create: (data) => request('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Admin - atualizar serviço
  update: (id, data) => request(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Admin - eliminar serviço
  delete: (id) => request(`/services/${id}`, {
    method: 'DELETE',
  }),
  
  // Admin - reordenar serviços
  reorder: (serviceIds) => request('/services/reorder', {
    method: 'POST',
    body: JSON.stringify({ serviceIds }),
  }),
};

// ============================================
// CONTEÚDO DO SITE - /api/site-content
// ============================================
export const siteContentAPI = {
  // Público - busca todo conteúdo
  getAll: () => request('/site-content'),
  
  // Público - busca por secção
  getBySection: (section) => request(`/site-content/${section}`),
  
  // Admin - lista tudo
  getAllAdmin: () => request('/site-content/admin'),
  
  // Admin - criar/atualizar conteúdo (upsert)
  upsert: (data) => request('/site-content/upsert', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Admin - atualizar por ID
  update: (id, data) => request(`/site-content/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// ============================================
// AUTENTICAÇÃO - /api/auth
// ============================================
export const authAPI = {
  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  verify: () => request('/auth/verify'),
};

// ============================================
// HEALTH CHECK
// ============================================
export const healthAPI = {
  check: () => request('/health'),
};

export default {
  partPricesAPI,
  servicesAPI,
  siteContentAPI,
  authAPI,
  healthAPI,
};