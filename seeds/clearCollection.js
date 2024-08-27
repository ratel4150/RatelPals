import models from "../models/index.js";
const {
  User,
  Role,
  Menu,
  UserProfile,
  UserMenu,
  UserRole,
  NotificationType,
  Notification,
  NotificationConfig,
  NotificationHistory,
  NotificationCategory,
  NotificationChannel,
} = models;
export const clearCollections = async () => {
  console.log("Limpiando colecciones...");
  
  // Simula una limpieza rápida
  await User.deleteMany({});
  await Role.deleteMany({});
  await Menu.deleteMany({});
  await UserProfile.deleteMany({});
  await UserMenu.deleteMany({});
  await UserRole.deleteMany({});
  await NotificationType.deleteMany({});
  await NotificationConfig.deleteMany({});

  await NotificationHistory.deleteMany({});
  await NotificationCategory.deleteMany({});
  await Notification.deleteMany({});
  await NotificationChannel.deleteMany({});

  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Limpia las demás colecciones...
  console.log("Colecciones limpiadas");
};
