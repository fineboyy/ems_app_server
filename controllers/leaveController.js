import mongoose from "mongoose";
import Leave from "../models/leave.js";
import Employee from "../models/employee.js";

export const getAllLeaveApplications = async (req, res) => {
  try {
    const leaves = await Leave.find();
    console.log("Leaves", leaves)
    return res.status(200).json(leaves);
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: "Could Not Get All Leaves" });
  }
};

export const createLeaveApplication = async ({ body, params }, res) => {
    console.log("Body", body)
  const leaveData = body;
  console.log("Params ID", params.id);

  try {
    const newLeave = await Leave.create(leaveData);
    const leaveApplicant = await Employee.findById(params.id);
    leaveApplicant.leave_applications.push(newLeave);
    await leaveApplicant.save();
    return res.status(201).json(newLeave);
  } catch (error) {
    return console.log(error);
  }
};
