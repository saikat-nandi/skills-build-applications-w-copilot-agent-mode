import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

// GET /api/workouts/ - Retrieve all available workouts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({
      message: 'Get all workouts',
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET /api/workouts/:id - Retrieve a specific workout
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST /api/workouts/ - Create a new personalized workout suggestion
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({
      message: 'Workout created',
      data: workout,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

export default router;
