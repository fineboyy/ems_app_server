import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()


//CUSTOM MIDDLEWARE
import { verifyJWT } from './middleware/verifyJWT.js'
import { errorHandler } from './middleware/errorHandler.js'
import { credentials } from './middleware/credentials.js'
import { corsOptions } from './config/corsOptions.js'

//ROUTES
import indexRoutes from './routes/index.js'
import employeeRoutes from './routes/employees.js'
import departmentRoutes from './routes/departments.js'
import leaveRoutes from './routes/leave.js'

app.use(express.json({limit: "30mb" ,extended: true}))
app.use(express.urlencoded({limit: "30mb" ,extended: true}))

app.use(credentials)
app.use(cors(corsOptions))
app.use(cookieParser())


app.use('/', indexRoutes)

app.use(verifyJWT)
app.use('/employees', employeeRoutes)
app.use('/departments', departmentRoutes)
app.use('/leave-applications', leaveRoutes)

app.all('*', (req, res) => {
    res.status(404).json({message: "The requested resource was not found"})
})


app.use(errorHandler)


const DATABASE_URI = process.env.MONGODB_URI

mongoose.connect(DATABASE_URI, {useNewUrlParser: true,  useUnifiedTopology: true})
    .catch(error => console.log(error))

mongoose.connection.once('open', () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Successfully Connected to DB. Server Up and Running!')
    })
})
