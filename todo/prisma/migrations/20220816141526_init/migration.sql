-- CreateTable
CREATE TABLE `items` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `listId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lists` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `default` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `lists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
