// controllers/index.js

// Importa todos los controladores
import userController from "./user/userControllers.js";
import authController from "./auth/authController.js";
import menuController from "./menu/menuControllers.js";
import roleController from "./role/roleController.js";

// Exporta los controladores
export default { userController, authController, menuController ,roleController};
