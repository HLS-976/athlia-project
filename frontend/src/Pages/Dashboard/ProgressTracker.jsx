import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ProgressTracker = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress/summary")
      .then((res) => {
        if (!res.ok) throw new Error("Non disponible");
        return res.json();
      })
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          {
            id: 1,
            title: "Séances par Semaine",
            icon: "🏃‍♂️",
            current: 4,
            target: 5,
            status: "on-track"
          },
          {
            id: 2,
            title: "Pompes Totales",
            icon: "💪",
            current: 45,
            target: 60,
            unit: "pompes",
            status: "behind"
          },
          {
            id: 3,
            title: "Squats Complétés",
            icon: "🦵",
            current: 80,
            target: 100,
            unit: "squats",
            status: "ahead"
          },
          {
            id: 4,
            title: "Gainage Total",
            icon: "🔥",
            current: 6,
            target: 9,
            unit: "min",
            status: "on-track"
          }
        ];
        setProgress(fakeData);
        setLoading(false);
      });
  }, []);

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 80) return '#4ade80';
    if (percentage >= 60) return '#3b82f6';
    return '#f59e0b';
  };

  const CircularProgressBar = ({ percentage, icon, title, size = 80 }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const statusColor = getStatusColor(percentage);

    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(59,130,246,0.1)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={statusColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.8s ease-in-out',
              filter: `drop-shadow(0 0 8px ${statusColor}40)`
            }}
          />
        </svg>
        {/* Center content */}
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            sx={{
              fontSize: '1.5rem',
              marginBottom: '2px',
              filter: 'drop-shadow(0 0 6px rgba(59,130,246,0.4))',
              animation: 'iconPulse 3s ease-in-out infinite'
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: '#e2e8f0',
              fontWeight: 600,
              fontSize: '0.7rem',
              textAlign: 'center',
              lineHeight: 1,
              maxWidth: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: statusColor,
              fontWeight: 800,
              fontSize: '0.9rem',
              textShadow: `0 0 6px ${statusColor}40`
            }}
          >
            {percentage}%
          </Typography>
        </Box>
      </Box>
    );
  };

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
        transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 12px 40px 0 rgba(59,130,246,0.25), 0 2px 16px rgba(16,185,129,0.12)',
          borderColor: '#3b82f6',
          transform: 'translateY(-6px) scale(1.03)',
        }
      }}>
        <CardHeader title={<span><span className="dashboard-card-icon">📊</span> Suivi des Objectifs</span>} sx={{ textAlign: 'left', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 1 }} />
      </Card>
    );
  }
  if (!progress || progress.length === 0) return (
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
      <CardHeader title={<span><span className="dashboard-card-icon">📊</span> Suivi des Objectifs</span>} sx={{ textAlign: 'left', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 1 }} />
    </Card>
  );

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
            <span className="dashboard-card-icon">📊</span>
            <span>Suivi des Objectifs</span>
          </Box>
        }
        sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5, pl: 0 }}
      />
      <div className="dashboard-card-body" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', minHeight: 80 }}>
        <Grid container spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
          {progress.map((item) => {
            const percentage = Math.round(getProgressPercentage(item.current, item.target));
            
            return (
              <Grid key={item.id}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  <CircularProgressBar
                    percentage={percentage}
                    icon={item.icon}
                    title={item.title}
                    size={110}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Card>
  );
};

export default ProgressTracker;
