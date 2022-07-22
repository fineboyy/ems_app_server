import mongoose from "mongoose";
import Employee from "../models/employee.js";
import Department from "../models/department.js";

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
    console.log("Successfully Updated Department With New Employee");
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }

  try {
    await newEmployee.save();
    const userWithDepartment = await newEmployee.populate("department", "name")
    return res.status(201).json(userWithDepartment);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
};
export const getOneEmployee = async ({ params }, res) => {
  const id = params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "The User ID is invalid" });
  try {
    const employee = await Employee.findById(id).populate("department", "name");
    return res.status(200).json(employee);
  } catch (error) {
    return res.json(error);
  }
};

export const updateEmployee = async (req, res) => {};
export const deleteEmployee = async (req, res) => {};
