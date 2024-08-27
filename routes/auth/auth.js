// routes/auth/auth.js
import express from 'express';
import controllers from '../../controllers/index.js'

const {authController} = controllers
const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Ruta para el registro de usuarios
router.post('/signup', authController.signup);

// Exporta el router como valor predeterminado
export default router
