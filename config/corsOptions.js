import { allowedOrigins } from "./allowedOrigins.js"

export const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else  {
            callback(new Error('Request is not authorized'))
        }
    },
    optionSuccessStatus: 200
}