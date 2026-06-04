import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API URL configuration
const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

const API_URL = getApiUrl();

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    port: PORT,
    apiUrl: API_URL,
    environment: {
      isCodespace: !!process.env.CODESPACE_NAME,
      codespaceName: process.env.CODESPACE_NAME || 'local',
    },
  });
});

// Register route handlers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend listening on ${API_URL}`);
      console.log(`MongoDB connected to ${MONGO_URI}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
