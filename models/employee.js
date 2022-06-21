import mongoose from "mongoose";
const { SchemaTypes } = mongoose;

const employeeSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    full_name: String,
    job_title: String,
    address: String,
    photo: String,
    date_of_birth: Date,
    department: {
        type: SchemaTypes.ObjectId,
        ref: 'Department'
    },
    phone_number: String,
    email:  String,
    gender: String,
    nationality: String,
    marital_status:  String,
    date_of_hire: Date
})


const Employee = mongoose.model('Employee', employeeSchema)

export default Employee;