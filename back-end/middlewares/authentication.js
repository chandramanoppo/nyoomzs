const {verifyToken} = require('../helpers/jwt')

const {User} = require ('../models/index')

const authentication = async (req, res, next) => {
    try {

        const {authorization} = req.headers

        if(!authorization) {
            throw { name : 'Unauthorized'}
        }

        const access_token = authorization.split(' ')[1]

        const payload = verifyToken(access_token)

        const users = await User.findOne({
            where : {
                email: payload.email
            }
        })

        if(!users) {
            throw {name : 'Unauthorized'}
        }

        req.loginInfo = {
            userId : users.id,
            email: users.email,
            username: users.username
        }

        next()
        
    } catch (error) {

        next(error)

    }
}

module.exports = authentication