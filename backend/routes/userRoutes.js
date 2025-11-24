import express from 'express';
import { MyRequests, NewRequest, ProfileInfo, UpdatePass, DeleteRequest, MyPayments, PayBill, EnterReading, MyStatus, NewComplaint, GetMyComplaints } from '../controllers/userController.js';
import { Authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/ProfileInfo', Authenticate, ProfileInfo);
router.get('/MyRequests', Authenticate, MyRequests );
router.get('/MyPayments', Authenticate, MyPayments);
router.get('/MyStatus', Authenticate, MyStatus);
router.get('/GetMyComplaints', Authenticate, GetMyComplaints);

router.post('/UpdatePass', Authenticate, UpdatePass);
router.post('/NewRequest', Authenticate, NewRequest);
router.post('/NewComplaint', Authenticate, NewComplaint);
router.post('/Paybill', Authenticate, PayBill);

router.delete('/DeleteRequest', Authenticate, DeleteRequest);


router.post('/EnterReading', EnterReading);


export default router;
