
//routes/index.js
import express from "express";
import authRoutes from '../routes/auth/auth.js'
import userRoutes from '../routes/user/user.js'
import menuRoutes from '../routes/menu/menu.routes.js'
import roleRoutes from '../routes/role/role.routes.js'
const router = express.Router()

router.use('/auth',authRoutes)
router.use('/users',userRoutes)
router.use('/menus',menuRoutes)
router.use('/roles',roleRoutes)

export default router

