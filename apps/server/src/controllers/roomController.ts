import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

// Add room to hotel
export const addRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { hotelId } = req.params;
    const {
      name,
      area,
      bedType,
      windowType,
      hasBreakfast,
      cancelPolicy,
      priceWeekday,
      priceHoliday,
      stock,
    } = req.body;

    // Verify hotel belongs to merchant
    const hotel = await prisma.hotel.findFirst({
      where: {
        id: hotelId,
        merchantId: req.user!.id,
      },
    });

    if (!hotel) {
      return res.status(404).json(errorResponse('Hotel not found', 404));
    }

    const room = await prisma.room.create({
      data: {
        name,
        area,
        bedType,
        windowType,
        hasBreakfast,
        cancelPolicy,
        priceWeekday,
        priceHoliday,
        stock,
        hotelId,
      },
    });

    res.status(201).json(successResponse(room, 'Room added successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to add room'));
  }
};

// Update room
export const updateRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { hotelId, roomId } = req.params;
    const updateData = req.body;

    // Verify hotel belongs to merchant
    const hotel = await prisma.hotel.findFirst({
      where: {
        id: hotelId,
        merchantId: req.user!.id,
      },
    });

    if (!hotel) {
      return res.status(404).json(errorResponse('Hotel not found', 404));
    }

    // Check if room exists and belongs to hotel
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
        hotelId,
      },
    });

    if (!room) {
      return res.status(404).json(errorResponse('Room not found', 404));
    }

    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: updateData,
    });

    res.json(successResponse(updatedRoom, 'Room updated successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to update room'));
  }
};

// Delete room
export const deleteRoom = async (req: AuthRequest, res: Response) => {
  try {
    const { hotelId, roomId } = req.params;

    // Verify hotel belongs to merchant
    const hotel = await prisma.hotel.findFirst({
      where: {
        id: hotelId,
        merchantId: req.user!.id,
      },
    });

    if (!hotel) {
      return res.status(404).json(errorResponse('Hotel not found', 404));
    }

    await prisma.room.delete({
      where: {
        id: roomId,
        hotelId,
      },
    });

    res.json(successResponse(null, 'Room deleted successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to delete room'));
  }
};

// Get rooms by hotel (public)
export const getRoomsByHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;

    const rooms = await prisma.room.findMany({
      where: { hotelId },
      orderBy: {
        priceWeekday: 'asc',
      },
    });

    res.json(successResponse(rooms));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to get rooms'));
  }
};