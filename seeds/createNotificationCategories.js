import models  from "../models/index.js";
const {NotificationCategory}=models
export const createNotificationCategories = async () => {
  const categoriesData = [
    {
      name: "Account",
      description: "Notificaciones relacionadas con la cuenta",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Billing",
      description: "Notificaciones relacionadas con facturación",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Security",
      description: "Notificaciones relacionadas con la seguridad de la cuenta",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "System Updates",
      description: "Notificaciones sobre actualizaciones del sistema",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Marketing",
      description: "Notificaciones sobre ofertas y promociones",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Support",
      description: "Notificaciones relacionadas con el soporte técnico",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Reminders",
      description: "Notificaciones de recordatorios importantes",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Alerts",
      description: "Notificaciones sobre alertas y eventos críticos",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Feedback",
      description: "Notificaciones relacionadas con el feedback del usuario",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Subscription",
      description: "Notificaciones sobre suscripciones y cambios",
      status: "Active",
      createdAt: new Date(),
    },
  ];

  const createdCategories = [];

  for (const categoryData of categoriesData) {
    const category = new NotificationCategory(categoryData);
    const savedCategory = await category.save();
    createdCategories.push(savedCategory);
  }

  console.log("Categorías de notificación creadas:", createdCategories);
  return createdCategories;
};