// User Role
export enum UserRole {
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

// Hotel Status
export enum HotelStatus {
  PENDING = 'PENDING',    // 审核中
  APPROVED = 'APPROVED',  // 已通过（已发布）
  REJECTED = 'REJECTED',  // 不通过
  OFFLINE = 'OFFLINE',    // 已下线
}

// Star Level
export enum StarLevel {
  ECONOMY = 'ECONOMY',    // 经济型
  COMFORT = 'COMFORT',    // 舒适型
  HIGH_END = 'HIGH_END',  // 高档型
  LUXURY = 'LUXURY',      // 豪华型
}

// Hotel Tags
export enum Tag {
  FAMILY = 'FAMILY',            // 亲子
  LUXURY_TAG = 'LUXURY',        // 豪华
  FREE_PARKING = 'FREE_PARKING', // 免费停车
  SEA_VIEW = 'SEA_VIEW',        // 海景
  BREAKFAST = 'BREAKFAST',      // 含早餐
  FREE_CANCEL = 'FREE_CANCEL',  // 可取消
}

// Bed Type
export enum BedType {
  SINGLE = 'SINGLE',  // 单人床
  DOUBLE = 'DOUBLE',  // 大床
  TWIN = 'TWIN',      // 双床
  QUEEN = 'QUEEN',    // Queen size
  KING = 'KING',      // King size
}

// Window Type
export enum WindowType {
  YES = 'YES',    // 有窗
  NO = 'NO',      // 无窗
  INNER = 'INNER', // 内窗
}