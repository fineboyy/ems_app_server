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

export const getOneDepartment = async ({params}, res) => {
    const {id } = params

    if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "The Department ID is invalid" });

    try {
            const department = await Department.findOne({_id: id}).populate('members', ["full_name", "photo", "job_title", "email", "phone_number", "hod_of"])
            if(!department) return res.status(404).json({message: "The requested department was not found"}) 
            return res.status(200).json(department)   
    } catch (error) {
        return res.json(error)
    }
}