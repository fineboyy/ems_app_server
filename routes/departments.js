import express from "express";
const router = express.Router();

import { getAllDepartments } from '../controllers/departments.js'


router.get('/', getAllDepartments)


export default router;