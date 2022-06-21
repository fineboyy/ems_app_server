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
    departments.map((department) => {
        Array.from({length: 12}).forEach(() => {
            const newEmployee = new Employee(createRandomEmployee())
            newEmployee.department = department._id
            newEmployee.full_name = newEmployee.first_name + " " + newEmployee.last_name
            employeesArr.push(newEmployee)
            department.members.push(newEmployee._id)
        })

        try {
            department.save()
        } catch (error) {
            res.json(error)
        }
    })

    try {
        const allEmployees = await Employee.insertMany(employeesArr)
        res.json(allEmployees)
    } catch (error) {
        res.json(error)   
    }
}