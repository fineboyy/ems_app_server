import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Employee from '../models/employee.js';
import User from '../models/user.js';
import { createEmployee } from './employeesController.js';

export const handleNewUser = async ({body}, res) => {
    const { username, password } = body;
    if(!username || !password ) return res.json({"message": "Username and Password are required"})
    const duplicate = await User.findOne({ username : username })
    if(duplicate) return res.status(409).json("A User with that email already exists")
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        body.password = hashedPwd
        const newUser = new User(body)
        await newUser.save()
        return res.json({ newUser })
    } catch (error) {
        res.status(500).json({'message': error.message})
    }
}