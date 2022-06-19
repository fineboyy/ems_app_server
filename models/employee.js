import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    name: String,
    jobTitle: String,
    picture: String,
    department: String,
    last_viewed: {
        type: Date,
        default: new Date()
    }
})


const Employee = mongoose.model('Employee', employeeSchema)

export default Employee;