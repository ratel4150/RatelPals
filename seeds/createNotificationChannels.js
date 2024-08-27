import models  from "../models/index.js";
const {NotificationChannel}=models
export const createNotificationChannels = async () => {
  const channelsData = [
    {
      name: "Email",
      description: "Canal para enviar notificaciones por correo electrónico",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "SMS",
      description: "Canal para enviar notificaciones por mensaje de texto",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "WhatsApp",
      description: "Canal para enviar notificaciones por WhatsApp",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "Push Notification",
      description: "Canal para enviar notificaciones push",
      status: "Active",
      createdAt: new Date(),
    },
    {
      name: "In-App Notification",
      description: "Canal para enviar notificaciones dentro de la aplicación",
      status: "Active",
      createdAt: new Date(),
    },
  ];

  const createdChannels = [];

  for (const channelData of channelsData) {
    const channel = new NotificationChannel(channelData);
    const savedChannel = await channel.save();
    createdChannels.push(savedChannel);
  }

  console.log("Canales de notificación creados:", createdChannels);
  return createdChannels;
};