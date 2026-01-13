// src/pages/Admin/Dashboard.jsx - VERSÃO COMPLETA
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { partPricesAPI, siteContentAPI, servicesAPI, healthAPI } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('prices');
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    checkApiStatus();
  }, [token, navigate]);

  const checkApiStatus = async () => {
    try {
      const status = await healthAPI.check();
      setApiStatus(status);
    } catch (error) {
      setApiStatus({ status: 'ERROR', message: 'API offline' });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Conectando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🔧 Street Paint</h1>
          <span className={`api-status ${apiStatus?.status === 'OK' ? 'online' : 'offline'}`}>
            {apiStatus?.status === 'OK' ? '🟢 Online' : '🔴 Offline'}
          </span>
        </div>
        <div className="header-right">
          <a href="/" className="btn-site" target="_blank" rel="noopener noreferrer">
            🌐 Ver Site
          </a>
          <button onClick={logout} className="btn-logout">Sair</button>
        </div>
      </header>

      <nav className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'prices' ? 'active' : ''}`}
          onClick={() => setActiveTab('prices')}
        >
          💰 Preços
        </button>
        <button 
          className={`tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          🔧 Serviços
        </button>
        <button 
          className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          📞 Contactos
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'prices' && <PricesTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'contacts' && <ContactsTab />}
      </main>
    </div>
  );
};

// ============================================
// TAB: PREÇOS DAS PEÇAS
// ============================================
const PricesTab = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ paint: 0, paintAndDent: 0 });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const data = await partPricesAPI.getAllAdmin();
      setPrices(data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (price) => {
    setEditingId(price._id);
    setEditValues({
      paint: price.prices.paint,
      paintAndDent: price.prices.paintAndDent
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ paint: 0, paintAndDent: 0 });
  };

  const savePrice = async (id) => {
    setSaving(id);
    try {
      await partPricesAPI.update(id, {
        prices: {
          paint: Number(editValues.paint),
          paintAndDent: Number(editValues.paintAndDent)
        }
      });
      await fetchPrices();
      setEditingId(null);
      setSuccessMessage('Preço atualizado!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert('Erro ao salvar preço');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <div className="tab-loading"><div className="spinner-small"></div><p>Carregando...</p></div>;
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>💰 Preços das Peças</h2>
        <p className="tab-description">Atualize os preços do calculador de orçamento</p>
      </div>

      {successMessage && <div className="success-message">✅ {successMessage}</div>}

      <div className="prices-grid">
        {prices.map(price => (
          <div key={price._id} className={`price-card ${editingId === price._id ? 'editing' : ''}`}>
            <div className="price-card-header">
              <h3>{price.name?.pt}</h3>
              <small>{price.name?.en}</small>
            </div>

            {editingId === price._id ? (
              <div className="price-edit-form">
                <div className="price-input-group">
                  <label>🎨 Só Pintura</label>
                  <div className="input-with-euro">
                    <span>€</span>
                    <input type="number" value={editValues.paint} onChange={(e) => setEditValues({...editValues, paint: e.target.value})} min="0" />
                  </div>
                </div>
                <div className="price-input-group">
                  <label>🔧 Pintura + Chapa</label>
                  <div className="input-with-euro">
                    <span>€</span>
                    <input type="number" value={editValues.paintAndDent} onChange={(e) => setEditValues({...editValues, paintAndDent: e.target.value})} min="0" />
                  </div>
                </div>
                <div className="price-edit-actions">
                  <button onClick={() => savePrice(price._id)} className="btn-save" disabled={saving === price._id}>
                    {saving === price._id ? 'Salvando...' : '✓ Salvar'}
                  </button>
                  <button onClick={cancelEdit} className="btn-cancel">✕ Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="price-display">
                <div className="price-row"><span>🎨 Só Pintura</span><strong>€{price.prices.paint}</strong></div>
                <div className="price-row"><span>🔧 Pintura + Chapa</span><strong>€{price.prices.paintAndDent}</strong></div>
                <button onClick={() => startEdit(price)} className="btn-edit">✏️ Editar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// TAB: SERVIÇOS (9 SERVIÇOS)
// ============================================
const ServicesTab = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesAPI.getAllAdmin();
      // Ordenar por order
      const sorted = Array.isArray(data) ? data.sort((a, b) => (a.order || 0) - (b.order || 0)) : [];
      setServices(sorted);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setEditData({
      title_pt: service.title?.pt || '',
      title_en: service.title?.en || '',
      description_pt: service.description?.pt || '',
      description_en: service.description?.en || '',
      details_pt: (service.details?.pt || []).join('\n'),
      details_en: (service.details?.en || []).join('\n'),
      icon: service.icon || '',
      active: service.active !== false,
      order: service.order || 0,
    });
  };

  const cancelEdit = () => { 
    setEditingId(null); 
    setEditData(null); 
  };

  const saveService = async () => {
    setSaving(true);
    try {
      await servicesAPI.update(editingId, {
        title: { pt: editData.title_pt, en: editData.title_en },
        description: { pt: editData.description_pt, en: editData.description_en },
        details: {
          pt: editData.details_pt.split('\n').filter(d => d.trim()),
          en: editData.details_en.split('\n').filter(d => d.trim()),
        },
        icon: editData.icon,
        active: editData.active,
        order: Number(editData.order) || 0,
      });
      await fetchServices();
      setEditingId(null);
      setEditData(null);
      setSuccessMessage('Serviço atualizado!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert('Erro ao salvar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="tab-loading"><div className="spinner-small"></div><p>Carregando serviços...</p></div>;
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>🔧 Serviços ({services.length})</h2>
        <p className="tab-description">Edite os serviços que aparecem na página /services</p>
      </div>

      {successMessage && <div className="success-message">✅ {successMessage}</div>}

      <div className="services-admin-grid">
        {services.map(service => (
          <div key={service._id} className={`service-admin-card ${editingId === service._id ? 'editing' : ''}`}>
            {editingId === service._id ? (
              // MODO EDIÇÃO
              <div className="service-edit-form">
                <div className="form-section">
                  <h4>🇵🇹 Português</h4>
                  <div className="form-group">
                    <label>Título</label>
                    <input 
                      type="text" 
                      value={editData.title_pt} 
                      onChange={(e) => setEditData({...editData, title_pt: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea 
                      value={editData.description_pt} 
                      onChange={(e) => setEditData({...editData, description_pt: e.target.value})} 
                      rows={3} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Detalhes (um por linha)</label>
                    <textarea 
                      value={editData.details_pt} 
                      onChange={(e) => setEditData({...editData, details_pt: e.target.value})} 
                      rows={5}
                      placeholder="Detalhe 1&#10;Detalhe 2&#10;Detalhe 3"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4>🇬🇧 English</h4>
                  <div className="form-group">
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={editData.title_en} 
                      onChange={(e) => setEditData({...editData, title_en: e.target.value})} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      value={editData.description_en} 
                      onChange={(e) => setEditData({...editData, description_en: e.target.value})} 
                      rows={3} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Details (one per line)</label>
                    <textarea 
                      value={editData.details_en} 
                      onChange={(e) => setEditData({...editData, details_en: e.target.value})} 
                      rows={5}
                      placeholder="Detail 1&#10;Detail 2&#10;Detail 3"
                    />
                  </div>
                </div>

                <div className="form-section form-section-config">
                  <h4>⚙️ Configurações</h4>
                  <div className="config-grid">
                    <div className="form-group">
                      <label>Ícone (caminho da imagem)</label>
                      <input 
                        type="text" 
                        value={editData.icon} 
                        onChange={(e) => setEditData({...editData, icon: e.target.value})} 
                        placeholder="/chapa.png"
                      />
                      <small>Ex: /chapa.png, /martelinho.jpg</small>
                    </div>
                    <div className="form-group">
                      <label>Ordem (0 = primeiro)</label>
                      <input 
                        type="number" 
                        value={editData.order} 
                        onChange={(e) => setEditData({...editData, order: e.target.value})} 
                        min="0"
                      />
                    </div>
                    <div className="form-group checkbox-group">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={editData.active} 
                          onChange={(e) => setEditData({...editData, active: e.target.checked})} 
                        />
                        Serviço ativo (visível no site)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="service-edit-actions">
                  <button onClick={saveService} className="btn-save-service" disabled={saving}>
                    {saving ? '⏳ Salvando...' : '💾 Salvar Alterações'}
                  </button>
                  <button onClick={cancelEdit} className="btn-cancel-service">
                    ✕ Cancelar
                  </button>
                </div>
              </div>
            ) : (
              // MODO VISUALIZAÇÃO
              <>
                <div className="service-admin-header">
                  <div className="service-icon-preview">
                    {service.icon?.startsWith('/') ? (
                      <img src={service.icon} alt="" />
                    ) : (
                      <span>{service.icon || '🔧'}</span>
                    )}
                  </div>
                  <div className="service-badges">
                    <span className="order-badge">#{service.order + 1}</span>
                    <span className={`status-badge ${service.active !== false ? 'active' : 'inactive'}`}>
                      {service.active !== false ? '✓ Ativo' : '✕ Inativo'}
                    </span>
                  </div>
                </div>
                
                <h3>{service.title?.pt}</h3>
                <p className="service-title-en">{service.title?.en}</p>
                <p className="service-desc-preview">{service.description?.pt}</p>
                
                <div className="service-details-preview">
                  {(service.details?.pt || []).slice(0, 3).map((detail, i) => (
                    <span key={i} className="detail-tag">✓ {detail}</span>
                  ))}
                  {(service.details?.pt || []).length > 3 && (
                    <span className="detail-more">+{service.details.pt.length - 3} mais</span>
                  )}
                </div>

                <button onClick={() => startEdit(service)} className="btn-edit-service">
                  ✏️ Editar Serviço
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="info-box">
        <h4>💡 Dicas</h4>
        <ul>
          <li><strong>Ordem:</strong> Define a posição do serviço na página (0 = primeiro)</li>
          <li><strong>Ativo:</strong> Serviços inativos não aparecem no site</li>
          <li><strong>Ícone:</strong> Use o caminho da imagem na pasta public (ex: /chapa.png)</li>
          <li><strong>Detalhes:</strong> Escreva um por linha, aparecem como lista no site</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// TAB: CONTACTOS E HORÁRIOS
// ============================================
const ContactsTab = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    whatsapp: '',
    address: '',
    schedule: '',
    weekdayHours: '',
    saturdayHours: ''
  });

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      const data = await siteContentAPI.getAllAdmin();
      const contactData = {};
      data.forEach(item => {
        if (item.section === 'contact') {
          const key = item.key.replace('contact_', '');
          const value = item.content?.pt || item.content || '';
          contactData[key] = value;
        }
      });
      
      setFormData({
        phone: contactData.phone || '+351 960 172 705',
        email: contactData.email || 'info@streetpaint.pt',
        whatsapp: contactData.whatsapp || '351960172705',
        address: contactData.address || '',
        schedule: contactData.schedule || 'Seg-Sex: 9h-18h',
        weekdayHours: contactData.weekday_hours || '09:00 - 18:00',
        saturdayHours: contactData.saturday_hours || 'Encerrado'
      });
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await Promise.all([
        siteContentAPI.upsert({ key: 'contact_phone', section: 'contact', content: { pt: formData.phone, en: formData.phone } }),
        siteContentAPI.upsert({ key: 'contact_email', section: 'contact', content: { pt: formData.email, en: formData.email } }),
        siteContentAPI.upsert({ key: 'contact_whatsapp', section: 'contact', content: { pt: formData.whatsapp, en: formData.whatsapp } }),
        siteContentAPI.upsert({ key: 'contact_address', section: 'contact', content: { pt: formData.address, en: formData.address } }),
        siteContentAPI.upsert({ key: 'contact_schedule', section: 'contact', content: { pt: formData.schedule, en: formData.schedule } }),
        siteContentAPI.upsert({ key: 'contact_weekday_hours', section: 'contact', content: { pt: formData.weekdayHours, en: formData.weekdayHours } }),
        siteContentAPI.upsert({ key: 'contact_saturday_hours', section: 'contact', content: { pt: formData.saturdayHours, en: formData.saturdayHours } }),
      ]);
      
      setSuccessMessage('Dados atualizados com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="tab-loading"><div className="spinner-small"></div><p>Carregando...</p></div>;
  }

  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>📞 Contactos e Horários</h2>
        <p className="tab-description">Informações que aparecem em todo o site</p>
      </div>

      {successMessage && <div className="success-message">✅ {successMessage}</div>}

      <form onSubmit={handleSave} className="contacts-form">
        {/* CONTACTOS */}
        <div className="form-section-title">📱 Contactos</div>
        <div className="contact-card">
          <div className="contact-field">
            <label><span className="field-icon">📞</span> Telefone</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+351 960 172 705" />
          </div>

          <div className="contact-field">
            <label><span className="field-icon">💬</span> WhatsApp (só números)</label>
            <input type="text" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value.replace(/\D/g, '')})} placeholder="351960172705" />
            <small>Sem espaços. Ex: 351960172705</small>
          </div>

          <div className="contact-field">
            <label><span className="field-icon">✉️</span> Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="contact-field">
            <label><span className="field-icon">📍</span> Morada</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Rua da Oficina, 123, Sintra" />
          </div>
        </div>

        {/* HORÁRIOS */}
        <div className="form-section-title">🕐 Horários de Funcionamento</div>
        <div className="contact-card">
          <div className="contact-field">
            <label><span className="field-icon">📅</span> Resumo (ex: "Seg-Sex: 9h-18h")</label>
            <input type="text" value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})} placeholder="Seg-Sex: 9h-18h" />
            <small>Aparece no footer e orçamento</small>
          </div>

          <div className="contact-field">
            <label><span className="field-icon">🏢</span> Horário Dias Úteis (Segunda a Sexta)</label>
            <input type="text" value={formData.weekdayHours} onChange={(e) => setFormData({...formData, weekdayHours: e.target.value})} placeholder="09:00 - 18:00" />
            <small>Formato: 09:00 - 18:00</small>
          </div>

          <div className="contact-field">
            <label><span className="field-icon">🛋️</span> Horário Sábado</label>
            <input type="text" value={formData.saturdayHours} onChange={(e) => setFormData({...formData, saturdayHours: e.target.value})} placeholder="Encerrado ou 09:00 - 13:00" />
            <small>Escreva "Encerrado" se fechado</small>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save-all" disabled={saving}>
            {saving ? 'Salvando...' : '💾 Salvar Tudo'}
          </button>
        </div>
      </form>

      <div className="info-box">
        <h4>ℹ️ Onde aparecem estes dados?</h4>
        <ul>
          <li><strong>Telefone/WhatsApp:</strong> Footer, Contactos, Orçamento, Botões flutuantes</li>
          <li><strong>Morada:</strong> Footer, Página de Contacto, Localização</li>
          <li><strong>Horários:</strong> Localização (homepage), Footer, Orçamento</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;