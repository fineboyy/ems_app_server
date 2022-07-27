import express from "express";
const router = express.Router();

import {
  getAllEmployees,
  createEmployee,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeesController.js";

import { createLeaveApplication } from "../controllers/leaveController.js"

router.get("/", getAllEmployees);
router.post("/", createEmployee);

router.route("/:id")
  .get(getOneEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee)
  
router.post("/:id/apply_leave", createLeaveApplication);

export default router;
