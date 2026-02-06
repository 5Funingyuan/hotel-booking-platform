import { Router } from 'express';
import { body } from 'express-validator';
import {
  createHotel,
  updateHotel,
  getHotels,
  getHotelDetail,
  submitForAudit,
  auditHotel,
  offlineHotel,
  restoreHotel,
  deleteHotel,
} from '../controllers/hotelController';
import { authMiddleware, optionalAuthMiddleware, requireRole } from '../middleware/auth';

const router = Router();

// Protected routes - Get hotels (supports both authenticated and public access)
router.get('/', optionalAuthMiddleware, getHotels);
router.get('/:id', getHotelDetail);

// Protected routes - Merchant
router.post(
  '/',
  authMiddleware,
  requireRole(['MERCHANT']),
  [
    body('name').isString().isLength({ min: 1, max: 100 }),
    body('starLevel').isIn(['ECONOMY', 'COMFORT', 'HIGH_END', 'LUXURY']),
    body('address').isString(),
    body('rooms').isArray().optional(),
  ],
  createHotel
);

router.put(
  '/:id',
  authMiddleware,
  requireRole(['MERCHANT']),
  updateHotel
);

router.post(
  '/:id/submit',
  authMiddleware,
  requireRole(['MERCHANT']),
  submitForAudit
);

router.delete(
  '/:id',
  authMiddleware,
  requireRole(['MERCHANT']),
  deleteHotel
);

// Protected routes - Admin
router.post(
  '/:id/audit',
  authMiddleware,
  requireRole(['ADMIN']),
  [
    body('status').isIn(['APPROVED', 'REJECTED']),
    body('reason').optional().isString(),
  ],
  auditHotel
);

router.post(
  '/:id/offline',
  authMiddleware,
  requireRole(['ADMIN']),
  offlineHotel
);

router.post(
  '/:id/restore',
  authMiddleware,
  requireRole(['ADMIN']),
  restoreHotel
);

export default router;