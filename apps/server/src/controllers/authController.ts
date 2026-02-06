import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { successResponse, errorResponse } from '../utils/response';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    
    if (existingUser) {
      return res.status(400).json(errorResponse('Username already exists', 400));
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
    
    res.status(201).json(successResponse(user, 'User registered successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Registration failed'));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    });
    
    if (!user) {
      return res.status(401).json(errorResponse('Invalid credentials', 401));
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return res.status(401).json(errorResponse('Invalid credentials', 401));
    }
    
    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json(successResponse({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    }, 'Login successful'));
  } catch (error) {
    res.status(500).json(errorResponse('Login failed'));
  }
};