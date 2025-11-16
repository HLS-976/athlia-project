import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const MAX_BAR_HEIGHT = 80; // px, hauteur max de la barre
const MAX_SESSIONS = 4; // nombre max de séances pour l'échelle (adapter si besoin)

const ExercisesFrequency = () => {
  const [frequency, setFrequency] = useState([]);
  const [range, setRange] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sessions/stats?range=${range}`)
      .then((res) => {
        if (!res.ok) throw new Error("API indisponible");
        return res.json();
      })
      .then((data) => {
        setFrequency(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          { label: "Lun", count: 2 },
          { label: "Mar", count: 1 },
          { label: "Mer", count: 3 },
          { label: "Jeu", count: 0 },
          { label: "Ven", count: 2 },
          { label: "Sam", count: 1 },
          { label: "Dim", count: 0 },
        ];
        setFrequency(fakeData);
        setLoading(false);
      });
  }, [range]);

  // Couleur dynamique selon la hauteur
  const getBarColor = (count) => {
    if (count >= 3) return 'linear-gradient(180deg, #4ade80 0%, #2460f2 100%)';
    if (count >= 1) return 'linear-gradient(180deg, #3b82f6 0%, #64748b 100%)';
    return 'linear-gradient(180deg, #334155 0%, #1e293b 100%)';
  };

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
            <span className="dashboard-card-icon">📅</span>
            <span>Fréquence des Séances</span>
          </Box>
        }
        sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 0 }}
      />
      <div className="dashboard-card-body" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', minHeight: 80 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Box sx={{ width: '100%', maxWidth: 320, minWidth: 200, display: 'flex', alignItems: 'flex-end', gap: 6, height: MAX_BAR_HEIGHT + 40, mb: 1, justifyContent: 'center' }}>
            {frequency.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18 }}>
                <span style={{ fontSize: '1rem', color: '#e2e8f0', fontWeight: 600, marginBottom: 4, height: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {item.count > 0 ? item.count : ''}
                </span>
                <Box
                  sx={{
                    width: 12,
                    height: `${Math.round((item.count / MAX_SESSIONS) * MAX_BAR_HEIGHT)}px`,
                    background: getBarColor(item.count),
                    borderRadius: 5,
                    boxShadow: item.count > 0 ? '0 2px 8px #2460f2' : 'none',
                    transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                />
                <span style={{ fontSize: '0.95rem', color: '#cbd5e1', fontWeight: 500, marginTop: 6, textAlign: 'center', width: '100%' }}>{item.label}</span>
              </Box>
            ))}
          </Box>
        )}
      </div>
    </Card>
  );
};

export default ExercisesFrequency;
