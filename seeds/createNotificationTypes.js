import models  from "../models/index.js";
const {NotificationType}=models

export const createNotificationTypes = async () => {
  const typesData = [
    {
      name: "Security Alert",
      description: "Alerta relacionada con la seguridad de la cuenta",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Payment Reminder",
      description: "Recordatorio para realizar un pago",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "System Maintenance",
      description: "Notificación sobre el mantenimiento programado del sistema",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Subscription Renewal",
      description: "Notificación sobre la renovación de la suscripción",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Feature Update",
      description: "Notificación sobre nuevas características o actualizaciones",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Account Verification",
      description: "Notificación para verificar la cuenta del usuario",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Password Change",
      description: "Notificación sobre el cambio de contraseña",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Event Reminder",
      description: "Recordatorio de eventos importantes",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Promotional Offer",
      description: "Notificación sobre ofertas y promociones especiales",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "User Feedback",
      description: "Notificación solicitando feedback del usuario",
      status: "Active",
      createdAt: new Date(),
    },
  ];

  const createdTypes = [];

  for (const typeData of typesData) {
    const type = new NotificationType(typeData);
    const savedType = await type.save();
    createdTypes.push(savedType);
  }

  console.log("Tipos de notificación creados:", createdTypes);
  return createdTypes;
};