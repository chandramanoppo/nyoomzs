const {User, Room} = require('../models/index')

const {comparePassword} = require('../helpers/hashPassword')

const {createToken} = require('../helpers/jwt')

class UserController {
    static async Register(req, res, next) {
        try {

            const {username, email, password, imgUrl} = req.body

            const users = await User.create({username, email, password, imgUrl})

            res.status(201).json(users)
            

        } catch (error) {

            next(error)

        }
    }

    static async Login(req, res, next) {
        try {
            const {email, password} = req.body
            
            if (!email) {
                res.status(400).json({message : "Email is required"})
            }
            if (!password) {
                res.status(400).json({message : "Password is required"})
            }

            const users = await User.findOne({where : {email: email}})

            if (!users) {
                res.status(400).json({message : "error invalid email or password"})
            }

            const isPasswordMatch = comparePassword(password, users.password)
            
            if(!isPasswordMatch){
                res.status(401).json({message : "Invalid email/password"})
            }

            const payload = {
                id: users.id,
                email: users.email,
                username: users.username,
            }

            const access_token = createToken(payload)
          
            res.status(200).json({access_token})

        } catch (error) {

            next(error)

        }
    }

    static async ShowProfile(req,res, next){
        try {

            const {userId} = req.loginInfo
            
            const users = await User.findOne({where : {id: userId}})

            if(!users){
                throw {message: "Unauthorized"}
            }

            res.status(200).json(users)
            
        } catch (error) {
            next(error)
        }
    }

    static async EdiProfile(req,res, next) {
        try {

            const {userId} = req.loginInfo

            const {username, imgUrl} = req.body

            const users = await User.update({username, imgUrl}, {where: {
                id: userId
            }})

            res.status(201).json(`Profile ${userId} / ${username} successfully update`)


            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController