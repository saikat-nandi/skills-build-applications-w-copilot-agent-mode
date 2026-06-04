import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/leaderboard/ - Retrieve the leaderboard
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Get leaderboard',
    data: [],
  });
});

// GET /api/leaderboard/:id - Retrieve leaderboard for a specific team
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get leaderboard for team ${id}`,
    teamId: id,
    data: [],
  });
});

export default router;
