/**
 * Seed the octofit_db database with test data
 * 
 * This script populates the OctoFit Tracker database with realistic sample data
 * for users, teams, activities, workouts, and leaderboard entries.
 * 
 * Run: npm run seed
 */

import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing collections');

    // Create sample users
    console.log('Creating sample users...');
    const users = await User.create([
      {
        username: 'alice_runner',
        email: 'alice@example.com',
        password: 'hashed_password_1',
        profile: {
          fullName: 'Alice Johnson',
          avatar: 'https://i.pravatar.cc/150?u=alice',
          bio: 'Marathon enthusiast and fitness coach',
        },
      },
      {
        username: 'bob_cyclist',
        email: 'bob@example.com',
        password: 'hashed_password_2',
        profile: {
          fullName: 'Bob Smith',
          avatar: 'https://i.pravatar.cc/150?u=bob',
          bio: 'Road cyclist and triathlon trainer',
        },
      },
      {
        username: 'carol_swimmer',
        email: 'carol@example.com',
        password: 'hashed_password_3',
        profile: {
          fullName: 'Carol Williams',
          avatar: 'https://i.pravatar.cc/150?u=carol',
          bio: 'Swimming instructor and pool lover',
        },
      },
      {
        username: 'david_yogi',
        email: 'david@example.com',
        password: 'hashed_password_4',
        profile: {
          fullName: 'David Brown',
          avatar: 'https://i.pravatar.cc/150?u=david',
          bio: 'Yoga instructor and wellness coach',
        },
      },
      {
        username: 'emma_gym',
        email: 'emma@example.com',
        password: 'hashed_password_5',
        profile: {
          fullName: 'Emma Davis',
          avatar: 'https://i.pravatar.cc/150?u=emma',
          bio: 'Personal trainer and fitness enthusiast',
        },
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    console.log('Creating sample teams...');
    const teams = await Team.create([
      {
        name: 'Velocity Runners',
        description: 'Fast-paced running group focused on marathons',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[4]._id],
        totalPoints: 450,
      },
      {
        name: 'Aqua Athletes',
        description: 'Swimming and water sports team',
        leader: users[2]._id,
        members: [users[2]._id, users[3]._id],
        totalPoints: 280,
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic fitness and wellness team',
        leader: users[3]._id,
        members: [users[0]._id, users[3]._id, users[4]._id],
        totalPoints: 390,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Update users with team assignments
    await User.updateMany(
      { _id: { $in: [users[0]._id, users[1]._id, users[4]._id] } },
      { teamId: teams[0]._id }
    );
    await User.updateMany(
      { _id: { $in: [users[2]._id, users[3]._id] } },
      { teamId: teams[1]._id }
    );

    // Create sample activities
    console.log('Creating sample activities...');
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 10.5,
        calories: 850,
        description: 'Morning 10K run at the park',
        timestamp: new Date(Date.now() - 86400000 * 3),
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 12,
        calories: 1000,
        description: 'Sunday long run',
        timestamp: new Date(Date.now() - 86400000 * 1),
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 45,
        calories: 1200,
        description: 'Weekend bike tour',
        timestamp: new Date(Date.now() - 86400000 * 2),
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 45,
        distance: 2.5,
        calories: 600,
        description: 'Pool training session',
        timestamp: new Date(Date.now() - 86400000 * 4),
      },
      {
        userId: users[3]._id,
        type: 'yoga',
        duration: 60,
        calories: 300,
        description: 'Vinyasa flow class',
        timestamp: new Date(Date.now() - 86400000 * 2),
      },
      {
        userId: users[4]._id,
        type: 'gym',
        duration: 75,
        calories: 900,
        description: 'Full body strength training',
        timestamp: new Date(Date.now() - 86400000 * 1),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create sample workouts
    console.log('Creating sample workouts...');
    const workouts = await Workout.create([
      {
        title: 'Beginner 5K Training',
        description:
          'Perfect for those starting their running journey. Build endurance gradually over 4 weeks.',
        type: 'running',
        difficulty: 'beginner',
        estimatedDuration: 30,
        caloriesBurned: 300,
        instructions: [
          'Warm up with 5 minutes of light jogging',
          'Run at a comfortable pace for 20 minutes',
          'Cool down with 5 minutes of walking',
        ],
        equipment: ['Running shoes'],
      },
      {
        title: 'Mountain Bike Adventure',
        description: 'Intermediate cycling route with challenging terrain.',
        type: 'cycling',
        difficulty: 'intermediate',
        estimatedDuration: 90,
        caloriesBurned: 1200,
        instructions: [
          'Check bike before ride',
          'Warm up on flat terrain',
          'Tackle hills gradually',
          'Maintain steady pace on technical sections',
        ],
        equipment: ['Mountain bike', 'Helmet', 'Water bottle'],
      },
      {
        title: 'Advanced Swimming Intervals',
        description:
          'High-intensity interval training for competitive swimmers.',
        type: 'swimming',
        difficulty: 'advanced',
        estimatedDuration: 60,
        caloriesBurned: 800,
        instructions: [
          'Warm up with 500m freestyle',
          'Perform 8x100m sprints with 30s rest',
          'Cool down with 200m easy swimming',
        ],
        equipment: ['Swimming pool', 'Goggles', 'Kickboard'],
      },
      {
        title: 'Morning Yoga Flow',
        description: 'Energizing yoga session to start your day right.',
        type: 'yoga',
        difficulty: 'beginner',
        estimatedDuration: 45,
        caloriesBurned: 250,
        instructions: [
          'Begin with centering and breathing',
          'Sun salutations',
          'Standing poses sequence',
          'Closing with savasana',
        ],
        equipment: ['Yoga mat'],
      },
      {
        title: 'Full Body Gym Workout',
        description:
          'Complete strength training routine targeting all muscle groups.',
        type: 'gym',
        difficulty: 'intermediate',
        estimatedDuration: 60,
        caloriesBurned: 650,
        instructions: [
          'Warm up on treadmill for 10 minutes',
          'Chest press: 4 sets x 8-10 reps',
          'Rows: 4 sets x 8-10 reps',
          'Squats: 4 sets x 10-12 reps',
          'Cool down and stretch',
        ],
        equipment: [
          'Dumbbells',
          'Barbell',
          'Bench',
          'Squat rack',
          'Treadmill',
        ],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    // Create leaderboard entries
    console.log('Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.create([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        username: users[0].username,
        points: 180,
        rank: 1,
        activitiesCount: 2,
        totalDuration: 105,
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        username: users[1].username,
        points: 120,
        rank: 2,
        activitiesCount: 1,
        totalDuration: 90,
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        username: users[2].username,
        points: 90,
        rank: 3,
        activitiesCount: 1,
        totalDuration: 45,
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        username: users[3].username,
        points: 75,
        rank: 4,
        activitiesCount: 1,
        totalDuration: 60,
      },
      {
        userId: users[4]._id,
        teamId: teams[2]._id,
        username: users[4].username,
        points: 135,
        rank: 5,
        activitiesCount: 1,
        totalDuration: 75,
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`  - Users: ${users.length}`);
    console.log(`  - Teams: ${teams.length}`);
    console.log(`  - Activities: ${activities.length}`);
    console.log(`  - Workouts: ${workouts.length}`);
    console.log(`  - Leaderboard entries: ${leaderboardEntries.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
