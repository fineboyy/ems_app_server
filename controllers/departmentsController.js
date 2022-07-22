import mongoose from 'mongoose'
import Department from '../models/department.js'


export const getAllDepartments = async (req, res) => {
    try {
        // const departments = await Department.find().populate('members').lean()
        const departments = await Department.find().populate('members', ["full_name", "photo"])
        return res.status(200).json(departments)
    } catch (error) {
        return res.json(error)
    }
}