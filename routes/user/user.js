// routes/user.js
import express from "express";
import controllers from "../../controllers/index.js";
import middleware from "../../middleware/index.js";
import morgan from "morgan";
import winston from "winston";
import chalk from "chalk"; // Agrega esta línea para importar chalk
import { connect } from "../../services/redis/redisCacheService.js";
import { createRateLimiter } from "../../middleware/rateLimiterMiddleware/createRateLimiter.Middleware.js";

const cacheMiddleware = async (req, res, next) => {
  try {
    // Genera una clave única basada en la URL de la solicitud y los parámetros de consulta
    const cacheKey = `${req.originalUrl || req.url}:${JSON.stringify(
      req.query
    )}`;
    const redisClient = await connect();

    // Intenta obtener los datos desde Redis
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Datos recuperados de la caché:", cachedData);
      res.json(JSON.parse(cachedData));
    } else {
      // Si no hay datos en caché, continúa con la ejecución normal y almacena los resultados en caché al final
      next();
    }
  } catch (error) {
    console.error("Error al interactuar con Redis:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const { userController } = controllers;
const router = express.Router();
router.use(morgan("combined"));
// Configuración de Winston para manejar registros generales
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp()
  ),
});

// Middleware de registro personalizado para registrar información de las solicitudes
const requestLogger = (req, res, next) => {
  const logMessage = `${req.method} ${req.originalUrl}`;
  logger.info(logMessage);
  logger.http(logMessage);
  next();
};

// Aplicar el middleware de registro a todas las rutas
router.use(requestLogger);

// Importa el controlador de usuario

// Define las rutas para las operaciones de usuario
// Rutas para usuarios
// Crear un limitador de tasa personalizado para esta ruta específica
const specificRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 5 // Limitar a 50 solicitudes por ventana
});


router.get(
  "/",
  middleware.authMiddleware.authenticateToken,
  middleware.authMiddleware.checkUserRole(["Driver"]),
  cacheMiddleware,
  async (req, res) => {
    try {
      const { page = 1, limit = 10, role } = req.query;
      const filter = role ? { roles: role } : {};
      const redisClient = await connect();

      const users = await userController.getAllUsersWithPagination(
        page,
        limit,
        filter
      );

      // Almacena los resultados en caché con un tiempo de expiración (por ejemplo, 1 minuto)
      const cacheKey = `${req.originalUrl || req.url}:${JSON.stringify(
        req.query
      )}`;
      await redisClient.set(cacheKey, JSON.stringify(users), "EX", 60);

      res.json(users);
    } catch (error) {
      logger.error(`Error en la ruta GET /users: ${error.message}`);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);
router.get("/:userId/roles", userController.getUserRoles);
router.get(
  "/example",specificRateLimiter,
  middleware.authMiddleware.authenticateToken,
  middleware.authMiddleware.checkUserRole(["Driver"]),
  userController.example
);
router.post("/assignRoleToUser", userController.assignRoleToUser);
router.post("/create", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
// Agrega otras rutas de usuario aquí según tus necesidades

export default router;
