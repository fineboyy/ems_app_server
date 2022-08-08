import express from 'express'
const router = express.Router()

import { getAllLeaveApplications, createLeaveApplication, resolveLeaveApplication } from '../controllers/leaveController.js'

router.get('/', getAllLeaveApplications)
router.post('/new', createLeaveApplication)
router.post('/resolve', resolveLeaveApplication)

export default router;