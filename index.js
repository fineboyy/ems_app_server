import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(express.json({limit: "30mb" ,extended: true}))
app.use(express.urlencoded({limit: "30mb" ,extended: true}))
app.use(cors())


const DATABASE_URI = process.env.MONGODB_URI
const PORT = process.env.PORT


mongoose.connect(DATABASE_URI, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(
        app.listen(PORT, () => {
            console.log('Successfully Connected to DB. Server Up and Running!')
        })
    )
    .catch(error => console.log(error))
