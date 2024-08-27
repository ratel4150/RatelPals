import express from 'express';
import controllers from '../../controllers/index.js'

const {notificationController,notificationCategoryController,notificationTypeController,notificationChannelController} = controllers
const router = express.Router();
router.get('/channels',notificationChannelController.getAllChannels)
router.get('/types',notificationTypeController.getAllTypes)
router.get('/categories',notificationCategoryController.getAllCategories)
router.get('/:userId', notificationController.getNotificationByUserId);
router.put('/:notificationId', notificationController.updateNotification);
router.post('/create', notificationController.createNotification); 
router.get('/paginated', notificationController.fetchPaginatedNotifications);



// Exporta el router como valor predeterminado
export default router
