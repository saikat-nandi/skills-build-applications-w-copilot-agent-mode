import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users/ - Retrieve all users
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Get all users',
    data: [],
  });
});

// GET /api/users/:id - Retrieve a specific user
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get user ${id}`,
    userId: id,
  });
});

// POST /api/users/ - Create a new user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'User created',
    data: req.body,
  });
});

// PUT /api/users/:id - Update a user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} updated`,
    data: req.body,
  });
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} deleted`,
  });
});

export default router;
