import mongoose from "mongoose";
import Employee from "../models/employee.js";
import Department from "../models/department.js";

import moment from "moment";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department", "name");
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return res.status(503).json({ message: "Could Not Get All Employees" });
  }
};

export const createEmployee = async ({ body }, res) => {
  const employeeData = body;
  employeeData.full_name = `${employeeData.first_name} ${employeeData.last_name}`;

  if (!mongoose.Types.ObjectId.isValid(employeeData.department))
    return res
      .status(404)
      .json({ message: "The Employee Must Have a Valid Department" });

  const newEmployee = new Employee(employeeData);
  const employeeDepartment = await Department.findOne({
    _id: newEmployee.department,
  }).exec();

  if (!employeeDepartment)
    return res
      .status(404)
      .json({ message: "The Provided User Department was not Found" });
  employeeDepartment.members.push(newEmployee._id);
  try {
    await employeeDepartment.save();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }

  try {
    await newEmployee.save();
    const userWithDepartment = await newEmployee.populate("department", "name");
    return res.status(201).json(userWithDepartment);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
};

export const getOneEmployee = async ({ params }, res) => {
  const id = params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "The Employee ID is invalid" });

  try {
    const employee = await Employee.findById(id).populate("department", "name");
    if(!employee) return res.sendStatus(404)

    //IF employee isCurrentlyOnLeaveVariable is set to true but the end date of the
    //last recorded leave application is past due, update the isCurrentlyOnLeaveVariable to false
    const lastAppliedLeave =
      employee.leave_applications[employee.leave_applications.length - 1];

    if (
      moment().isAfter(lastAppliedLeave?.leave_to) &&
      employee.is_currently_on_leave
    ) {
      employee.is_currently_on_leave = false;
      res.status(200).json(employee);
      const savedEmployee = await employee.save();
    } else {
      return res.status(200).json(employee);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const updateEmployee = async (req, res) => {};
export const deleteEmployee = async ({ body, params }, res) => {
  const employee_id = params.id;
  const department_id = body.department_id;

  if (!employee_id || !department_id) return res.sendStatus(400);
  if (!mongoose.Types.ObjectId.isValid(employee_id)) return res.sendStatus(404);
  if (!mongoose.Types.ObjectId.isValid(department_id))
    return res.sendStatus(404);

  try {
    const foundEmployee = await Employee.findById(employee_id);
    if (!foundEmployee) return res.sendStatus(404);
    const foundDepartment = await Department.findById(department_id);
    if (!foundDepartment) return res.sendStatus(404);

    const newMembers = foundDepartment.members.filter(
      (member) => member._id !== employee_id
    );
    await Department.updateOne({ _id: department_id }, { members: newMembers });
    await Employee.deleteOne({ _id: employee_id });
    return res.sendStatus(204);
  } catch (error) {
    return res.json(error);
  }
};
