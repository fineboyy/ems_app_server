import mongoose from 'mongoose'
import Employee from '../models/employee.js'
import Department from '../models/department.js'
import { createDepartment, createRandomEmployee, departmentsArray } from '../faker.js'







export const createFakeDepartments = async (req, res) => {
    let arr = []
    departmentsArray.map((e) => {
        const department = new Department;
        department.name = e
        arr.push(department)
    })
    try {
        const newDepartments = await Department.insertMany(arr)
        res.json(newDepartments)      
    } catch (error) {
        res.json(error)
    }
}

export const createFakeEmployees = async (req, res) => {
    console.log("Creating......")
    const departments = await Department.find()
    const employeesArr = []
    const updatedDepartmentsArr = []
    Array.from({length: 170}).forEach(async ()=> {
        const randomDepartment = departments[Math.floor(Math.random() * 13)]
        const newEmployee = new Employee(createRandomEmployee())
        newEmployee.department = randomDepartment._id
        newEmployee.full_name = newEmployee.first_name + " " + newEmployee.last_name
        employeesArr.push(newEmployee)
        randomDepartment.members.push(newEmployee._id)

        try {
           const rand = await randomDepartment.save()
            console.log("Created")
        } catch (error) {
            console.log(error)
        }
    })

    try {
        const allEmployees = await Employee.insertMany(employeesArr)
        return res.json(allEmployees)
    } catch (error) {
       return  res.json(error)   
    }
}