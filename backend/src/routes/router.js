import {Router} from 'express';

import eventRouter from './eventRouter.js';
import authRouter from './authRouter.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use('/events',authMiddleware, eventRouter);

router.use('/', authRouter);

export default router;