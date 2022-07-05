import express from 'express'
const router = express.Router()

import { login } from '../controllers/index.js'
import { createFakeDepartments, createFakeEmployees } from '../controllers/faker.js'
import { getAllEmployees  } from "../controllers/employees.js";

router.get('/', getAllEmployees)
router.post("/create-fake-departments", createFakeDepartments)
router.post("/create-fake-employees", createFakeEmployees);
router.get('/login', login)
export default router;