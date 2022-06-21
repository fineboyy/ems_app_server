import express from 'express'
const router = express.Router()

import { login } from '../controllers/index.js'
import { createFakeDepartments, createFakeEmployees } from '../controllers/faker.js'

router.get('/login', login)
router.post("/create-fake-departments", createFakeDepartments)
router.post("/create-fake-employees", createFakeEmployees);
export default router;