import mongoose from "mongoose";
import Employee from "../models/employee.js";
import Department from "../models/department.js";
import Leave from "../models/leave.js";
import {
  createDepartment,
  createRandomEmployee,
  createRandomLeave,
  departmentsArray,
} from "../faker.js";

function returnRandomFrom(list) {
  if (list.length === 0) return;
  return list[Math.floor(Math.random() * list.length)];
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createFakeDepartments = async (req, res) => {
  let arr = [];
  departmentsArray.map((e) => {
    const department = new Department();
    department.name = e;
    arr.push(department);
  });
  try {
    const newDepartments = await Department.insertMany(arr);
    res.json(newDepartments);
  } catch (error) {
    res.json(error);
  }
};

export const createFakeEmployees = async (req, res) => {
  console.log("Creating......");
  const departments = await Department.find();
  const employeesArr = [];
  const updatedDepartmentsArr = [];
  Array.from({ length: 70 }).forEach(async () => {
    const randomDepartment = departments[Math.floor(Math.random() * 7)];
    const newEmployee = new Employee(createRandomEmployee());
    newEmployee.department = randomDepartment._id;
    newEmployee.full_name =
      newEmployee.first_name + " " + newEmployee.last_name;
    employeesArr.push(newEmployee);
    randomDepartment.members.push(newEmployee._id);

    try {
      const rand = await randomDepartment.save();
      console.log("Created");
    } catch (error) {
      console.log(error);
    }
  });

  try {
    const allEmployees = await Employee.insertMany(employeesArr);
    return res.json(allEmployees);
  } catch (error) {
    return res.json(error);
  }
};

export const createFakeLeaveApplications = async (req, res) => {
  console.log("Creating Random Leave Applications");
  let leavesArr = [];
  let randomEmployeesList = [];

  try {
    var employeesList = await Employee.find().populate("department", "name");

    Array.from({ length: 5 }).map(() => {
      let n = returnRandomFrom(employeesList);
      randomEmployeesList.push(n);
      employeesList.filter((employee) => employee._id !== n._id )
      
      // employeesList = employeesList.filter((employee) => employee._id !== n._id);
    });

    const promises = randomEmployeesList.map(() => {
      const randomEmployee = returnRandomFrom(employeesList);
      if (!randomEmployee) return res.json("Could not find Random Employee");

      const newFakerLeave = createRandomLeave();
      newFakerLeave.employee = randomEmployee._id;
      newFakerLeave.employee_name = randomEmployee.full_name;
      newFakerLeave.employee_photo = randomEmployee.photo;
      newFakerLeave.employee_department_name = randomEmployee.department.name;
      const newLeave = new Leave(newFakerLeave);

      randomEmployee.leave_applications.push(newLeave);
      leavesArr.push(newLeave);

      const employee = randomEmployee.save();
      console.log("Created");
    });

    await Promise.all(promises)

    try {
      // return res.json(leavesArr)
      const newLeavesArr = await Leave.insertMany(leavesArr);
      return res.status(201).json(newLeavesArr);
    } catch (error) {
      return res.json(error);
    }
  } catch (error) {
    return console.log(error);
  }
};
