import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    let users = await User.find();
    if (users.length === 0) {
      users = await User.insertMany([
        { name: 'Mona', email: 'mona@example.com' },
        { name: 'Octo', email: 'octo@example.com' },
      ]);
    }

    let teams = await Team.find();
    if (teams.length === 0) {
      teams = await Team.insertMany([
        { name: 'Octocats', description: 'The OctoFit community team', members: users.map((user) => user._id) },
      ]);
    }

    if (await Activity.countDocuments() === 0) {
      await Activity.insertMany([
        { user: users[0]._id, type: 'running', durationMinutes: 30, distanceKm: 5, caloriesBurned: 280 },
        { user: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKm: 12, caloriesBurned: 360 },
      ]);
    }

    if (await Leaderboard.countDocuments() === 0) {
      await Leaderboard.insertMany([
        { user: users[0]._id, team: teams[0]._id, points: 280, rank: 1, period: 'weekly' },
        { user: users[1]._id, team: teams[0]._id, points: 240, rank: 2, period: 'weekly' },
      ]);
    }

    if (await Workout.countDocuments() === 0) {
      await Workout.insertMany([
        { name: 'Steady Run', description: 'A comfortable endurance run', category: 'cardio', durationMinutes: 30, difficulty: 'beginner' },
        { name: 'Interval Ride', description: 'Alternating cycling efforts and recovery', category: 'cycling', durationMinutes: 40, difficulty: 'intermediate' },
      ]);
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

console.log('Seed the octofit_db database with test data');
seedDatabase();
