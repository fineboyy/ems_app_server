import express from "express";
const router = express.Router();

import { getAllDepartments } from '../controllers/departmentsController.js'


router.get('/', getAllDepartments)


export default router;