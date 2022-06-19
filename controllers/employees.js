import mongoose from 'mongoose'
import Employee from '../models/employee.js'

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        return res.status(200).json(employees)
    } catch (error) {
        console.log(error)
        return res.status(503).json({message: "You fucked Up"})
    }
}

export const createEmployee = async ({ body }, res) => {
    const data = body
    const newEmployee = new  Employee(data)

    try {
        await newEmployee.save()
        return res.status(201).json(newEmployee)
    } catch (error) {
        return res.status(409).json({error})
    }
}
export const getOneEmployee = async ({ params }, res) => {
    const id = params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "The User ID is invalid"})
    try {
        const employee = await  Employee.findById(id)
       return res.status(200).json(employee)
    } catch (error) {
       return res.json(error)
    }
}

export const updateEmployee = async (req, res) => {}
export const deleteEmployee = async (req, res) => {}