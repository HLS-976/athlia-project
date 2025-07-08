import React from 'react';
import Header from "./Header";
import ExercisesHistory from "./ExercisesHistory";
import ExercisesFrequency from "./ExercisesFrequency";
import ProgressTracker from "./ProgressTracker";
import MusclesUsage from "./MusclesUsage";
import AdviceContainer from "./AdviceContainer";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const DashBoard = () => (
  <main>
    <Header />
    <Box sx={{
      maxWidth: 1400,
      mx: 'auto',
      mt: 4,
      px: { xs: 1, md: 3 },
      py: 2,
      minHeight: '100vh',
      borderRadius: 6,
      position: 'relative',
    }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid sx={{ width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <h1 style={{
              background: 'linear-gradient(90deg, #fff 0%, #2460f2 25%, #4ade80 75%, #fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
              fontSize: '2.5rem',
              letterSpacing: 0.5,
              textShadow: '0 0 24px #2460f2, 0 0 32px #4ade80',
              margin: 0
            }}> Tableau de Bord</h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.2rem', margin: '8px 0 0 0', fontWeight: 500 }}>Ton dashboard, ton terrain d’innovation sportive</p>
          </Box>
        </Grid>
        <Grid sx={{ width: '100%' }}>
          <AdviceContainer />
        </Grid>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          <Grid sx={{ flex: 1, minWidth: 300, maxWidth: { md: '50%' } }}>
            <ExercisesHistory />
            <Box mt={4.75}>
              <ExercisesFrequency />
            </Box>
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 300, maxWidth: { md: '50%' } }}>
            <MusclesUsage />
            <Box mt={4}>
              <ProgressTracker />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </main>
);

export default DashBoard;
