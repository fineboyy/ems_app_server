import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()

app.use(express.json({limit: "30mb" ,extended: true}))
app.use(express.urlencoded({limit: "30mb" ,extended: true}))
app.use(cors())

import indexRoutes from './routes/index.js'
import employeeRoutes from './routes/employees.js'
import departmentRoutes from './routes/departments.js'

app.use('/', indexRoutes)
app.use('/employees', employeeRoutes)
app.use('/departments', departmentRoutes)


const DATABASE_URI = process.env.MONGODB_URI


mongoose.connect(DATABASE_URI, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(
        app.listen(process.env.PORT || 5000, () => {
            console.log('Successfully Connected to DB. Server Up and Running!')
        })
    )
    .catch(error => console.log(error))
