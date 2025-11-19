import express from 'express';
import { login, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/loginAdmin', loginAdmin);

export default router;
