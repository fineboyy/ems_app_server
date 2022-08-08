import mongoose from "mongoose";
import Leave from "../models/leave.js";
import Employee from "../models/employee.js";

export const getAllLeaveApplications = async (req, res) => {
  try {
    const leaves = await Employee.find({}).select('leave_applications -_id');
    const leavesArr = []
    leaves.map((leaveObject) => {
      const arrayfromLeaveObject = leaveObject.leave_applications
      leavesArr.push(...arrayfromLeaveObject)
    })
    return res.status(200).json(leavesArr);
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: "Could Not Get All Leaves" });
  }
};

export const createLeaveApplication = async ({ body }, res) => {
  const leaveData = body;
  try {
    const newLeave = new Leave(leaveData);
    const leaveApplicant = await Employee.findById(leaveData.employee).populate(
      "department"
    );
    if (!leaveApplicant)
    return res.status(404).json({ message: "The employee was not found" });

    //Check if employee already has some unresolved leaves, those should
    // be resolved before a new leave can be requested.

    const unresolvedLeaves = leaveApplicant.leave_applications.filter(
      (application) => application.leave_status === "pending"
    );
    if (unresolvedLeaves?.length) {
      return res
        .status(403)
        .json({ message: "There are existing unresolved leave requests" });
    }

    newLeave.employee_name = leaveApplicant.full_name;
    newLeave.employee_photo = leaveApplicant.photo;
    newLeave.employee_department_name = leaveApplicant.department?.name;
    leaveApplicant.leave_applications.push(newLeave);

    //Update isCurrentlyOnLeaveVariable for Employee
    const isEmployeeOnLeave = newLeave.leave_status === "approved";
    leaveApplicant.is_currently_on_leave = isEmployeeOnLeave;

    await leaveApplicant.save();
    return res.status(201).json(newLeave);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const resolveLeaveApplication = async ({ body }, res) => {
  const { employee_id, leave_id, resolve } = body;
  const resolveKeys = ["approved", "rejected", "pending"];

  if (resolveKeys.indexOf(resolve) === -1) {
    return res.sendStatus(403);
  }

  try {
    const employee = await Employee.findById(employee_id);
    if (!employee)
      return res.status(404).json({ message: "The employee was not found" });

    const foundApplication = employee.leave_applications.find(
      (application) => application._id == leave_id
    );
    if (!foundApplication)
      return res.status(404).json({ message: "Leave Application not found" });
    foundApplication.leave_status = resolve;
    foundApplication.last_modified = new Date()

    const filteredApplications = employee.leave_applications.filter(
      (application) => application._id != leave_id
    );

    const newArr = [ ...filteredApplications, foundApplication ]
    employee.leave_applications = newArr;
    employee.markModified('leave_applications')


    //Update isCurrentlyOnLeaveVariable for Employee
    const isEmployeeOnLeave = foundApplication.leave_status === "approved";
    employee.is_currently_on_leave = isEmployeeOnLeave;

    const savedEmployee = await employee.save();
    return res.status(201).json(foundApplication);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Caught an error in the catch block of the controller.",
      });
  }
};
