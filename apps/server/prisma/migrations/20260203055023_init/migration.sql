-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('MERCHANT', 'ADMIN') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotels` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `star_level` ENUM('ECONOMY', 'COMFORT', 'HIGH_END', 'LUXURY') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `contact_phone` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `tags` VARCHAR(191) NOT NULL DEFAULT '[]',
    `images` VARCHAR(191) NOT NULL DEFAULT '[]',
    `main_image` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'OFFLINE') NOT NULL DEFAULT 'PENDING',
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `audit_reason` TEXT NULL,
    `audited_at` DATETIME(3) NULL,
    `auditor_id` VARCHAR(191) NULL,
    `merchant_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `area` DOUBLE NULL,
    `bed_type` ENUM('SINGLE', 'DOUBLE', 'TWIN', 'QUEEN', 'KING') NOT NULL,
    `window_type` ENUM('YES', 'NO', 'INNER') NOT NULL,
    `has_breakfast` BOOLEAN NOT NULL DEFAULT false,
    `cancel_policy` VARCHAR(191) NULL,
    `price_weekday` DOUBLE NOT NULL,
    `price_holiday` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 10,
    `hotel_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audits` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'OFFLINE') NOT NULL,
    `reason` TEXT NULL,
    `hotel_id` VARCHAR(191) NOT NULL,
    `auditor_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hotels` ADD CONSTRAINT `hotels_merchant_id_fkey` FOREIGN KEY (`merchant_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audits` ADD CONSTRAINT `audits_hotel_id_fkey` FOREIGN KEY (`hotel_id`) REFERENCES `hotels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audits` ADD CONSTRAINT `audits_auditor_id_fkey` FOREIGN KEY (`auditor_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
