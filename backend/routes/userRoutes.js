import express from 'express';
import { ProfileInfo, UpdatePass } from '../controllers/userController.js';
import { Authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/ProfileInfo', Authenticate, ProfileInfo);
router.post('/UpdatePass', Authenticate, UpdatePass);

export default router;
