import express from 'express';
import { MyRequests, NewRequest, ProfileInfo, UpdatePass, DeleteRequest, MyPayments, PayBill } from '../controllers/userController.js';
import { Authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/ProfileInfo', Authenticate, ProfileInfo);
router.get('/MyRequests', Authenticate, MyRequests );
router.get('/MyPayments', Authenticate, MyPayments);

router.post('/UpdatePass', Authenticate, UpdatePass);
router.post('/NewRequest', Authenticate, NewRequest);
router.post('/Paybill', Authenticate, PayBill);

router.delete('/DeleteRequest', Authenticate, DeleteRequest);




export default router;
