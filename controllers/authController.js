import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import User from '../models/user.js'

export const handleLogin = async ({body}, res ) => {
    const {username, password} = body
    if(!username || !password ) return res.sendStatus(400)
    
    const foundUser = await User.findOne({username: username})
    if(!foundUser) return res.sendStatus(401)

    const match = await bcrypt.compare(password, foundUser.password)
    if(match) {
        const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30m'}
        )
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '3d'}
        )
        foundUser.refreshToken = refreshToken
        const savedUser = await foundUser.save()
        res.cookie('jwt', refreshToken, {httpOnly:  true, maxAge: 3 * 24 * 60 * 60 * 1000})
        return res.json({accessToken})
    } else {
        return res.sendStatus(401)
    }
}