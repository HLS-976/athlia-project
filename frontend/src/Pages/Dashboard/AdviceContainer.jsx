import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../components/AccessToken';
import './AdviceContainer.css';

const AdviceContainer = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  const contextConfig = {
    motivation: { icon: '💪', label: 'Motivation' },
    technique: { icon: '🎯', label: 'Technique' },
    nutrition: { icon: '🥗', label: 'Nutrition' },
    recovery: { icon: '😴', label: 'Récupération' },
    safety: { icon: '🛡️', label: 'Sécurité' },
    progression: { icon: '📈', label: 'Progression' },
    regularite: { icon: '🔄', label: 'Régularité' },
    mental: { icon: '🧠', label: 'Mental' },
    "équilibre musculaire": { icon: '⚖️', label: 'Équilibre musculaire' },
    "bien-être": { icon: '🌱', label: 'Bien-être' },
    routine: { icon: '⏰', label: 'Routine' },
    "pause active": { icon: '🕺', label: 'Pause active' },
    étirement: { icon: '🤸', label: 'Étirement' },
    prévention: { icon: '🦺', label: 'Prévention' },
    "récupération active": { icon: '🏃‍♂️', label: 'Récupération active' }
  };

  // conseil si prob par default si probleme API
  const fallbackAdvice = {
    id: 1,
    message: "Tu avances à ton rythme, et c'est ce qui compte. Garde confiance en toi et continue tes efforts !",
    context: "motivation"
  };

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetchWithAuth('http://localhost:8000/api/advice/');
        
        if (response.ok && response.json) {
          const advices = await response.json();
          
          if (advices?.length > 0) {
            const randomAdvice = advices[Math.floor(Math.random() * advices.length)];
            const context = randomAdvice.context?.[0]?.word || 'motivation';
            
            setAdvice({
              id: randomAdvice.id,
              message: randomAdvice.message,
              context: context
            });
          } else {
            setAdvice(fallbackAdvice);
          }
        } else {
          setAdvice(fallbackAdvice);
        }
      } catch (err) {
        console.error('Erreur conseils:', err);
        setAdvice(fallbackAdvice);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  const getContextInfo = (context) => {
    return contextConfig[context] || { icon: '💡', label: 'Conseil' };
  };

  if (loading) {
    return (
      <div className="advice-container">
        <div className="advice-header">
          <h3>Conseil du Jour</h3>
        </div>
        <div className="advice-card-simple">
          <div className="advice-content-simple">
            <p className="advice-message-simple loading">Chargement du conseil...</p>
          </div>
        </div>
      </div>
    );
  }

  const contextInfo = getContextInfo(advice?.context);

  return (
    <div className="advice-container">
      <div className="advice-header">
        <h3>Conseil du Jour</h3>
      </div>

      <div className="advice-card-simple">
        <div className="advice-context-simple">
          <span className="context-icon-simple">{contextInfo.icon}</span>
          <span className="context-label-simple">{contextInfo.label}</span>
        </div>
        
        <div className="advice-content-simple">
          <p className="advice-message-simple">{advice?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AdviceContainer; 