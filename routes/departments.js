import express from "express";
const router = express.Router();

import { getAllDepartments, getOneDepartment } from '../controllers/departmentsController.js'


router.get('/', getAllDepartments)
router.get('/:id', getOneDepartment)


export default router;