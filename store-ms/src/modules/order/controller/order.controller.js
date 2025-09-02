import { Router } from 'express';
const router = Router();
import { createOrder } from '../services/orderService';

router.post('/', async (req, res) => {
    const { customer, date, items } = req.body;
    try {
        const order = await createOrder({ customer, date, items });
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
