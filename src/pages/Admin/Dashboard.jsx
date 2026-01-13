import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Não autorizado');
      
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Erro:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (serviceData) => {
    try {
      const url = editingService
        ? `http://localhost:5000/api/services/${editingService._id}`
        : 'http://localhost:5000/api/services';
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceData)
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      await fetchServices();
      setShowForm(false);
      setEditingService(null);
    } catch (error) {
      alert('Erro ao salvar serviço');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este serviço?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Erro ao deletar');

      await fetchServices();
    } catch (error) {
      alert('Erro ao deletar serviço');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🔧 Painel de Administração - Street Paint</h1>
        <div className="header-actions">
          <button onClick={() => { setShowForm(true); setEditingService(null); }} className="btn-add">
            + Novo Serviço
          </button>
          <button onClick={logout} className="btn-logout">Sair</button>
        </div>
      </header>

      <div className="services-grid">
        {services.map(service => (
          <div key={service._id} className="service-card">
            <div className="service-header">
              <h3>{service.title?.pt || 'Sem título'}</h3>
              <span className={`status ${service.active ? 'active' : 'inactive'}`}>
                {service.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            {service.icon && (
              <img 
                src={`http://localhost:5000${service.icon}`} 
                alt={service.title?.pt}
                className="service-icon"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <p className="service-description">{service.description?.pt || 'Sem descrição'}</p>
            <div className="service-details">
              <strong>Detalhes:</strong>
              <ul>
                {service.details?.pt?.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="service-actions">
              <button onClick={() => { setEditingService(service); setShowForm(true); }} className="btn-edit">
                Editar
              </button>
              <button onClick={() => handleDelete(service._id)} className="btn-delete">
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingService(null); }}
          token={token}
        />
      )}
    </div>
  );
};

const ServiceForm = ({ service, onSave, onCancel, token }) => {
  const [formData, setFormData] = useState(service || {
    title: { pt: '', en: '' },
    description: { pt: '', en: '' },
    details: { pt: [''], en: [''] },
    icon: '',
    order: 0,
    active: true
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataImg
      });

      if (!response.ok) throw new Error('Erro no upload');

      const data = await response.json();
      setFormData({...formData, icon: data.url});
    } catch (error) {
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddDetail = (lang) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [lang]: [...formData.details[lang], '']
      }
    });
  };

  const handleDetailChange = (lang, index, value) => {
    const newDetails = [...formData.details[lang]];
    newDetails[index] = value;
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [lang]: newDetails
      }
    });
  };

  const handleRemoveDetail = (lang, index) => {
    const newDetails = formData.details[lang].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [lang]: newDetails
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{service ? 'Editar Serviço' : 'Novo Serviço'}</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Imagem/Ícone */}
          <div className="form-group">
            <label>Ícone do Serviço</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
            {uploadingImage && <p>Fazendo upload...</p>}
            {formData.icon && (
              <img 
                src={`http://localhost:5000${formData.icon}`} 
                alt="Preview" 
                style={{width: '100px', marginTop: '10px'}}
              />
            )}
          </div>

          {/* Títulos */}
          <div className="form-row">
            <div className="form-group">
              <label>Título (PT)</label>
              <input
                type="text"
                value={formData.title.pt}
                onChange={(e) => setFormData({...formData, title: {...formData.title, pt: e.target.value}})}
                required
              />
            </div>
            <div className="form-group">
              <label>Title (EN)</label>
              <input
                type="text"
                value={formData.title.en}
                onChange={(e) => setFormData({...formData, title: {...formData.title, en: e.target.value}})}
                required
              />
            </div>
          </div>

          {/* Descrições */}
          <div className="form-row">
            <div className="form-group">
              <label>Descrição (PT)</label>
              <textarea
                value={formData.description.pt}
                onChange={(e) => setFormData({...formData, description: {...formData.description, pt: e.target.value}})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description (EN)</label>
              <textarea
                value={formData.description.en}
                onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})}
                required
              />
            </div>
          </div>

          {/* Detalhes PT */}
          <div className="form-group">
            <label>Detalhes (PT)</label>
            {formData.details.pt.map((detail, idx) => (
              <div key={idx} style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange('pt', idx, e.target.value)}
                  placeholder={`Detalhe ${idx + 1}`}
                />
                <button type="button" onClick={() => handleRemoveDetail('pt', idx)} className="btn-delete">
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddDetail('pt')} className="btn-add-detail">
              + Adicionar Detalhe
            </button>
          </div>

          {/* Detalhes EN */}
          <div className="form-group">
            <label>Details (EN)</label>
            {formData.details.en.map((detail, idx) => (
              <div key={idx} style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange('en', idx, e.target.value)}
                  placeholder={`Detail ${idx + 1}`}
                />
                <button type="button" onClick={() => handleRemoveDetail('en', idx)} className="btn-delete">
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddDetail('en')} className="btn-add-detail">
              + Add Detail
            </button>
          </div>

          {/* Ordem e Ativo */}
          <div className="form-row">
            <div className="form-group">
              <label>Ordem de Exibição</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                />
                Serviço Ativo
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-save">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;