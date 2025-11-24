import express from 'express';
import { addcustomer, AllCustomers, AllRequests, GenerateBill, MetersAndUnits, MeterBlocking, updateRequest, BlockMeter, GetComplaints, DeleteComplaint } from '../controllers/adminController.js';
import { Authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/addcustomer', Authenticate, addcustomer);
router.post('/updateRequest', Authenticate, updateRequest);
router.post('/GenerateBill', Authenticate, GenerateBill);
router.post('/BlockMeter', Authenticate, BlockMeter);

router.get('/AllRequests', Authenticate, AllRequests);
router.get('/MetersAndUnits', Authenticate, MetersAndUnits);
router.get('/AllCustomers', Authenticate, AllCustomers);
router.get('/MeterBlocking', Authenticate, MeterBlocking);
router.get('/GetComplaints', Authenticate, GetComplaints);

router.delete('/DeleteComplaint', Authenticate, DeleteComplaint);

export default router;