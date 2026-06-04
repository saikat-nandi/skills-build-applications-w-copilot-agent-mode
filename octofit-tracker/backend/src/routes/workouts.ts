import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/workouts/ - Retrieve all available workouts
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Get all workouts',
    data: [],
  });
});

// GET /api/workouts/:id - Retrieve a specific workout
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get workout ${id}`,
    workoutId: id,
  });
});

// POST /api/workouts/ - Create a new personalized workout suggestion
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Workout created',
    data: req.body,
  });
});

export default router;
