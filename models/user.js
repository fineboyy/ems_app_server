import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum:['manager', 'hr', 'admin', 'exec', 'staff'],
        default: 'staff'
    },
    refreshToken: String,
})

const User = mongoose.model('User', UserSchema)

export default User