import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

// GET /api/activities/ - Retrieve all activities
router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({
      message: 'Get all activities',
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id - Retrieve a specific activity
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity ${id}`,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities/ - Log a new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('userId');
    res.status(201).json({
      message: 'Activity logged',
      data: activity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

// PUT /api/activities/:id - Update an activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${id} updated`,
      data: activity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete an activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${id} deleted`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
