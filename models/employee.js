import mongoose from "mongoose";
const { SchemaTypes } = mongoose;

const employeeSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    full_name: String,
    address: String,
    photo: String,
    date_of_birth: Date,
    phone_number: String,
    email:  String,
    gender: String,
    nationality: String,
    marital_status:  String,
    emergency_contact: String,
    //EMPLOYMENT DETAILS
    date_of_hire: Date,
    job_title: String,
    department: {
        type: SchemaTypes.ObjectId,
        ref: 'Department'
    },

    //EDUCATION
    school_name: String,
    school_location: String,
    school_country: String,
    degree: String,
    school_year_started: String,
    school_year_completed: String,

})


const Employee = mongoose.model('Employee', employeeSchema)

export default Employee;