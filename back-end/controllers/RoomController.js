const {User, Room} = require('../models/index')

const {comparePassword, hashPassword} = require('../helpers/hashPassword')

const {Op} = require('sequelize')
const { createToken } = require('../helpers/jwt')

class RoomController {
    static async CreateRoom(req, res, next){
        try {

            const {CreatorId, name, roomId, password, allowPublic} = req.body

            const rooms = await Room.create({CreatorId, name, roomId, password, allowPublic})
            
            res.status(201).json(rooms)

        } catch (error) {

            next(error)

        }
    }

    static async JoinRoomById(req, res, next) {
        try {

            const {roomId} = req.params

            const {password} = req.body

        
            if(password === undefined ||  password == 'null'){
                throw {name: 'password cannot be null'}
            } else {
                
                const rooms = await Room.findOne({
                    where: {
                        id: roomId,
                    }, 
                    include: {model: User}
                })
    
                if(!rooms){
                    res.status(400).json({message : 'Invalid Room'})
                }
    
                const isPasswordMatch = comparePassword(password, rooms.password)
    
                if(!isPasswordMatch){
                    res.status(401).json({message : "Invalid Password"})
                }
    
                res.status(200).json(`Allow connection to ${rooms.name}`)
            }

        } catch (error) {

            next(error)

        }
    }

    static async ListRoom(req, res, next) {
        try {

            const rooms = await Room.findAll({
                where : {
                    allowPublic: true
                }
            })

            res.status(200).json(rooms)
            
        } catch (error) {

            next(error)

        }
    }

    static async DeleteRoom(req, res, next) {
        try {

            const {userId} = req.loginInfo

            const {roomId} = req.params


            const rooms = await Room.destroy ( 
                {
                    where : {
                        [Op.and] : [{id: roomId} , {CreatorId: userId}]
                    }
                }
            )

            if(!rooms) {
                return res.status(404).json({message: 'Rooms not found'})
            }

            res.status(201).json(` Room ${roomId} has been deleted succesfully`)
            
        } catch (error) {

            next(error)
        }
    }

    static async EditRoom(req, res, next) {
        try {

            const {userId} = req.loginInfo

            const {roomId} = req.params

            const {name, password, allowPublic} = req.body

            const rooms = await Room.update({name: name, password:hashPassword(password), allowPublic: allowPublic} , {
                where: {
                    [Op.and] : [{id: roomId}, {CreatorId: userId}]
                }
            })

            if(roomId !== userId){
                throw {name : 'Forbidden'}
            }

            res.status(201).json(`Update to Room ${name} success`)
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = RoomController