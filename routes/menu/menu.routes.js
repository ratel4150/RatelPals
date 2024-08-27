import express from 'express';
import controllers from '../../controllers/index.js'

const {menuController} = controllers
const router = express.Router();
router.get('/', menuController.getMenus);
router.post('/', menuController.createMenu);

// Exporta el router como valor predeterminado
export default router
