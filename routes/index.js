import express from 'express'
const router = express.Router()

import { handleNewUser } from '../controllers/registerController.js'
import { handleLogin } from '../controllers/authController.js'
import { createFakeDepartments, createFakeEmployees, createFakeLeaveApplications } from '../controllers/faker.js'
import { handleTokenRefresh } from '../controllers/refreshController.js'
import { handleLogout } from '../controllers/logoutController.js'

router.post('/register', handleNewUser)
router.post('/auth', handleLogin)
router.get('/refresh', handleTokenRefresh)
router.post('/logout', handleLogout)

router.post("/create-fake-departments", createFakeDepartments)
router.post("/create-fake-employees", createFakeEmployees);
router.post("/create-fake-leave-applications", createFakeLeaveApplications);




export default router;