import express from 'express'
const router = express.Router()

import { getAllEmployees, createEmployee, getOneEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.js'

router.get('/', getAllEmployees)
router.post('/', createEmployee)
router.get('/:id', getOneEmployee)
router.patch('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)


export default router;