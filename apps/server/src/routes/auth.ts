import { Router } from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
} from '../controllers/authController';

const router = Router();

// Register
router.post(
  '/register',
  [
    body('username').isString().isLength({ min: 3, max: 50 }),
    body('password').isString().isLength({ min: 6 }),
    body('role').isIn(['MERCHANT', 'ADMIN']),
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('username').isString(),
    body('password').isString(),
  ],
  login
);

export default router;