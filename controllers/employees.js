import mongoose from "mongoose";
import Employee from "../models/employee.js";
import Department from "../models/department.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
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
  return res.status(404).json({ message: "The Employee Must Have a Department" });
  
  const newEmployee = new Employee(employeeData);
  const employeeDepartment = await Department.findById(newEmployee.department);
  if (employeeDepartment) {
    employeeDepartment.members.push(newEmployee);
    try {
      await employeeDepartment.save();
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await newEmployee.save();
    return res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error });
  }
};
export const getOneEmployee = async ({ params }, res) => {
  const id = params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "The User ID is invalid" });
  try {
    const employee = await Employee.findById(id).populate("department");
    return res.status(200).json(employee);
  } catch (error) {
    return res.json(error);
  }
};

export const updateEmployee = async (req, res) => {};
export const deleteEmployee = async (req, res) => {};
