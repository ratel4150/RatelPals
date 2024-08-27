// Crear una nueva notificación

import mongoose from '../../config/database.js';
import { io } from '../../index.js';
import Notification from '../../models/notification/Notification.js';
import ChannelConfig from '../../models/notification/NotificationChannelConfig.js';
import { faker } from '@faker-js/faker';
// Crear una nueva notificación

export async function createNotification(data) {
  try {
    // Crear y guardar la nueva notificación
    console.log('Creating new notification with data:', data);
    const newNotification = new Notification(data);
    await newNotification.save();

    // Agregar al historial de notificaciones
    const historyEntry = await newNotification.addHistory('Created', 'Notification created');
    console.log('Notification history entry created:', historyEntry);

   

    // Registrar mensaje de éxito
    console.log('Notification created successfully:', newNotification);

    // Retornar la notificación
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}
  
  // Enviar notificación
  export async function sendNotification(notificationId) {
    try {
      const notification = await Notification.findById(notificationId).populate('channels');
  
      if (!notification) {
        throw new Error('Notification not found');
      }
  
      const sendPromises = notification.channels.map(async (channelConfigId) => {
        const channelConfig = await ChannelConfig.findById(channelConfigId).populate('channel');
        if (channelConfig && channelConfig.channel && channelConfig.channel.active) {
          switch (channelConfig.channel.name) {
            case 'Email':
              return sendEmail(notification, channelConfig);
            case 'SMS':
              return sendSMS(notification, channelConfig);
            case 'Push':
              return sendPushNotification(notification, channelConfig);
            case 'InApp':
              return sendInAppNotification(notification, channelConfig);
            default:
              throw new Error('Unknown notification channel');
          }
        }
      });
  
      const results = await Promise.allSettled(sendPromises);
  
      const errors = results.filter(result => result.status === 'rejected').map(result => result.reason);
  
      if (errors.length > 0) {
        // Registrar errores en el historial de notificaciones
        await notification.addHistory('Error', `Errors occurred: ${errors.join(', ')}`);
      } else {
        notification.status = 'Sent';
        notification.sentAt = new Date();
        await notification.save();
  
        // Agregar al historial de notificaciones
        await notification.addHistory('Sent', 'Notification sent');
      }
  
      return { notification, errors };
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
  
  // Gestionar notificaciones recurrentes
  export async function manageRecurringNotifications() {
    try {
      const now = new Date();
      const notifications = await Notification.find({
        'recurrence.frequency': { $exists: true },
        scheduledAt: { $lte: now },
        status: 'Pending'
      });
  
      const createPromises = notifications.map(async (notification) => {
        const nextScheduledAt = calculateNextSchedule(notification.scheduledAt, notification.recurrence);
  
        if (nextScheduledAt && (!notification.recurrence.endDate || nextScheduledAt <= notification.recurrence.endDate)) {
          const newNotification = new Notification({
            ...notification.toObject(),
            _id: undefined,
            createdAt: undefined,
            readAt: undefined,
            sentAt: undefined,
            status: 'Pending',
            scheduledAt: nextScheduledAt,
          });
  
          await newNotification.save();
  
          // Agregar al historial de notificaciones
          await newNotification.addHistory('Created', 'Recurring notification created');
  
          return newNotification;
        }
      });
  
      await Promise.allSettled(createPromises);
    } catch (error) {
      console.error('Error managing recurring notifications:', error);
      throw error;
    }
  }
  
  // Calcular la próxima fecha de programación para una notificación recurrente
  function calculateNextSchedule(currentDate, recurrence) {
    const nextDate = new Date(currentDate);
    switch (recurrence.frequency) {
      case 'Daily':
        nextDate.setDate(nextDate.getDate() + recurrence.interval);
        break;
      case 'Weekly':
        nextDate.setDate(nextDate.getDate() + (recurrence.interval * 7));
        break;
      case 'Monthly':
        nextDate.setMonth(nextDate.getMonth() + recurrence.interval);
        break;
      case 'Yearly':
        nextDate.setFullYear(nextDate.getFullYear() + recurrence.interval);
        break;
      default:
        return null;
    }
    return nextDate;
  }
  
  // Actualizar el estado de una notificación
  export async function updateNotificationStatus(notificationId, status) {
    try {
      const notification = await Notification.findById(notificationId);
  
      if (!notification) {
        throw new Error('Notification not found');
      }
  
      notification.status = status;
      await notification.save();
  
      // Agregar al historial de notificaciones
      await notification.addHistory('Status Update', `Notification status updated to ${status}`);
  
      return notification;
    } catch (error) {
      console.error('Error updating notification status:', error);
      throw error;
    }
  }
  
  // Manejar canales de notificación (ejemplos básicos de funciones)
  export async function sendEmail(notification, channelConfig) {
    // Lógica para enviar un correo electrónico
    console.log('Sending email:', notification.message);
  }
  
  export async function sendSMS(notification, channelConfig) {
    // Lógica para enviar un SMS
    console.log('Sending SMS:', notification.message);
  }
  
  export async function sendPushNotification(notification, channelConfig) {
    // Lógica para enviar una notificación push
    console.log('Sending push notification:', notification.message);
  }
  
  export async function sendInAppNotification(notification, channelConfig) {
    // Lógica para enviar una notificación dentro de la aplicación
    console.log('Sending in-app notification:', notification.message);
  }
  
  // Ejemplo de ejecución de funciones
 // Ejemplo de ejecución de funciones usando Faker
async function testNotificationFunctions() {
    try {
      // Crear datos falsos con Faker
      const userId = new mongoose.Types.ObjectId('66a557f3c706c7c97914240c'); // Suponiendo que ya tienes un usuario creado con este ID
    const typeId = new mongoose.Types.ObjectId('66a557d0c706c7c979142293'); // Suponiendo que ya tienes un tipo de notificación creado con este ID
    const categoryId = new mongoose.Types.ObjectId('66a557d1c706c7c979142299'); // Suponiendo que ya tienes una categoría de notificación creada con este ID
    const channelId = new mongoose.Types.ObjectId('66a50c756ef2aed73ca18db1'); // Suponiendo que ya tienes un canal de notificación creado con este ID
  
      // Crear una nueva notificación con datos falsos
      const newNotification = await createNotification({
        user: userId,
        type: typeId,
        image:faker.image.avatar,
        category: categoryId,
        message: "prueba11",
        channels: [channelId],
        scheduledAt: faker.date.future(),
        read:false,
        recurrence: {
          frequency: faker.helpers.arrayElement(['Daily', 'Weekly', 'Monthly', 'Yearly']),
          interval: faker.number.int({ min: 1, max: 12 }),
        },
      });
  
      console.log('Notification created:', newNotification);

  
      // Enviar notificación
      const { notification, errors } = await sendNotification(newNotification._id);
      console.log('Notification sent:', notification);
      if (errors.length > 0) {
        console.error('Errors occurred during sending:', errors);
      }
  
      // Gestionar notificaciones recurrentes
      await manageRecurringNotifications();
      console.log('Recurring notifications managed');
  
      // Actualizar estado de notificación
      const updatedNotification = await updateNotificationStatus(newNotification._id, 'Archived');
      console.log('Notification status updated:', updatedNotification);
    } catch (error) {
      console.error('Error during testing:', error);
    }
  }
  
  // Ejecutar prueba
/*   testNotificationFunctions(); */