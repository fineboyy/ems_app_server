import mongoose from "mongoose";
const { SchemaTypes } = mongoose;

const leaveSchema = mongoose.Schema({
    leave_type: String,
    employee: {
        type: SchemaTypes.ObjectId,
        ref: 'Employee'
    },
    leave_extra_info: String,
    employee_name: String,
    employee_photo: String,
    employee_department_name: String,
    leave_from: Date,
    leave_to: Date,
    leave_status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    applied_date: {
        type: Date,
        default: Date.now()
    }
})


const Leave = mongoose.model('Leave', leaveSchema)

export default Leave;