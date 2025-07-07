import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const MuscleUsageChart = () => {
  const [muscleData, setMuscleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/muscles/usage/")
      .then((res) => {
        if (!res.ok) throw new Error("Non accessible");
        return res.json();
      })
      .then((data) => {
        setMuscleData(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          { name: "Pectoraux", count: 15, icon: "💪", level: 5, xp: 1500, nextLevel: 2000 },
          { name: "Abdominaux", count: 12, icon: "🔥", level: 4, xp: 1200, nextLevel: 1500 },
          { name: "Biceps", count: 10, icon: "💪", level: 3, xp: 1000, nextLevel: 1200 },
          { name: "Dorsaux", count: 8, icon: "🏋️", level: 3, xp: 800, nextLevel: 1000 },
          { name: "Jambes", count: 6, icon: "🦵", level: 2, xp: 600, nextLevel: 800 },
          { name: "Épaules", count: 5, icon: "💪", level: 2, xp: 500, nextLevel: 600 },
          { name: "Fessiers", count: 4, icon: "🍑", level: 1, xp: 400, nextLevel: 500 },
        ];
        setMuscleData(fakeData);
        setLoading(false);
      });
  }, []);

  const getMaxCount = () => {
    return Math.max(...muscleData.map(item => item.count));
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 5: return '#4ade80'; // Légendaire
      case 4: return '#3b82f6'; // Expert
      case 3: return '#f59e0b'; // Avancé
      case 2: return '#8b5cf6'; // Intermédiaire
      case 1: return '#64748b'; // Débutant
      default: return '#64748b';
    }
  };

  const getLevelTitle = (level) => {
    switch(level) {
      case 5: return 'Légendaire';
      case 4: return 'Expert';
      case 3: return 'Avancé';
      case 2: return 'Intermédiaire';
      case 1: return 'Débutant';
      default: return 'Nouveau';
    }
  };

  const getLevelIcon = (level) => {
    switch(level) {
      case 5: return '👑';
      case 4: return '⭐';
      case 3: return '🔥';
      case 2: return '⚡';
      case 1: return '🌱';
      default: return '🌱';
    }
  };

  const getProgressPercentage = (xp, nextLevel) => {
    return Math.min((xp / nextLevel) * 100, 100);
  };

  const LevelBadge = ({ level, xp, nextLevel }) => {
    const levelColor = getLevelColor(level);
    const levelTitle = getLevelTitle(level);
    const levelIcon = getLevelIcon(level);
    const progress = getProgressPercentage(xp, nextLevel);
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${levelColor}20 0%, ${levelColor}40 100%)`,
            border: `2px solid ${levelColor}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ fontSize: '1.2rem', zIndex: 2, position: 'relative' }}>{levelIcon}</span>
          {/* Progress ring */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              background: `conic-gradient(${levelColor} ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
              opacity: 0.3
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: levelColor,
            fontWeight: 700,
            fontSize: '0.7rem',
            textAlign: 'center'
          }}
        >
          {levelTitle}
        </Typography>
      </Box>
    );
  };

  if (loading) return (
    <Card sx={{
      borderRadius: 3,
      background: 'linear-gradient(135deg, rgba(16,24,40,0.7) 60%, rgba(59,130,246,0.08) 100%)',
      border: '1.5px solid rgba(59,130,246,0.18)',
      boxShadow: '0 8px 32px rgba(16,24,40,0.18), 0 1.5px 8px rgba(59,130,246,0.08)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#e2e8f0',
      padding: '32px 24px',
      transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 12px 40px 0 rgba(59,130,246,0.25), 0 2px 16px rgba(16,185,129,0.12)',
        borderColor: '#3b82f6',
        transform: 'translateY(-6px) scale(1.03)',
      }
    }}>
      <CardHeader title="Muscles les Plus Sollicités" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
        <CircularProgress color="primary" />
      </Box>
    </Card>
  );
  if (muscleData.length === 0) return (
    <Card sx={{
      borderRadius: 3,
      background: 'linear-gradient(135deg, rgba(16,24,40,0.7) 60%, rgba(59,130,246,0.08) 100%)',
      border: '1.5px solid rgba(59,130,246,0.18)',
      boxShadow: '0 8px 32px rgba(16,24,40,0.18), 0 1.5px 8px rgba(59,130,246,0.08)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#e2e8f0',
      padding: '32px 24px',
      transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 12px 40px 0 rgba(59,130,246,0.25), 0 2px 16px rgba(16,185,129,0.12)',
        borderColor: '#3b82f6',
        transform: 'translateY(-6px) scale(1.03)',
      }
    }}>
      <CardHeader title="Muscles les Plus Sollicités" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
        <Typography align="center" color="#cbd5e1">Aucune donnée musculaire.</Typography>
      </Box>
    </Card>
  );

  const maxCount = getMaxCount();

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
      transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 12px 40px 0 rgba(59,130,246,0.25), 0 2px 16px rgba(16,185,129,0.12)',
        borderColor: '#3b82f6',
        transform: 'translateY(-6px) scale(1.03)',
      }
    }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <span className="dashboard-card-icon">🏆</span>
            <span>Niveaux Musculaires</span>
          </Box>
        }
        sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 0 }}
      />
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {muscleData.map((muscle, index) => {
            const levelColor = getLevelColor(muscle.level);
            
            return (
              <Grid key={index} sx={{ width: { xs: '50%', sm: '20%' } }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 12px',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.05) 100%)',
                    border: `1px solid rgba(59,130,246,0.2)`,
                    borderRadius: 2,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(59,130,246,0.15)',
                      borderColor: levelColor,
                    }
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '2rem',
                      marginBottom: '8px',
                      filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.3))',
                      animation: 'iconPulse 3s ease-in-out infinite'
                    }}
                  >
                    {muscle.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#e2e8f0',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      marginBottom: '8px',
                      lineHeight: 1.2
                    }}
                  >
                    {muscle.name}
                  </Typography>
                  
                  {/* Badge niveau */}
                  <LevelBadge level={muscle.level} xp={muscle.xp} nextLevel={muscle.nextLevel} />
                  
                  <Typography
                    variant="caption"
                    sx={{
                      color: levelColor,
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      textAlign: 'center',
                      marginTop: '4px'
                    }}
                  >
                    {muscle.xp} XP
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
};

export default MuscleUsageChart;
