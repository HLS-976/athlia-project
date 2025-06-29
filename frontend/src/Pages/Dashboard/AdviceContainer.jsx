import React from 'react';
import './AdviceContainer.css';

const AdviceContainer = () => {
  // Ex
  const exampleAdvice = {
    id: 201,
    message: "Tu avances à ton rythme, et c'est ce qui compte. Garde confiance en toi et continue tes efforts !",
    context: "motivation"
  };

  const getContextIcon = (context) => {
    switch (context) {
      case 'motivation':
        return '💪';
      case 'technique':
        return '🎯';
      case 'nutrition':
        return '🥗';
      case 'recovery':
        return '😴';
      case 'safety':
        return '🛡️';
      default:
        return '💡';
    }
  };

  const getContextLabel = (context) => {
    switch (context) {
      case 'motivation':
        return 'Motivation';
      case 'technique':
        return 'Technique';
      case 'nutrition':
        return 'Nutrition';
      case 'recovery':
        return 'Récupération';
      case 'safety':
        return 'Sécurité';
      default:
        return 'Conseil';
    }
  };

  return (
    <div className="advice-container">
      <div className="advice-header">
        <h3>Conseil du Jour</h3>
      </div>

      <div className="advice-card-simple">
        <div className="advice-context-simple">
          <span className="context-icon-simple">{getContextIcon(exampleAdvice.context)}</span>
          <span className="context-label-simple">{getContextLabel(exampleAdvice.context)}</span>
        </div>
        
        <div className="advice-content-simple">
          <p className="advice-message-simple">{exampleAdvice.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AdviceContainer; 