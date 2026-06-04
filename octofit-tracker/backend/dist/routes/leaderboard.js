import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
const router = Router();
// GET /api/leaderboard/ - Retrieve the leaderboard
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .populate('userId')
            .populate('teamId')
            .sort({ points: -1 });
        res.json({
            message: 'Get leaderboard',
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET /api/leaderboard/:id - Retrieve leaderboard for a specific team
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const leaderboard = await Leaderboard.find({ teamId: id })
            .populate('userId')
            .populate('teamId')
            .sort({ points: -1 });
        res.json({
            message: `Get leaderboard for team ${id}`,
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
export default router;
