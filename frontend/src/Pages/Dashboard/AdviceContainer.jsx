import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../components/AccessToken';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const AdviceContainer = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  const contextConfig = {
    motivation: { icon: '💪', label: 'Motivation', color: '#3b82f6' },
    technique: { icon: '🎯', label: 'Technique', color: '#10b981' },
    nutrition: { icon: '🥗', label: 'Nutrition', color: '#f59e0b' },
    recovery: { icon: '😴', label: 'Récupération', color: '#8b5cf6' },
    safety: { icon: '🛡️', label: 'Sécurité', color: '#ef4444' },
    progression: { icon: '📈', label: 'Progression', color: '#06b6d4' },
    regularite: { icon: '🔄', label: 'Régularité', color: '#84cc16' },
    mental: { icon: '🧠', label: 'Mental', color: '#ec4899' },
    "équilibre musculaire": { icon: '⚖️', label: 'Équilibre musculaire', color: '#f97316' },
    "bien-être": { icon: '🌱', label: 'Bien-être', color: '#22c55e' },
    routine: { icon: '⏰', label: 'Routine', color: '#6366f1' },
    "pause active": { icon: '🕺', label: 'Pause active', color: '#14b8a6' },
    étirement: { icon: '🤸', label: 'Étirement', color: '#a855f7' },
    prévention: { icon: '🦺', label: 'Prévention', color: '#eab308' },
    "récupération active": { icon: '🏃‍♂️', label: 'Récupération active', color: '#0ea5e9' }
  };

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
        setAdvice(fallbackAdvice);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvice();
  }, []);

  const contextInfo = contextConfig[advice?.context] || { icon: '💡', label: 'Conseil', color: '#3b82f6' };

  if (loading) {
    return (
      <Card sx={{
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(16,24,40,0.7) 60%, rgba(59,130,246,0.08) 100%)',
        border: '1.5px solid rgba(59,130,246,0.18)',
        boxShadow: '0 8px 32px rgba(16,24,40,0.18), 0 1.5px 8px rgba(59,130,246,0.08)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#e2e8f0',
        padding: '32px 24px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 12px 40px 0 rgba(59,130,246,0.25), 0 2px 16px rgba(16,185,129,0.12)',
          borderColor: '#3b82f6',
          transform: 'translateY(-6px) scale(1.03)',
        }
      }}>
        <CardHeader 
          title="Conseil du Jour"
          sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 0 }} 
        />
      </Card>
    );
  }

  return (
    <Card sx={{
      borderRadius: 3,
      background: 'linear-gradient(135deg, rgba(16,24,40,0.7) 60%, rgba(59,130,246,0.08) 100%)',
      border: '1.5px solid rgba(59,130,246,0.18)',
      boxShadow: '0 8px 32px rgba(16,24,40,0.18), 0 1.5px 8px rgba(59,130,246,0.08)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#e2e8f0',
      padding: '32px 24px',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 16px 48px 0 rgba(59,130,246,0.3), 0 4px 20px rgba(16,185,129,0.15)',
        borderColor: contextInfo.color,
        transform: 'translateY(-8px) rotateY(2deg)',
        '& .quote-icon': {
          transform: 'scale(1.1) rotate(5deg)',
          filter: `drop-shadow(0 0 20px ${contextInfo.color})`,
        },
        '& .quote-content': {
          transform: 'scale(1.02)',
        }
      }
    }}>
      {/* Icône flottante avec effet de lueur */}
      <Box
        className="quote-icon"
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontSize: '2.5rem',
          filter: `drop-shadow(0 0 12px ${contextInfo.color}40)`,
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 2,
          opacity: 0.7,
          '&:hover': {
            opacity: 1,
          }
        }}
      >
        {contextInfo.icon}
      </Box>

      <CardHeader
        title="Conseil du Jour"
        sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 0, pr: 0 }}
      />
      
      {/* Badge de catégorie intégré */}
      <Box sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center' }}>
        <Chip
          label={contextInfo.label}
          sx={{
            background: `linear-gradient(135deg, ${contextInfo.color}15 0%, ${contextInfo.color}25 100%)`,
            border: `1px solid ${contextInfo.color}40`,
            color: contextInfo.color,
            fontWeight: 600,
            fontSize: '0.8rem',
            padding: '6px 12px',
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: `linear-gradient(135deg, ${contextInfo.color}25 0%, ${contextInfo.color}35 100%)`,
              transform: 'scale(1.05)',
              boxShadow: `0 4px 12px ${contextInfo.color}30`,
            }
          }}
        />
      </Box>

      {/* Contenu de la citation simplifié */}
      <Box 
        className="quote-content"
        sx={{ 
          mt: 3, 
          p: 3, 
          pl: 4,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(16,185,129,0.02) 100%)',
          border: `1px solid ${contextInfo.color}20`,
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: `linear-gradient(180deg, ${contextInfo.color} 0%, transparent 100%)`,
            borderRadius: '2px',
          }
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: '#e2e8f0',
            fontSize: '1.15rem',
            fontWeight: 500,
            lineHeight: 1.7,
            textAlign: 'center',
            fontStyle: 'italic',
            position: 'relative',
            zIndex: 1,
            mb: 2
          }}
        >
          {advice?.message}
        </Typography>
        
        {/* Signature */}
        <Typography
          variant="caption"
          sx={{
            color: contextInfo.color,
            fontWeight: 600,
            fontSize: '0.8rem',
            textAlign: 'right',
            fontStyle: 'normal',
            opacity: 0.8,
            display: 'block',
            mt: 2
          }}
        >
          — Athlia Coach
        </Typography>
      </Box>
    </Card>
  );
};

export default AdviceContainer; 