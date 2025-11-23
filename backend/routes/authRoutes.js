import express from 'express';
import { login, loginAdmin, loginMeter } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/loginAdmin', loginAdmin);
router.post('/loginMeter', loginMeter);

export default router;
