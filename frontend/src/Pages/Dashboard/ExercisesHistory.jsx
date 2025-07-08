import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../components/AccessToken.jsx";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseHistory = async () => {
      try {
        const response = await fetchWithAuth(
          "http://localhost:8000/api/entries/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Exercise history fetched successfully:", data);

          const formattedHistory = data.map((entry) => {
            let formattedDate = "-";

            // Vérifier différents champs de date possibles
            const dateField =
              entry.created_at || entry.date_created || entry.timestamp;

            if (dateField) {
              try {
                const entryDate = new Date(dateField);
                if (!isNaN(entryDate.getTime())) {
                  formattedDate = entryDate.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  });
                }
              } catch (error) {
                console.error("Erreur lors du formatage de la date:", error);
              }
            } else {
              // Si aucune date n'est disponible, utiliser la date actuelle comme fallback
              formattedDate = new Date().toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              console.warn(
                "Aucune date trouvée pour l'entrée:",
                entry.id,
                "- utilisation de la date actuelle"
              );
            }

            console.log(
              "Entry created_at:",
              dateField,
              "Formatted date:",
              formattedDate
            );

            return {
              id: entry.id,
              exercise_name: entry.exercise_name || "Exercice inconnu",
              date: formattedDate,
              sets: entry.sets || "-",
              reps: entry.reps || "-",
              duration: entry.duration_minutes || "-",
              notes: entry.notes || "",
              created_at: dateField || new Date().toISOString(),
            };
          });

          // Trier par date décroissante (plus récent en premier)
          formattedHistory.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          setHistory(formattedHistory);
          setError(null);
        } else {
          console.error("Failed to fetch exercise history:", response.status);
          setError("Erreur lors de la récupération de l'historique");
        }
      } catch (error) {
        console.error("Error fetching exercise history:", error);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };
    fetchExerciseHistory();
  }, []);

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
      <CardHeader title="Historique des Exercices" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }} />
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress color="primary" />
      </CardContent>
    </Card>
  );

  if (error) {
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
        <CardHeader title="Historique des Exercices" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }} />
        <CardContent>
          <p style={{ color: '#e57373', textAlign: 'center' }}>❌ {error}</p>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()} sx={{ mt: 2, display: 'block', mx: 'auto' }}>
            Réessayer
          </Button>
        </CardContent>
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
      transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.2s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 12px 40px 0 rgba(59,130,246,0.25), 0 2px 16px rgba(16,185,129,0.12)',
        borderColor: '#3b82f6',
        transform: 'translateY(-6px) scale(1.03)',
      }
    }}>
      <CardHeader title="Historique des Exercices" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '1.3rem', letterSpacing: 0.5 }} />
      <CardContent sx={{ height: 440, display: 'flex', flexDirection: 'column' }}>
        {history.length === 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <p style={{ textAlign: 'center', color: '#cbd5e1' }}>Aucun exercice enregistré. Commencez par ajouter un exercice !</p>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ background: 'transparent', boxShadow: 'none', flex: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#60a5fa', fontWeight: 700 }}>Exercice</TableCell>
                  <TableCell sx={{ color: '#60a5fa', fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ color: '#60a5fa', fontWeight: 700 }}>Séries</TableCell>
                  <TableCell sx={{ color: '#60a5fa', fontWeight: 700 }}>Répétitions</TableCell>
                  <TableCell sx={{ color: '#60a5fa', fontWeight: 700 }}>Durée (min)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ color: '#e2e8f0' }}>{item.exercise_name}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0' }}>{item.date}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0' }}>{item.sets}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0' }}>{item.reps}</TableCell>
                    <TableCell sx={{ color: '#e2e8f0' }}>{item.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseHistory;
