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
router.get("/:id", getOneEmployee);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/:id/apply_leave", createLeaveApplication);

export default router;
