import { useLanguage } from '../contexts/LanguageContext';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Política de Privacidade</h1>
        <p className="last-updated">Última atualização: Janeiro 2026</p>

        <section>
          <h2>1. Informações que Recolhemos</h2>
          <p>
            Recolhemos informações quando visita o nosso site, incluindo dados de navegação,
            endereço IP, tipo de navegador e páginas visitadas.
          </p>
        </section>

        <section>
          <h2>2. Utilização de Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a sua experiência de navegação. Os cookies são
            pequenos ficheiros armazenados no seu dispositivo que nos ajudam a personalizar
            o conteúdo e analisar o tráfego do site.
          </p>
          <h3>Tipos de Cookies:</h3>
          <ul>
            <li><strong>Necessários:</strong> Essenciais para o funcionamento do site</li>
            <li><strong>Análise:</strong> Ajudam-nos a entender como os visitantes usam o site</li>
            <li><strong>Marketing:</strong> Utilizados para personalizar anúncios</li>
          </ul>
        </section>

        <section>
          <h2>3. Os Seus Direitos (RGPD)</h2>
          <p>De acordo com o Regulamento Geral de Proteção de Dados, tem o direito de:</p>
          <ul>
            <li>Aceder aos seus dados pessoais</li>
            <li>Retificar dados incorretos</li>
            <li>Solicitar a eliminação dos seus dados</li>
            <li>Opor-se ao processamento dos seus dados</li>
            <li>Portabilidade dos dados</li>
          </ul>
        </section>

        <section>
          <h2>4. Contacto</h2>
          <p>
            Para questões sobre privacidade, contacte-nos através de:
            <br />
            Email: privacidade@streetpaint.pt
            <br />
            Telefone: +351 960 172 705
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;