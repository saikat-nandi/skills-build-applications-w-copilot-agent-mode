import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teams/ - Retrieve all teams
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Get all teams',
    data: [],
  });
});

// GET /api/teams/:id - Retrieve a specific team
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get team ${id}`,
    teamId: id,
  });
});

// POST /api/teams/ - Create a new team
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Team created',
    data: req.body,
  });
});

// PUT /api/teams/:id - Update a team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Team ${id} updated`,
    data: req.body,
  });
});

// DELETE /api/teams/:id - Delete a team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Team ${id} deleted`,
  });
});

export default router;
