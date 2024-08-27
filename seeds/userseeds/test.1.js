import User from "../../models/user/User.js";
import Role from "../../models/rol/Role.js";
import Menu from "../../models/menu/Menu.js";
import UserProfile from "../../models/user/UserProfile.js";
import UserMenu from "../../models/user/UserMenu.js";
import UserRole from "../../models/user/UserRole.js";
import NotificationType from "../../models/notification/NotificationTypeSchema.js";
import NotificationChannel from "../../models/notification/NotificationChannel.js";
import NotificationHistory from "../../models/notification/NotificationHistorySchema.js";
import NotificationCategory from "../../models/notification/NotificationCategory.js";

import ChannelConfig from "../../models/notification/NotificationChannelConfig.js";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Notification from "../../models/notification/Notification.js";


// Conexión a la base de datos
mongoose.connect(
  "mongodb+srv://prueba:1@cluster0.buo0t.mongodb.net/taxiApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection
  .once("open", async () => {
    console.log("Conexión a la base de datos exitosa");
    try {
      await seedData();
      console.log("seedData llamada correctamente");
    } catch (error) {
      console.error("Error al ejecutar seedData:", error);
    } finally {
      try {
        await mongoose.connection.close();
        console.log("Conexión a la base de datos cerrada");
      } catch (closeError) {
        console.error(
          "Error cerrando la conexión a la base de datos:",
          closeError
        );
      }
    }
  })
  .on("error", (error) => {
    console.error("Error de conexión a la base de datos:", error);
  });

const clearCollections = async () => {
  console.log("Limpiando colecciones...");
  // Simula una limpieza rápida
     await User.deleteMany({});
    await Role.deleteMany({});
    await Menu.deleteMany({});
    await UserProfile.deleteMany({});
    await UserMenu.deleteMany({});
    await UserRole.deleteMany({});
    await NotificationType.deleteMany({});
  await ChannelConfig.deleteMany({});
  await new Promise((resolve) => setTimeout(resolve, 1000));
    await NotificationHistory.deleteMany({});
    await NotificationCategory.deleteMany({}); 
    await Notification.deleteMany({})
    await NotificationChannel.deleteMany({})

  console.log("Colecciones limpiadas");
};


const createNotificationChannels = async () => {
  const channels = [
    { name: 'Email', description: 'Canal de notificación por correo electrónico' },
    { name: 'SMS', description: 'Canal de notificación por mensaje de texto' },
    { name: 'Push', description: 'Canal de notificación por notificación push' },
    { name: 'InApp', description: 'Canal de notificación dentro de la aplicación' },
    { name: 'WhatsApp', description: 'Canal de notificación por WhatsApp' },
  ];

  const createdChannels = await NotificationChannel.insertMany(channels);
  console.log("Canales de notificación creados:", createdChannels);
  return createdChannels;
};

const createRoles = async () => {
  const roles = [
    {
      _id: new mongoose.Types.ObjectId("667d4d00c4d2d6e63616a00c"),
      name: "Driver",
      description: "Driver",
      permissions: ["accessDashboard"],
      status: "Active",
      createdAt: new Date(),
    },
    {
      _id: new mongoose.Types.ObjectId("667f315393a243dd60a750d2"),
      name: "Passenger",
      description:
        "Usuario que utiliza la aplicación para solicitar y pagar por servicios de transporte.",
      permissions: ["accessDashboard"],
      status: "Active",
      createdAt: new Date(),
    },
  ];
  await Role.insertMany(roles);
  console.log("Roles creados");
  return roles;
};

const createMenu = async () => {
  const menu = new Menu({
    _id: new mongoose.Types.ObjectId("668eea62e8cc804c5bf8e8db"),
    title: "Configuración",
    link: "/settings",
    icon: "settings-icon",
    active: false,
    submenus: [
      {
        title: "Configuración General",
        link: "settings/general",
        icon: "general-icon",
        active: false,
      },
      {
        title: "Perfil de Usuario",
        link: "account",
        icon: "profile-icon",
        active: false,
      },
      {
        title: "Configuración de la App",
        link: "settings/app",
        icon: "app-icon",
        active: false,
      },
      {
        title: "Seguridad",
        link: "settings/security",
        icon: "security-icon",
        active: false,
      },
      {
        title: "Notificaciones",
        link: "settings/notifications",
        active: false,
      },
      {
        title: "Integraciones",
        link: "settings/integrations",
        icon: "integrations-icon",
        active: false,
      },
      {
        title: "Gestión de Permisos",
        link: "settings/permissions",
        icon: "permissions-icon",
        active: false,
      },
      {
        title: "Configuración de Alertas",
        link: "settings/alerts",
        icon: "alerts-icon",
        active: false,
      },
    ],
    createdAt: new Date(),
  });
  await menu.save();
  console.log("Menú creado");
  return menu;
};

const createNotificationTypes = async () => {
  const notificationTypes = [];
  const existingNames = new Set();

  while (notificationTypes.length < 5) {
    const name = faker.lorem.word();

    // Verifica si el nombre ya existe
    if (existingNames.has(name)) {
      continue; // Si el nombre ya existe, generar uno nuevo
    }

    existingNames.add(name);

    const notificationType = new NotificationType({
      name,
      description: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });

    notificationTypes.push(await notificationType.save());
  }

  console.log("Tipos de notificaciones creados", notificationTypes);
  return notificationTypes;
};

const createNotificationCategories = async () => {
  const notificationCategories = [];
  const existingNames = new Set();

  while (notificationCategories.length < 5) {
    const name = faker.lorem.word();

    // Verifica si el nombre ya existe
    if (existingNames.has(name)) {
      continue; // Si el nombre ya existe, generar uno nuevo
    }

    existingNames.add(name);

    const notificationCategory = new NotificationCategory({
      name,
      description: faker.lorem.sentence(),
    });

    notificationCategories.push(await notificationCategory.save());
  }

  console.log("Categorías de notificaciones creadas", notificationCategories);
  return notificationCategories;
};

const createUsersAndUserProfile = async (
  roles,
  menu,
  notificationTypes,
  notificationCategories,
  channels
) => {
  const users = []; // Lista para almacenar todos los usuarios creados
  for (let i = 0; i < 10; i++) {


    const user = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      profileImage: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });

    console.log(user);

    const savedUser = await user.save();
    users.push(savedUser); // Agregar usuario a la lista

    // Crear UserMenu
    const userMenu = new UserMenu({
      user: savedUser._id,
      menu: menu._id,
      assignedBy: savedUser._id,
    });
    await userMenu.save();

    // Asignar roles aleatorios al usuario
    const randomRoles = faker.helpers
      .shuffle(roles)
      .slice(0, faker.number.int({ min: 1, max: roles.length }));
    for (const role of randomRoles) {
      const userRole = new UserRole({
        user: savedUser._id,
        role: role._id,
        assignedBy: savedUser._id,
      });
      await userRole.save();
    }

    // Crear varias notificaciones aleatorias para cada usuario
    for (let j = 2; j < 10; j++) {
      // Crear NotificationChannel
     
      const randomChannel = faker.helpers.arrayElement(channels);

      // Crear NotificationConfig
      const channelConfig = new ChannelConfig({
        channel: randomChannel._id,
        retries: faker.number.int({ min: 1, max: 5 }),
        sendTime: faker.date.future(),
        expirationTime: faker.date.future(),
        additionalConfig: {
          key1: faker.lorem.word(),
          key2: faker.lorem.word(),
        },
      });
      const savedChannelConfig = await channelConfig.save();

      // Seleccionar un receptor aleatorio de la lista de usuarios
      const randomReceiver = faker.helpers.arrayElement(users);

      // Crear Notification
      const notification = new Notification({
        sender: savedUser._id,
        receiver: randomReceiver._id, // Asigna un receptor aleatorio
        title: faker.lorem.words(5), // Genera un título aleatorio
        type: faker.helpers.arrayElement(notificationTypes)._id,
        category: faker.helpers.arrayElement(notificationCategories)._id,
        message: faker.lorem.sentence(),
        link: faker.internet.url(),
        image: faker.image.avatarLegacy(),
        priority: faker.helpers.arrayElement([
          "Low",
          "Normal",
          "High",
          "Critical",
        ]),
        channels: [savedChannelConfig._id],
        createdAt: faker.date.past(),
        readAt: faker.date.recent(),
        read: faker.datatype.boolean(),
        additionalInfo: {
          key1: faker.lorem.word(),
          key2: faker.lorem.word(),
        },
        history: [], // Iniciar con un array vacío
      });
      const savedNotification = await notification.save();

      // Crear NotificationHistory
      const notificationHistory = new NotificationHistory({
        notification: savedNotification._id,
        action: faker.helpers.arrayElement([
          "Created",
          "Sent",
          "Read",
          "Failed",
        ]),
        timestamp: faker.date.past(),
        details: faker.lorem.sentence(),
      });
      await notificationHistory.save();

      // Agregar el historial a la notificación
      savedNotification.history.push(notificationHistory._id);
      await savedNotification.save();
    }

    // Crear UserProfile
    const userProfile = new UserProfile({
      user: savedUser._id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      fullName: faker.person.fullName(),
      dateOfBirth: faker.date.past(),
      gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
      },
      phoneNumbers: [faker.phone.number()],
      interests: [faker.word.words(), faker.word.words()],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      status: faker.helpers.arrayElement([
        "PendingVerification",
        "Active",
        "Inactive",
        "Complete Profile",
        "Incomplete Profile",
        "Available for Service",
        "Not Available for Service",
        "Pending Interview",
        "Pending Job Assignment",
        "Assigned Job",
        "Job Completed",
        "Pending Payment",
        "Payment Received",
        "Vehicle Maintenance",
        "On Break",
        "On Duty",
        "Off Duty",
      ]),
    });

    await userProfile.save();
  }
};

const seedData = async () => {
  console.log("Iniciando seedData");
  try {
     await clearCollections();
     const channels = await createNotificationChannels();
    const roles = await createRoles();
    
    const menu = await createMenu();
    const notificationTypes = await createNotificationTypes();
    const notificationCategories = await createNotificationCategories();
    await createUsersAndUserProfile(
      roles,
      menu,
      notificationTypes,
      notificationCategories,
      channels
    );
    console.log("Datos inicializados con éxito");
  } catch (error) {
    console.error("Error durante la limpieza de colecciones:", error);
  }
};
