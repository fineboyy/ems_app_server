import express from 'express'
const router = express.Router()

import { getAllLeaveApplications } from '../controllers/leaveController.js'

router.get('/', getAllLeaveApplications)

export default router;