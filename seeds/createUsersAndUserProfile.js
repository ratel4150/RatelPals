import { faker } from "@faker-js/faker";
import { assignUserMenu } from "./assignUserMenu.js";
import { assignUserRoles } from "./assignUserRoles.js";
import { createChannelConfig } from "./createChannelConfig.js";
import { createNotification } from "./createNotification.js";
import { createNotificationHistory } from "./createNotificationHistory.js";
import { createUser } from "./createUser.js";
import { createUserProfile } from "./createUserProfile.js";

export const createUsersAndUserProfile = async (
    roles,
    menu,
    notificationTypes,
    notificationCategories,
    channels
  ) => {
    const users = [];
  
    // Crea 10 usuarios
    for (let i = 0; i < 10; i++) {
      const user = await createUser();
      users.push(user);
  
      await assignUserMenu(user._id, menu._id);
      await assignUserRoles(user._id, roles);
  
      // Genera un número aleatorio de notificaciones para cada usuario
      const numNotifications = faker.number.int({ min: 6, max: 10 }); // Número aleatorio entre 6 y 10
      console.log(`Creando ${numNotifications} notificaciones para el usuario ${user._id,user.username}`);
  
      // Crea las notificaciones utilizando map y Promise.allSettled
      const notificationPromises = Array.from({ length: numNotifications }).map(async () => {
        try {
          const channelConfig = await createChannelConfig(
            faker.helpers.arrayElement(channels)._id
          );
          const receiver = faker.helpers.arrayElement(users); // Puede ser el mismo usuario o un usuario diferente
          const notification = await createNotification(
            user._id,
            receiver._id,
            faker.helpers.arrayElement(notificationTypes)._id,
            faker.helpers.arrayElement(notificationCategories)._id,
            channelConfig._id
          );
          const history = await createNotificationHistory(notification._id);
          notification.history.push(history._id);
          await notification.save();
        } catch (error) {
          console.error("Error al crear notificación:", error);
        }
      });
  
      // Usa Promise.allSettled para manejar tanto resoluciones como rechazos
      const results = await Promise.allSettled(notificationPromises);
  
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Promesa ${index} fallida con error: ${result.reason}`);
        } else {
          console.log(`Promesa ${index} completada con éxito.`);
        }
      });
  
      // Crea el perfil de usuario
      await createUserProfile(user._id);
    }
  
    console.log("Usuarios y perfiles de usuario creados");
    return users;
  };