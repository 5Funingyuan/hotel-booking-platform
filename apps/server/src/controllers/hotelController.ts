import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';
import { HotelStatus, StarLevel } from '@prisma/client';

// Helper function to safely parse JSON string
const safeJSONParse = (str: string | null | undefined, defaultValue: any[] = []): any[] => {
  if (!str) return defaultValue;
  try {
    return JSON.parse(str);
  } catch {
    return defaultValue;
  }
};

// Create hotel (Merchant only)
export const createHotel = async (req: AuthRequest, res: Response) => {
  try {
    const {
      name,
      starLevel,
      province,
      city,
      district,
      address,
      contactPhone,
      description,
      tags,
      images,
      mainImage,
      latitude,
      longitude,
      rooms,
    } = req.body;

    // 拼接完整地址
    const fullAddress = `${province}${city}${district || ''}${address}`;

    const hotel = await prisma.hotel.create({
      data: {
        name,
        starLevel: starLevel as StarLevel,
        province,
        city,
        district,
        address,
        fullAddress,
        contactPhone,
        description,
        tags: JSON.stringify(tags || []),
        images: JSON.stringify(images || []),
        mainImage,
        latitude,
        longitude,
        merchantId: req.user!.id,
        rooms: {
          create: rooms?.map((room: any) => ({
            name: room.name,
            area: room.area,
            bedType: room.bedType,
            windowType: room.windowType,
            hasBreakfast: room.hasBreakfast,
            cancelPolicy: room.cancelPolicy,
            priceWeekday: room.priceWeekday,
            priceHoliday: room.priceHoliday,
            stock: room.stock,
          })),
        },
      },
      include: {
        rooms: true,
      },
    });

    // Parse JSON strings back to arrays for response
    const hotelResponse = {
      ...hotel,
      tags: safeJSONParse(hotel.tags as unknown as string),
      images: safeJSONParse(hotel.images as unknown as string),
    };

    res.status(201).json(successResponse(hotelResponse, 'Hotel created successfully'));
  } catch (error: any) {
    console.error('Create hotel error:', error);
    console.error('Request body:', req.body);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json(errorResponse(`Failed to create hotel: ${error.message || 'Unknown error'}`));
  }
};

// Update hotel (Merchant only, only editable when not approved)
export const updateHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      starLevel,
      province,
      city,
      district,
      address,
      contactPhone,
      description,
      tags,
      images,
      mainImage,
      latitude,
      longitude,
    } = req.body;

    // Check if hotel exists and belongs to merchant
    const existingHotel = await prisma.hotel.findFirst({
      where: {
        id,
        merchantId: req.user!.id,
      },
    });

    if (!existingHotel) {
      return res.status(404).json(errorResponse('Hotel not found', 404));
    }

    // Only allow editing when status is PENDING or REJECTED
    if (existingHotel.status === 'APPROVED') {
      return res.status(400).json(
        errorResponse('Cannot edit published hotel. Please offline it first.', 400)
      );
    }

    // 拼接完整地址
    const fullAddress = `${province}${city}${district || ''}${address}`;

    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        name,
        starLevel: starLevel as StarLevel,
        province,
        city,
        district,
        address,
        fullAddress,
        contactPhone,
        description,
        tags: JSON.stringify(tags || []),
        images: JSON.stringify(images || []),
        mainImage,
        latitude,
        longitude,
        status: HotelStatus.PENDING, // Reset to pending after edit
      },
      include: {
        rooms: true,
      },
    });

    // Parse JSON strings back to arrays for response
    const hotelResponse = {
      ...hotel,
      tags: safeJSONParse(hotel.tags as unknown as string),
      images: safeJSONParse(hotel.images as unknown as string),
    };

    res.json(successResponse(hotelResponse, 'Hotel updated successfully'));
  } catch (error: any) {
    console.error('Update hotel error:', error);
    console.error('Error message:', error.message);
    res.status(500).json(errorResponse(`Failed to update hotel: ${error.message || 'Unknown error'}`));
  }
};

// Get hotel list (for mobile - public, for merchant - own hotels, for admin - all)
export const getHotels = async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      status,
      starLevel,
      minPrice,
      maxPrice,
      tags,
      keyword,
      province,
      city,
      district,
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    // Build where clause
    const where: any = {};

    // For mobile users, only show approved hotels
    if (!req.user || req.user.role === 'MERCHANT') {
      if (req.user?.role === 'MERCHANT') {
        where.merchantId = req.user.id;
      } else {
        // Public access - only approved
        where.status = HotelStatus.APPROVED;
      }
    }

    // If specific status requested (for admin/merchant)
    // Note: Must check after setting merchantId to avoid overwriting it
    if (status && req.user) {
      where.status = status as HotelStatus;
    }

    if (starLevel) {
      const levels = (starLevel as string)
        .split(',')
        .map((level) => level.trim())
        .filter(Boolean) as StarLevel[];
      if (levels.length === 1) {
        where.starLevel = levels[0];
      } else if (levels.length > 1) {
        where.starLevel = { in: levels };
      }
    }

    const andConditions: any[] = [];

    if (tags) {
      const tagList = (tags as string)
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (tagList.length > 0) {
        andConditions.push({
          OR: tagList.map((tag) => ({
            tags: { contains: `"${tag}"` },
          })),
        });
      }
    }

    if (keyword) {
      andConditions.push({
        OR: [
          { name: { contains: keyword as string } },
          { address: { contains: keyword as string } },
          { fullAddress: { contains: keyword as string } },
        ],
      });
    }

    // 按省市县筛选
    if (province) {
      where.province = province as string;
    }
    if (city) {
      const cityValue = (city as string).trim();
      if (cityValue && cityValue !== '全部城市' && cityValue !== '当前位置') {
        where.city = cityValue;
      }
    }
    if (district) {
      where.district = district as string;
    }

    if (andConditions.length === 1) {
      Object.assign(where, andConditions[0]);
    } else if (andConditions.length > 1) {
      where.AND = andConditions;
    }

    const [hotels, total] = await Promise.all([
      prisma.hotel.findMany({
        where,
        skip,
        take,
        include: {
          rooms: {
            select: {
              id: true,
              name: true,
              priceWeekday: true,
              priceHoliday: true,
            },
            orderBy: {
              priceWeekday: 'asc',
            },
          },
          merchant: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.hotel.count({ where }),
    ]);

    // Calculate minimum price for each hotel and parse JSON strings
    const hotelsWithMinPrice = hotels.map((hotel) => {
      const minPrice = hotel.rooms.length > 0
        ? Math.min(...hotel.rooms.map((r) => r.priceWeekday))
        : 0;

      return {
        ...hotel,
        tags: safeJSONParse(hotel.tags as unknown as string),
        images: safeJSONParse(hotel.images as unknown as string),
        minPrice,
      };
    });

    // Filter by price range if specified
    let filteredHotels = hotelsWithMinPrice;
    if (minPrice || maxPrice) {
      filteredHotels = hotelsWithMinPrice.filter((hotel) => {
        const price = hotel.minPrice;
        if (minPrice && price < parseFloat(minPrice as string)) return false;
        if (maxPrice && price > parseFloat(maxPrice as string)) return false;
        return true;
      });
    }

    res.json(
      successResponse({
        list: filteredHotels,
        pagination: {
          page: parseInt(page as string),
          limit: take,
          total,
          totalPages: Math.ceil(total / take),
        },
      })
    );
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json(errorResponse('Failed to get hotels'));
  }
};

// Get hotel detail
export const getHotelDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        rooms: {
          orderBy: {
            priceWeekday: 'asc',
          },
        },
        merchant: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!hotel) {
      return res.status(404).json(errorResponse('Hotel not found', 404));
    }

    // Parse JSON strings back to arrays for response
    const hotelResponse = {
      ...hotel,
      tags: safeJSONParse(hotel.tags as unknown as string),
      images: safeJSONParse(hotel.images as unknown as string),
    };

    res.json(successResponse(hotelResponse));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to get hotel detail'));
  }
};

// Submit hotel for audit
export const submitForAudit = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.update({
      where: {
        id,
        merchantId: req.user!.id,
      },
      data: {
        status: HotelStatus.PENDING,
      },
    });

    res.json(successResponse(hotel, 'Hotel submitted for audit'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to submit for audit'));
  }
};

// Audit hotel (Admin only)
export const auditHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json(errorResponse('Invalid audit status', 400));
    }

    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        status: status as HotelStatus,
        auditReason: status === 'REJECTED' ? reason : null,
        auditedAt: new Date(),
        auditorId: req.user!.id,
      },
    });

    // Create audit record
    await prisma.audit.create({
      data: {
        hotelId: id,
        auditorId: req.user!.id,
        status: status as HotelStatus,
        reason: status === 'REJECTED' ? reason : null,
      },
    });

    res.json(successResponse(hotel, `Hotel ${status.toLowerCase()} successfully`));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to audit hotel'));
  }
};

// Publish hotel (Admin only, after approved)
export const publishHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.update({
      where: {
        id,
        status: HotelStatus.APPROVED,
      },
      data: {
        status: HotelStatus.APPROVED,
      },
    });

    res.json(successResponse(hotel, 'Hotel published successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to publish hotel'));
  }
};

// Offline hotel (Admin only)
export const offlineHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        status: HotelStatus.OFFLINE,
      },
    });

    res.json(successResponse(hotel, 'Hotel offline successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to offline hotel'));
  }
};

// Restore hotel (Admin only)
export const restoreHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.update({
      where: {
        id,
        status: HotelStatus.OFFLINE,
      },
      data: {
        status: HotelStatus.APPROVED,
      },
    });

    res.json(successResponse(hotel, 'Hotel restored successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to restore hotel'));
  }
};

// Delete hotel (Merchant only, only when rejected or pending)
export const deleteHotel = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.findFirst({
      where: {
        id,
        merchantId: req.user!.id,
      },
    });

    if (!hotel) {
      return res.status(404).json(errorResponse('Hotel not found', 404));
    }

    if (hotel.status === 'APPROVED') {
      return res.status(400).json(
        errorResponse('Cannot delete published hotel', 400)
      );
    }

    await prisma.hotel.delete({
      where: { id },
    });

    res.json(successResponse(null, 'Hotel deleted successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to delete hotel'));
  }
};
