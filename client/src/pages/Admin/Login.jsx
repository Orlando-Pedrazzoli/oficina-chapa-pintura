// src/pages/Admin/Login.jsx - COM PERSISTÊNCIA DE SESSÃO
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, healthAPI } from '../../services/api';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [apiStatus, setApiStatus] = useState(null);
  const navigate = useNavigate();

  // Verificar se já está autenticado ao montar
  useEffect(() => {
    const checkExistingAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (token) {
        try {
          // Verificar se o token ainda é válido
          await authAPI.verify();
          // Token válido - redirecionar para dashboard
          navigate('/admin/dashboard', { replace: true });
          return;
        } catch {
          // Token inválido - remover e mostrar login
          localStorage.removeItem('adminToken');
        }
      }
      
      setCheckingAuth(false);
    };

    checkExistingAuth();
  }, [navigate]);

  // Verificar status da API
  useEffect(() => {
    const checkApi = async () => {
      try {
        const status = await healthAPI.check();
        setApiStatus(status);
      } catch {
        setApiStatus({ status: 'ERROR' });
      }
    };
    checkApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(credentials);
      // Salvar token no localStorage
      localStorage.setItem('adminToken', data.token);
      // Redirecionar para dashboard
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setError(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (checkingAuth) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-loading">
            <div className="spinner"></div>
            <p>Verificando sessão...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🔧 Street Paint</h1>
          <p>Painel de Administração</p>
        </div>

        {apiStatus && apiStatus.status !== 'OK' && (
          <div className="api-warning">
            ⚠️ API está offline. Verifique se o servidor está rodando.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Digite seu usuário"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Digite sua senha"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message">
              <span>❌</span> {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="/" className="back-link">← Voltar ao site</a>
        </div>
      </div>
    </div>
  );
};

export default Login;