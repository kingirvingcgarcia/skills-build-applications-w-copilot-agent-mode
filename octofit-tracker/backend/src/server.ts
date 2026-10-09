import express, { type NextFunction, type Request, type Response } from 'express';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
import database from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-api',
    database: database.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.get('/api/users/', async (_request, response) => response.json(await User.find().lean()));
app.post('/api/users/', async (request, response) => response.status(201).json(await User.create(request.body)));

app.get('/api/teams/', async (_request, response) => response.json(await Team.find().populate('members').lean()));
app.post('/api/teams/', async (request, response) => response.status(201).json(await Team.create(request.body)));

app.get('/api/activities/', async (_request, response) => response.json(await Activity.find().populate('user').lean()));
app.post('/api/activities/', async (request, response) => response.status(201).json(await Activity.create(request.body)));

app.get('/api/leaderboard/', async (_request, response) => response.json(await Leaderboard.find().populate('user team').sort({ points: -1 }).lean()));
app.post('/api/leaderboard/', async (request, response) => response.status(201).json(await Leaderboard.create(request.body)));

app.get('/api/workouts/', async (_request, response) => response.json(await Workout.find().lean()));
app.post('/api/workouts/', async (request, response) => response.status(201).json(await Workout.create(request.body)));

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(400).json({ error: error.message });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on ${baseUrl}`);
});