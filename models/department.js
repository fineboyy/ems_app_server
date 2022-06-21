import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
    name: String,
    members: [String]
})

const Department = mongoose.model("Department", departmentSchema)

export default Department;