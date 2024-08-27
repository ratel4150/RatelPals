import mongoose from "mongoose";
import NotificationCategory from "../../models/notification/NotificationCategory.js";
import NotificationChannel from "../../models/notification/NotificationChannel.js";
import NotificationHistory from "../../models/notification/NotificationHistorySchema.js";
import NotificationType from "../../models/notification/NotificationTypeSchema.js";
import Role from "../../models/rol/Role.js";
import User from "../../models/user/User.js";
import UserMenu from "../../models/user/UserMenu.js";
import UserProfile from "../../models/user/UserProfile.js";
import UserRole from "../../models/user/UserRole.js";
import NotificationConfig from "../../models/notification/NotificationChannelConfig.js";
import Menu from "../../models/menu/Menu.js";
import Notification from "../../models/notification/Notification.js";

// Conexión a la base de datos
mongoose.connect('mongodb+srv://prueba:1@cluster0.buo0t.mongodb.net/taxiApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
    console.log('Conexión a la base de datos exitosa');
    await seedData();
}).on('error', (error) => {
    console.error('Error de conexión a la base de datos:', error);
});

const clearCollections = async () => {
    try {
        console.log('Limpiando colecciones...');
        await User.deleteMany({});
        console.log('Colección User limpiada');
        await Role.deleteMany({});
        console.log('Colección Role limpiada');
        await Menu.deleteMany({});
        console.log('Colección Menu limpiada');
        await UserProfile.deleteMany({});
        console.log('Colección UserProfile limpiada');
        await UserMenu.deleteMany({});
        console.log('Colección UserMenu limpiada');
        await UserRole.deleteMany({});
        console.log('Colección UserRole limpiada');
        await NotificationType.deleteMany({});
        console.log('Colección NotificationType limpiada');
        await NotificationChannel.deleteMany({});
        console.log('Colección NotificationChannel limpiada');
        await NotificationConfig.deleteMany({});
        console.log('Colección NotificationConfig limpiada');
        await NotificationHistory.deleteMany({});
        console.log('Colección NotificationHistory limpiada');
        await NotificationCategory.deleteMany({});
        console.log('Colección NotificationCategory limpiada');
        await Notification.deleteMany({});
        console.log('Colección Notification limpiada');
    } catch (error) {
        console.error('Error limpiando las colecciones:', error);
        throw error;  // Volver a lanzar el error para que sea manejado por la llamada a `clearCollections`
    }
};

const seedData = async () => {
    try {
        console.log('Iniciando seedData');
        await clearCollections();
        console.log('Datos inicializados con éxito');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close(() => {
            console.log('Conexión a la base de datos cerrada');
        });
    }
};

seedData();