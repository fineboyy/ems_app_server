import express from 'express'
const router = express.Router()

import { login } from '../controllers/indexController.js'
import { createFakeDepartments, createFakeEmployees, createFakeLeaveApplications } from '../controllers/faker.js'
// import { getAllEmployees  } from "../controllers/employees.js";

router.get('/', (req, res) => {res.redirect("/employees")})
router.post("/create-fake-departments", createFakeDepartments)
router.post("/create-fake-employees", createFakeEmployees);
router.post("/create-fake-leave-applications", createFakeLeaveApplications);
router.get('/login', login)
export default router;