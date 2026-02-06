import { Router } from 'express';
import { body } from 'express-validator';
import {
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomsByHotel,
} from '../controllers/roomController';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = Router({ mergeParams: true });

// Public route
router.get('/', getRoomsByHotel);

// Protected routes - Merchant only
router.post(
  '/',
  authMiddleware,
  requireRole(['MERCHANT']),
  [
    body('name').isString(),
    body('priceWeekday').isFloat({ min: 0 }),
    body('priceHoliday').isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
  ],
  addRoom
);

router.put(
  '/:roomId',
  authMiddleware,
  requireRole(['MERCHANT']),
  updateRoom
);

router.delete(
  '/:roomId',
  authMiddleware,
  requireRole(['MERCHANT']),
  deleteRoom
);

export default router;