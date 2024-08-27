import express from 'express';
import controllers from '../../controllers/index.js'
const {roleController} = controllers
const router = express.Router();
router.get('/', roleController.getAllRoles);
router.post('/create', roleController.createRole);

// Exporta el router como valor predeterminado
export default router
